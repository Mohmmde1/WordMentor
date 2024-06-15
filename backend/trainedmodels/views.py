import os
import time
from django.shortcuts import get_object_or_404
import nltk
import ssl
import torch
from PyPDF2 import PdfReader
from transformers import BertTokenizer, BertForSequenceClassification
from rest_framework import mixins, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.conf import settings
from nltk.corpus import stopwords, words
from nltk.tokenize import word_tokenize
from word.models import WordMeaning
from progress_tracking.models import UserWordProgress
from books.models import UserBook
from .models import UserTrainedModel, WordPredictionMapping, BookPrediction
from settings.models import UserProfile
from .tasks import fine_tune_bert, check_status
from .serializers import FineTuneSerializer, PDFUploadSerializer
import logging

# Configure logging
logger = logging.getLogger(__name__)


class FineTuneViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """
    A viewset for initiating fine-tuning of BERT models and checking task status.
    """
    serializer_class = FineTuneSerializer

    def create(self, request):
        """
        Initiates the fine-tuning of a BERT model with labeled data from the user's profile.

        Args:
            request (Request): The request object containing the fine-tuning data.

        Returns:
            Response: A response indicating the fine-tuning process has started.
        """
        fine_tune_data = request.data
        profile_id = fine_tune_data.get('profile')

        try:
            # Fetch the profile and extract labeled data
            profile = UserProfile.objects.get(id=profile_id)
            labeled_data = profile.extract_data()
            path = f"{profile.user.username}_model"
            
            # Start the fine-tuning task asynchronously
            user_trained_model = UserTrainedModel.objects.create(
                profile=profile,
                file_path=path,
                name=f"{profile.user.username}_model",
                version="1.0",
                description="Fine-tuned BERT model",
            )
            task = fine_tune_bert(labeled_data, user_trained_model)

            logger.info(
                f"Fine-tuning task started for profile ID {profile_id}")
            return Response({"message": "Fine-tuning started"}, status=status.HTTP_201_CREATED)

        except UserProfile.DoesNotExist:
            logger.error(f"Profile with ID {profile_id} does not exist")
            return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(
                f"An error occurred while starting fine-tuning: {str(e)}")
            return Response({"error": "An error occurred while starting fine-tuning"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['get'], url_path='task-status')
    def get_task_status(self, request):
        """
        Retrieves the status of the fine-tuning task associated with the user's profile.

        Args:
            request (Request): The request object.

        Returns:
            Response: A response with the task ID, status, and result.
        """
        try:
            user_trained_model = UserTrainedModel.objects.get(profile__user=request.user)
            # check folder if it has file with name profile.user.username_model
            if user_trained_model.is_ready:
                return Response({"status": "completed"}, status=status.HTTP_200_OK)
            else:
                return Response({"status": "pending"}, status=status.HTTP_200_OK)
        except UserTrainedModel.DoesNotExist:
            return Response({"status": "did not started"}, status=status.HTTP_200_OK) 
        except Exception as e:
            logger.error(
                f"An error occurred while checking task status: {str(e)}")
            return Response({"error": "An error occurred while checking task status"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class PredictionViewSet(viewsets.ViewSet):
    """
    A viewset for handling predictions and related actions.
    """
    def list(self, request):
        """
        Retrieves all predictions made by the user.

        Args:
            request (Request): The request object.

        Returns:
            Response: A response with the user's predictions.
        """
        try:
            profile = get_object_or_404(UserProfile, user=request.user)
            user_books = UserBook.objects.filter(profile=profile)
            predictions = BookPrediction.objects.filter(book__in=user_books)

            if predictions.exists():
                data = []
                for prediction in predictions:
                    unknown_words_count = WordPredictionMapping.objects.filter(
                        prediction=prediction, word_progress__is_known=False
                    ).count()

                    data.append({
                        "id": prediction.id,
                        "unknown_words": unknown_words_count,
                        "book": prediction.book.title,
                        "from_page": prediction.from_page,
                        "to_page": prediction.to_page,
                        "created_at": prediction.created_at,
                        "trained_model_version": prediction.trained_model_version
                    })
                return Response(data, status=status.HTTP_200_OK)
            else:
                return Response({"message": "No predictions found"}, status=status.HTTP_404_NOT_FOUND)
        except UserProfile.DoesNotExist:
            logger.error("Profile not found")
            return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"An error occurred: {str(e)}")
            return Response({"error": "An error occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def create(self, request):
        """
        Extracts text from a specified range of pages in a PDF file identified by its ID and tokenizes it.

        Args:
            request (Request): The request object containing the PDF file ID and page range.

        Returns:
            Response: A response with the tokenized text.
        """
        serializer = PDFUploadSerializer(data=request.data)
        if serializer.is_valid():
            from_page = serializer.validated_data['from_page']
            to_page = serializer.validated_data['to_page']
            book_id = serializer.validated_data['book_id']

            try:
                book = UserBook.objects.get(id=book_id)
                pdf_path = book.file_path.path
                result = self._extract_unknown_words(pdf_path, from_page, to_page, request.user)

                if 'error' in result:
                    logger.error(f"An error occurred: {result['error']}")
                    return Response({"error": result['error']}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                profile = book.profile
                trained_model_version = profile.usertrainedmodel_set.order_by('-created_at').first().version
                self._save_prediction_metadata(profile, trained_model_version, result['unknown_words'], book, from_page, to_page)

                return Response({
                    "unknown_words": result['unknown_words'],
                    "processing_time": result['processing_time']
                }, status=status.HTTP_200_OK)

            except UserBook.DoesNotExist:
                logger.error(f"PDF with ID {book_id} does not exist")
                return Response({"error": "PDF not found"}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                logger.error(f"An error occurred: {str(e)}")
                return Response({"error": "An error occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        """
        Retrieves a specific prediction made by the user.

        Args:
            request (Request): The request object.
            pk (int): The ID of the prediction.

        Returns:
            Response: A response with the prediction data.
        """
        try:
            prediction = BookPrediction.objects.get(id=pk)
            profile = UserProfile.objects.get(user=request.user)
            word_prediction_mappings = WordPredictionMapping.objects.filter(prediction=prediction)
            unknown_words_qs = word_prediction_mappings.filter(word_progress__profile=profile, word_progress__is_known=False).select_related('word_progress__word_meaning__word')

            unknown_words_dict = {
                word_prediction_mapping.word_progress.word_meaning.word.word: word_prediction_mapping.word_progress.word_meaning.definition
                for word_prediction_mapping in unknown_words_qs
            }

            return Response({
                "unknown_words": unknown_words_dict,
                "book": prediction.book.title,
                "from_page": prediction.from_page,
                "to_page": prediction.to_page,
                "created_at": prediction.created_at,
                "trained_model_version": prediction.trained_model_version
            }, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"An error occurred: {str(e)}")
            return Response({"error": "An error occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['get'], url_path='last-prediction')
    def get_last_prediction(self, request):
        """
        Retrieves the last prediction made by the user.

        Args:
            request (Request): The request object.

        Returns:
            Response: A response with the last prediction data.
        """
        try:
            profile = get_object_or_404(UserProfile, user=request.user)
            last_prediction = BookPrediction.objects.filter(book__profile=profile).order_by('-created_at').first()

            if last_prediction:
                unknown_words = [
                    mapping.word_progress.word_meaning.word.word
                    for mapping in last_prediction.wordpredictionmapping_set.all()
                ]
                return Response({
                    "id": last_prediction.id,
                    "unknown_words": unknown_words,
                    "book": last_prediction.book.title,
                    "from_page": last_prediction.from_page,
                    "to_page": last_prediction.to_page,
                    "created_at": last_prediction.created_at,
                    "trained_model_version": last_prediction.trained_model_version
                }, status=status.HTTP_200_OK)
            else:
                return Response({"message": "No predictions found"}, status=status.HTTP_404_NOT_FOUND)

        except UserProfile.DoesNotExist:
            logger.error("Profile not found")
            return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"An error occurred: {str(e)}")
            return Response({"error": "An error occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def _extract_unknown_words(self, pdf_path, from_page, to_page, user):
        ssl._create_default_https_context = ssl._create_unverified_context

        nltk_data_path = os.path.join(settings.BASE_DIR, 'nltk_data')
        os.makedirs(nltk_data_path, exist_ok=True)
        nltk.data.path.append(nltk_data_path)

        profile = UserProfile.objects.get(user=user)
        trained_model = UserTrainedModel.objects.get(profile=profile)

        nltk.download('stopwords', download_dir=nltk_data_path)
        nltk.download('punkt', download_dir=nltk_data_path)
        nltk.download('words', download_dir=nltk_data_path)

        valid_words = set(words.words())
        known_words = set(UserWordProgress.objects.filter(profile=profile, is_known=True)
                          .values_list('word_meaning__word__word', flat=True))

        def extract_important_words(text):
            words = word_tokenize(text)
            filtered_words = [
                word.lower() for word in words
                if word.lower() not in stopwords.words('english') and word.isalpha() and len(word) > 1 
                and word.lower() in valid_words and word.lower() not in known_words
            ]
            return set(filtered_words)

        def extract_text_from_pdf(pdf_path, from_page, to_page):
            with open(pdf_path, 'rb') as file:
                reader = PdfReader(file)
                text = ""
                for page_num in range(from_page - 1, to_page):
                    page = reader.pages[page_num]
                    text += page.extract_text()
            return text

        start_time = time.time()
        try:
            tokenizer = BertTokenizer.from_pretrained(
                'bert-base-uncased', cache_dir=os.path.join(settings.BASE_DIR, 'data', 'cache_dir', 'tokenizer'))
            model = BertForSequenceClassification.from_pretrained(
                os.path.join(settings.BASE_DIR, 'data', 'fine_tuned_models', trained_model.file_path))
            model.eval()

            extracted_text = extract_text_from_pdf(pdf_path, from_page, to_page)
            tokens = extract_important_words(extracted_text)

            inputs = tokenizer(list(tokens), return_tensors="pt", padding=True, truncation=True)

            with torch.no_grad():
                outputs = model(**inputs)

            probs = torch.softmax(outputs.logits, dim=-1)
            predicted_labels = torch.argmax(probs, dim=-1).tolist()

            class_names = ['Not_Known', 'Known']
            predicted_classes = [class_names[label] for label in predicted_labels]

            unknown_words = [word for word, predicted_class in zip(tokens, predicted_classes) if predicted_class == 'Not_Known']

            return {
                'unknown_words': unknown_words,
                'processing_time': time.time() - start_time
            }
        except Exception as e:
            logger.error(f"An error occurred: {str(e)}")
            return {
                'error': str(e)
            }

    def _save_prediction_metadata(self, profile, trained_model_version, unknown_words, book, from_page, to_page):
        """
        Saves the prediction metadata to the database.

        Args:
            profile (Profile): The profile of the user.
            trained_model_version (str): The version of the trained model.
            unknown_words (list): The list of unknown words.
            book (Book): The book associated with the prediction.
            from_page (int): The starting page of the prediction.
            to_page (int): The ending page of the prediction.

        Returns:
            None
        """
        try:
            prediction = BookPrediction.objects.create(
                trained_model_version=trained_model_version,
                book=book,
                from_page=from_page,
                to_page=to_page
            )

            prediction.save()

            for word_entry in unknown_words:
                word_obj = WordMeaning.objects.get_or_fetch(word=word_entry)
                user_word_progress = UserWordProgress(profile=profile, is_known=False, word_meaning=word_obj)
                user_word_progress.save()
                
                word_prediction = WordPredictionMapping(word_progress=user_word_progress, prediction=prediction)
                word_prediction.save()

            logger.info(f"Prediction metadata saved for profile ID {profile.id}.")
        except WordMeaning.DoesNotExist:
            logger.error(f"Word '{word_entry}' does not exist")
        except Exception as e:
            logger.error(f"An error occurred while saving prediction metadata: {str(e)}")
