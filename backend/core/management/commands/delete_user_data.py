from django.core.management.base import BaseCommand
from django.db import transaction
from django.shortcuts import get_object_or_404

from assessment.models import UserAssessment, UserWordAssessmentMapping
from trainedmodels.models import UserTrainedModel

from progress_tracking.models import UserWordProgress
from settings.models import UserProfile


class Command(BaseCommand):
    help = "Deletes all user-related data for a specific user"

    def add_arguments(self, parser):
        parser.add_argument("user_id", type=int, help="User ID whose data will be deleted")

    @transaction.atomic
    def handle(self, *args, **options):
        user_id = options["user_id"]
        try:
            profile = get_object_or_404(UserProfile, user_id=user_id)
            self.stdout.write(f"Deleting all data for user with ID {user_id}...")

            # Deleting UserWordProgress
            try:
                progress_count, _ = UserWordProgress.objects.filter(profile=profile).delete()
                self.stdout.write(self.style.SUCCESS(f"Deleted {progress_count} UserWordProgress records."))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Error deleting UserWordProgress: {str(e)}"))

            # Deleting UserTrainedModel
            try:
                user_trained_model = UserTrainedModel.objects.get(profile=profile)
                user_trained_model.delete_user_model()
                user_trained_model.delete()
                self.stdout.write(self.style.SUCCESS(f"Deleted {user_trained_model} UserTrainedModel records."))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Error deleting UserTrainedModel: {str(e)}"))

            # Deleting UserAssessment and related data
            try:
                assessment_count, _ = UserAssessment.objects.filter(profile=profile).delete()
                self.stdout.write(self.style.SUCCESS(f"Deleted {assessment_count} UserAssessment records."))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Error deleting UserAssessment: {str(e)}"))

            # Deleting UserWordAssessmentMapping
            try:
                user_word_assessment_mapping_count, _ = UserWordAssessmentMapping.objects.filter(
                    assessment__profile=profile
                ).delete()
                self.stdout.write(
                    self.style.SUCCESS(
                        f"Deleted {user_word_assessment_mapping_count} UserWordAssessmentMapping records."
                    )
                )
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Error deleting UserWordAssessmentMapping: {str(e)}"))

            # If needed, cascade other deletions, depending on your models

            self.stdout.write(self.style.SUCCESS(f"Successfully deleted all data related to user with ID {user_id}."))

        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error occurred: {str(e)}"))
