import os
import time
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
from word.models import Word
from progress_tracking.models import WordProgress
from books.models import Book
from .models import TrainedModel, Prediction, WordPrediction
from settings.models import Profile
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
            profile = Profile.objects.get(id=profile_id)
            labeled_data = profile.extract_data()
            path = f"{profile.user.username}_model"
            print(labeled_data, path)
            # Start the fine-tuning task asynchronously
            task = fine_tune_bert(labeled_data, path)
            TrainedModel.objects.create(
                profile=profile,
                file_path=path,
                name=f"{profile.user.username}_model",
                version="1.0",
                description="Fine-tuned BERT model",
            )

            logger.info(
                f"Fine-tuning task started for profile ID {profile_id}")
            return Response({"message": "Fine-tuning started"}, status=status.HTTP_201_CREATED)

        except Profile.DoesNotExist:
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
        path = f"{request.user.username}_model"
        try:
            # check folder if it has file with name profile.user.username_model
            ready = check_status(path=path)
            if ready:
                return Response({"status": "completed"}, status=status.HTTP_200_OK)
            else:
                return Response({"status": "pending"}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(
                f"An error occurred while checking task status: {str(e)}")
            return Response({"error": "An error occurred while checking task status"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['post'], url_path='predict')
    def predict(self, request):
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
                # Fetch the PDF file by ID
                pdf = Book.objects.get(id=book_id)
                pdf_path = pdf.file.path

                # Extract unknown words using the custom function
                result = self._extract_unknown_words(
                    pdf_path, from_page, to_page)

                if 'error' in result:
                    logger.error(f"An error occurred: {result['error']}")
                    return Response({"error": result['error']}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                self._save_prediction_metadata(profile=pdf.profile, trained_model_version=pdf.profile.trainedmodel.version,
                                               unknown_words=result['unknown_words'], book=pdf, from_page=from_page, to_page=to_page)
                return Response({
                    "unknown_words": result['unknown_words'],
                    "processing_time": result['processing_time']
                }, status=status.HTTP_200_OK)

            except Book.DoesNotExist:
                logger.error(f"PDF with ID {book_id} does not exist")
                return Response({"error": "PDF not found"}, status=status.HTTP_404_NOT_FOUND)
            except TrainedModel.DoesNotExist:
                logger.error("Trained model not found for the user")
                return Response({"error": "Trained model not found"}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                logger.error(f"An error occurred: {str(e)}")
                return Response({"error": "An error occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
            # Fetch the last prediction made by the user
            profile = Profile.objects.get(user=request.user)
            last_prediction = Prediction.objects.filter(
                profile=profile).order_by('-created_at').first()

            if last_prediction:
                unknown_words = [
                    word_prediction.word.entry for word_prediction in last_prediction.word_predictions.all()]
                return Response({
                    "unknown_words": unknown_words,
                    "book": last_prediction.book.title,
                    "from_page": last_prediction.from_page,
                    "to_page": last_prediction.to_page,
                    "created_at": last_prediction.created_at
                }, status=status.HTTP_200_OK)
            else:
                return Response({"message": "No predictions found"}, status=status.HTTP_404_NOT_FOUND)
        except Profile.DoesNotExist:
            logger.error("Profile not found")
            return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"An error occurred: {str(e)}")
            return Response({"error": "An error occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=True, methods=['get'], url_path='predictions')
    def get_predictions(self, request, pk=None):
        """
        Retrieves all predictions made by the user.

        Args:
            request (Request): The request object.

        Returns:
            Response: A response with the user's predictions.
        """
        try:
            # Fetch the user's profile
            profile = Profile.objects.get(id=pk)

            # Fetch all predictions made by the user
            predictions = Prediction.objects.filter(profile=profile)

            if predictions:
                data = []
                for prediction in predictions:
                    unknown_words = [
                        word_prediction.word.entry for word_prediction in prediction.word_predictions.all()]
                    data.append({
                        "unknown_words": unknown_words,
                        "book": prediction.book.title,
                        "from_page": prediction.from_page,
                        "to_page": prediction.to_page,
                        "created_at": prediction.created_at,
                        "trained_model_version": prediction.trained_model_version
                    })
                return Response(data, status=status.HTTP_200_OK)
            else:
                return Response({"message": "No predictions found"}, status=status.HTTP_404_NOT_FOUND)
        except Profile.DoesNotExist:
            logger.error("Profile not found")
            return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"An error occurred: {str(e)}")
            return Response({"error": "An error occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def _extract_unknown_words(self, pdf_path, from_page, to_page):
        # Create an unverified SSL context
        ssl._create_default_https_context = ssl._create_unverified_context

        nltk_data_path = os.path.join(settings.BASE_DIR, 'nltk_data')
        os.makedirs(nltk_data_path, exist_ok=True)
        nltk.data.path.append(nltk_data_path)

        # Download the required nltk corpora if not already present
        nltk.download('stopwords', download_dir=nltk_data_path)
        nltk.download('punkt', download_dir=nltk_data_path)
        nltk.download('words', download_dir=nltk_data_path)

        # List of valid English words
        valid_words = set(words.words())

        def extract_important_words(text):
            words = word_tokenize(text)
            filtered_words = [
                word.lower() for word in words
                if word.lower() not in stopwords.words('english') and word.isalpha() and len(word) > 1 and word.lower() in valid_words
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
                'bert-base-uncased', cache_dir=os.path.join(settings.BASE_DIR, 'cache_dir', 'tokenizer'))
            model = BertForSequenceClassification.from_pretrained(
                os.path.join(settings.BASE_DIR, 'fine_tuned_models', 'mohammed_model'))
            model.eval()

            extracted_text = extract_text_from_pdf(
                pdf_path, from_page, to_page)
            tokens = extract_important_words(extracted_text)

            inputs = tokenizer(list(tokens), return_tensors="pt",
                               padding=True, truncation=True)

            with torch.no_grad():
                outputs = model(**inputs)

            probs = torch.softmax(outputs.logits, dim=-1)
            predicted_labels = torch.argmax(probs, dim=-1).tolist()

            class_names = ['Not_Known', 'Known']
            predicted_classes = [class_names[label]
                                 for label in predicted_labels]

            unknown_words = [word for word, predicted_class in zip(
                tokens, predicted_classes) if predicted_class == 'Not_Known']

            return {
                'unknown_words': unknown_words,
                'processing_time': time.time() - start_time
            }
        except Exception as e:
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
            # Create a new Prediction entry
            prediction = Prediction.objects.create(
                profile=profile,
                trained_model_version=trained_model_version,
                book=book,
                from_page=from_page,
                to_page=to_page
            )

            # Add the words to the prediction
            for word_entry in unknown_words:
                word_obj = Word.objects.get_or_fetch(entry=word_entry)
                # Assuming 'entry' is the unique field
                word_prediction = WordPrediction(
                    word=word_obj, profile=profile, status="unknown", prediction=prediction)
                word_prediction.save()
                prediction.word_predictions.add(word_prediction)

            prediction.save()

            logger.info(
                f"Prediction metadata saved for profile ID {profile.id}")

        except WordProgress.DoesNotExist:
            logger.error(f"Word '{word_entry}' does not exist")
        except Exception as e:
            logger.error(
                f"An error occurred while saving prediction metadata: {str(e)}")
