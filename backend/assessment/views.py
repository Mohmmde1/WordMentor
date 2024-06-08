import logging
from rest_framework import mixins, viewsets, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db import IntegrityError, transaction

from word.models import Word, WordMeaning
from progress_tracking.models import UserWordProgress
from settings.models import UserProfile
from .models import UserAssessment
from .serializers import UserAssessmentSerializer

logger = logging.getLogger(__name__)

class AssessmentViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = UserAssessmentSerializer

    def create(self, request):
        try:
            assessment_data = request.data
            profile_id = assessment_data.get('profile')
            selected_words = assessment_data.get('selected_words', [])
            unselected_words = assessment_data.get('unselected_words', [])

            logger.info(f"Creating assessment for profile ID {profile_id}")
            logger.info(f"Selected words: {selected_words}")
            logger.info(f"Unselected words: {unselected_words}")

            # Check if profile_id is provided
            if profile_id is None:
                return Response({"error": "Profile ID is required"}, status=status.HTTP_400_BAD_REQUEST)

            # Retrieve the profile object or raise a NotFound exception if not found
            profile = get_object_or_404(UserProfile, id=profile_id)
            logger.info(f"Profile: {profile}")

            # Check if both selected and unselected words are provided
            if not selected_words or not unselected_words:
                return Response({"error": "Both selected_words and unselected_words are required"}, status=status.HTTP_400_BAD_REQUEST)

            with transaction.atomic():
                # Create a new assessment for the profile
                assessment = UserAssessment.objects.create(profile=profile)
                
                # Delete all related UserWordProgress objects
                UserWordProgress.objects.filter(profile=profile).delete()

                # Retrieve Word instances for selected and unselected words
                selected_word_objects = Word.objects.filter(id__in=selected_words)
                unselected_word_objects = Word.objects.filter(id__in=unselected_words)

                selected_word_meaning_objects = [WordMeaning.objects.get_or_fetch(word=word) for word in selected_word_objects]
                unselected_word_meaning_objects = [WordMeaning.objects.get_or_fetch(word=word) for word in unselected_word_objects]

                # Add selected and unselected words to the profile's known_words and unknown_words
                UserWordProgress.objects.bulk_create([
                    UserWordProgress(word_meaning=word_meaning, profile=profile, is_known=True) for word_meaning in selected_word_meaning_objects
                ])
                UserWordProgress.objects.bulk_create([
                    UserWordProgress(word_meaning=word_meaning, profile=profile, is_known=False) for word_meaning in unselected_word_meaning_objects
                ])

            logger.info(f"Profile known words: {UserWordProgress.objects.filter(profile=profile, is_known=True).all()}")
            logger.info(f"Profile unknown words: {UserWordProgress.objects.filter(profile=profile, is_known=False).all()}")

            serializer = self.get_serializer(assessment)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except IntegrityError:
            logger.error("IntegrityError occurred while creating assessment")
            return Response({"error": "IntegrityError occurred while creating assessment"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            logger.error(f"Error occurred: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
