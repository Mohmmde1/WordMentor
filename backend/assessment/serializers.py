import logging
from rest_framework import serializers
from django.shortcuts import get_object_or_404
from django.db import IntegrityError, transaction
from word.models import Word, WordMeaning
from progress_tracking.models import UserWordProgress
from settings.models import UserProfile
from .models import UserAssessment, WordAssessment, UserWordAssessmentMapping

logger = logging.getLogger(__name__)


class UserAssessmentSerializer(serializers.Serializer):
    selected_words = serializers.ListField(write_only=True)
    unselected_words = serializers.ListField(write_only=True)

    def create(self, validated_data):
        user = self.context["request"].user
        profile = get_object_or_404(UserProfile, user=user)
        print(validated_data)
        selected_words = validated_data.pop("selected_words", [])
        unselected_words = validated_data.pop("unselected_words", [])

        logger.info(f"Creating assessment for profile ID {profile.id}")
        logger.info(f"Selected words: {selected_words}")
        logger.info(f"Unselected words: {unselected_words}")

        if not selected_words or not unselected_words:
            raise serializers.ValidationError(
                "Both selected_words and unselected_words are required"
            )

        try:
            with transaction.atomic():
                # Create the assessment
                assessment = UserAssessment.objects.create(profile=profile)

                # Clear existing progress for the profile
                UserWordProgress.objects.filter(profile=profile).delete()

                selected_word_objects = Word.objects.filter(id__in=selected_words)
                unselected_word_objects = Word.objects.filter(id__in=unselected_words)

                selected_word_meaning_objects = [
                    WordMeaning.objects.get_or_fetch(word.word)
                    for word in selected_word_objects
                ]
                unselected_word_meaning_objects = [
                    WordMeaning.objects.get_or_fetch(word.word)
                    for word in unselected_word_objects
                ]

                known_word_assessments = WordAssessment.objects.filter(
                    word__in=selected_word_objects
                )
                unknown_word_assessments = WordAssessment.objects.filter(
                    word__in=unselected_word_objects
                )

                UserWordProgress.objects.bulk_create(
                    [
                        UserWordProgress(
                            word_meaning=word_meaning, profile=profile, is_known=True
                        )
                        for word_meaning in selected_word_meaning_objects
                    ]
                )
                UserWordProgress.objects.bulk_create(
                    [
                        UserWordProgress(
                            word_meaning=word_meaning, profile=profile, is_known=False
                        )
                        for word_meaning in unselected_word_meaning_objects
                    ]
                )

                UserWordAssessmentMapping.objects.bulk_create(
                    [
                        UserWordAssessmentMapping(
                            assessment=assessment, word_assessment=wa
                        )
                        for wa in known_word_assessments
                    ]
                    + [
                        UserWordAssessmentMapping(
                            assessment=assessment, word_assessment=wa
                        )
                        for wa in unknown_word_assessments
                    ]
                )

            logger.info(f"Assessment created successfully for profile ID {profile.id}")
            return assessment  # Return the created assessment instance

        except IntegrityError:
            logger.error("IntegrityError occurred while creating assessment")
            raise serializers.ValidationError(
                "IntegrityError occurred while creating assessment"
            )
        except Exception as e:
            logger.error(f"Error occurred: {str(e)}")
            raise serializers.ValidationError(f"Error occurred: {str(e)}")
