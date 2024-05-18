from rest_framework import mixins, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django_celery_results.models import TaskResult
from trainedmodels.models import TrainedModel
from settings.models import Profile
from .tasks import fine_tune_bert
from .serializers import FineTuneSerializer
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

            # Start the fine-tuning task asynchronously
            task = fine_tune_bert.delay(labeled_data, path)
            TrainedModel.objects.create(
                profile=profile,
                file_path=path,
                name=f"{profile.user.username}_model",
                version="1.0",
                description="Fine-tuned BERT model",
                celery_task_id=task.id
            )

            logger.info(f"Fine-tuning task started for profile ID {profile_id} with task ID {task.id}")
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
        profile_id = request.user.profile.id

        try:
            # Get the Celery task ID for the fine-tuning task
            trained_model = TrainedModel.objects.get(profile_id=profile_id)
            task_id = trained_model.celery_task_id
            result = TaskResult.objects.get(task_id=task_id)

            logger.info(f"Task status for task ID {task_id} retrieved successfully")
            return Response({'task_id': task_id, 'status': result.status, 'result': result.result}, status=status.HTTP_200_OK)

        except TrainedModel.DoesNotExist:
            logger.error(f"No trained model found for profile ID {profile_id}")
            return Response({'task_id': None, 'status': 'PENDING', 'result': None}, status=status.HTTP_404_NOT_FOUND)
        except TaskResult.DoesNotExist:
            logger.error(f"No task result found for task ID {task_id}")
            return Response({'task_id': task_id, 'status': 'PENDING', 'result': None}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"An error occurred while retrieving task status: {str(e)}")
            return Response({"error": "An error occurred while retrieving task status"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
