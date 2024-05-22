import torch
from PyPDF2 import PdfReader
from transformers import BertTokenizer, BertForSequenceClassification
from rest_framework import mixins, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from books.models import Book
from trainedmodels.models import TrainedModel
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

            logger.info(f"Fine-tuning task started for profile ID {profile_id}")
            return Response({"message": "Fine-tuning started"}, status=status.HTTP_201_CREATED)

        except Profile.DoesNotExist:
            logger.error(f"Profile with ID {profile_id} does not exist")
            return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"An error occurred while starting fine-tuning: {str(e)}")
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
            logger.error(f"An error occurred while checking task status: {str(e)}")
            return Response({"error": "An error occurred while checking task status"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
    @action(detail=False, methods=['post'], url_path='extract-tokenize')
    def extract_tokenize(self, request):
        """
        Extracts text from a specified range of pages in a PDF file identified by its ID and tokenizes it.

        Args:
            request (Request): The request object containing the PDF file ID and page range.

        Returns:
            Response: A response with the tokenized text.
        """
        serializer = PDFUploadSerializer(data=request.data)
        if serializer.is_valid():
            pdf_id = serializer.validated_data['pdf_id']
            from_page = serializer.validated_data['from_page']
            to_page = serializer.validated_data['to_page']

            try:
                # Fetch the PDF file by ID
                pdf = Book.objects.get(id=pdf_id)
                with open(pdf.file.path, 'rb') as file:
                    reader = PdfReader(file)
                    text = ""
                    for page_num in range(from_page - 1, to_page):
                        page = reader.pages[page_num]
                        text += page.extract_text()

                 # Fetch the user's trained BERT model
                trained_model = TrainedModel.objects.get(profile=request.user.profile)

                # Load pre-trained BERT tokenizer
                tokenizer = BertTokenizer.from_pretrained('bert-base-uncased', cache_dir='/cache_dir/tokenizer')

                # Tokenize the input text
                inputs = tokenizer(text, return_tensors='pt', truncation=True, padding=True)

                # Load the fine-tuned BERT model
                model = BertForSequenceClassification.from_pretrained(trained_model.file_path)

                # Perform prediction
                outputs = model(**inputs)
                predicted_labels = torch.argmax(outputs.logits, dim=1)

                # Decode predicted labels into words
                predicted_words = [tokenizer.decode(label.item()) for label in predicted_labels]

                return Response({'predicted_words': predicted_words}, status=status.HTTP_200_OK)

            except Book.DoesNotExist:
                logger.error(f"PDF with ID {pdf_id} does not exist")
                return Response({"error": "PDF not found"}, status=status.HTTP_404_NOT_FOUND)
            except TrainedModel.DoesNotExist:
                logger.error("Trained model not found for the user")
                return Response({"error": "Trained model not found"}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                logger.error(f"An error occurred: {str(e)}")
                return Response({"error": "An error occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)