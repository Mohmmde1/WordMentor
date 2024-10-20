import logging
from rest_framework import serializers
from django.db import IntegrityError, transaction
from core.services import get_profile
from word.models import Word, WordMeaning
from progress_tracking.models import UserWordProgress
from .models import UserAssessment, WordAssessment, UserWordAssessmentMapping

logger = logging.getLogger(__name__)

class UserAssessmentSerializer(serializers.Serializer):
    selected_words = serializers.ListField(write_only=True)
    unselected_words = serializers.ListField(write_only=True)

    def validate(self, data):
        """Ensure both selected and unselected words are provided."""
        if not data.get('selected_words') or not data.get('unselected_words'):
            raise serializers.ValidationError("Both selected_words and unselected_words are required.")
        return data

    def create_assessment(self, profile):
        """Create a new UserAssessment object for the given profile."""
        return UserAssessment.objects.create(profile=profile)

    def delete_existing_progress(self, profile):
        """Delete existing UserWordProgress for the given profile."""
        UserWordProgress.objects.filter(profile=profile).delete()

    def create_word_progress(self, profile, selected_word_meanings, unselected_word_meanings):
        """Create UserWordProgress entries for known and unknown words."""
        UserWordProgress.objects.bulk_create([
            UserWordProgress(word_meaning=wm, profile=profile, is_known=True)
            for wm in selected_word_meanings
        ])
        UserWordProgress.objects.bulk_create([
            UserWordProgress(word_meaning=wm, profile=profile, is_known=False)
            for wm in unselected_word_meanings
        ])

    def create_word_assessment_mappings(self, assessment, known_word_assessments, unknown_word_assessments):
        """Create UserWordAssessmentMapping for both known and unknown word assessments."""
        UserWordAssessmentMapping.objects.bulk_create([
            UserWordAssessmentMapping(assessment=assessment, word_assessment=wa)
            for wa in known_word_assessments + unknown_word_assessments
        ])

    def create(self, validated_data):
        profile = get_profile(self.context)
        selected_words = validated_data.get("selected_words", [])
        unselected_words = validated_data.get("unselected_words", [])

        logger.info(f"Creating assessment for profile ID {profile.id}")
        logger.info(f"Selected words: {selected_words}, Unselected words: {unselected_words}")

        try:
            with transaction.atomic():
                # Step 1: Create assessment
                assessment = self.create_assessment(profile)

                # Step 2: Clear existing progress for the profile
                self.delete_existing_progress(profile)

                # Step 3: Fetch word objects and meanings
                selected_word_meanings = [WordMeaning.objects.get_or_fetch(word.word) for word in Word.objects.filter(id__in=selected_words)]
                unselected_word_meanings = [WordMeaning.objects.get_or_fetch(word.word) for word in Word.objects.filter(id__in=unselected_words)]

                # Step 4: Fetch word assessments
                known_word_assessments = list(WordAssessment.objects.filter(word__id__in=selected_words))
                unknown_word_assessments = list(WordAssessment.objects.filter(word__id__in=unselected_words))

                # Step 5: Create progress for known and unknown words
                self.create_word_progress(profile, selected_word_meanings, unselected_word_meanings)

                # Step 6: Create assessment mappings for known and unknown words
                self.create_word_assessment_mappings(assessment, known_word_assessments, unknown_word_assessments)

            logger.info(f"Assessment created successfully for profile ID {profile.id}")
            return assessment

        except IntegrityError:
            logger.error("IntegrityError occurred while creating assessment")
            raise serializers.ValidationError("A database error occurred while creating the assessment.")
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            raise serializers.ValidationError(f"An error occurred: {str(e)}")
