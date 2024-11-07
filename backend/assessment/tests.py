from unittest.mock import patch

from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.exceptions import ErrorDetail
from rest_framework.test import APIClient

from progress_tracking.models import UserWordProgress
from settings.models import UserProfile
from word.models import Word
from wordmentor_auth.models import User

from assessment.serializers import UserAssessmentSerializer

from .models import UserAssessment, UserWordAssessmentMapping, WordAssessment


class AssessmentViewSetTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(username="testuser", email="testuser@gmail.com", password="testpassword")
        self.user_profile = UserProfile.objects.create(user=self.user)
        self.client.force_authenticate(user=self.user)
        self.word1 = Word.objects.create(word="hate")
        self.word2 = Word.objects.create(word="love")
        self.word3 = Word.objects.create(word="ball")
        self.word4 = Word.objects.create(word="car")
        self.url = reverse("assessment-list")

    @patch('django.shortcuts.get_object_or_404')
    def test_create_assessment_success(self, mock_get_object_or_404):
        mock_get_object_or_404.return_value = self.user_profile

        data = {
            "selected_words": [self.word1.id, self.word2.id],
            "unselected_words": [self.word3.id, self.word4.id],
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(UserAssessment.objects.filter(profile=self.user_profile).exists())
        self.assertEqual(UserWordProgress.objects.filter(profile=self.user_profile).count(), 4)

    def test_assessment_status(self):
        self.client.force_authenticate(user=self.user_profile.user)
        url = reverse("assessment-assessment-status")
        UserAssessment.objects.create(profile=self.user_profile)

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {"assessment_exists": True})

        UserAssessment.objects.all().delete()
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {"assessment_exists": False})


class AssessmentModelsTestCase(TestCase):
    def setUp(self):
        # Create a user
        self.user = User.objects.create_user(username="testuser", email="testuser@example.com", password="testpass")
        self.user_profile = UserProfile.objects.create(user=self.user)

        # Create words
        self.word1 = Word.objects.create(word="testword1")
        self.word2 = Word.objects.create(word="testword2")

        # Create WordAssessments
        self.word_assessment1 = WordAssessment.objects.create(difficulty_level=1, word=self.word1)
        self.word_assessment2 = WordAssessment.objects.create(difficulty_level=10, word=self.word2)

        # Create UserAssessment
        self.user_assessment = UserAssessment.objects.create(profile=self.user_profile)

    def test_user_assessment_creation(self):
        self.assertEqual(str(self.user_assessment), f"Assessment {self.user.username}")

    def test_word_assessment_creation(self):
        self.assertEqual(str(self.word_assessment1), f"WordAssessment {self.word1.word}")
        self.assertEqual(str(self.word_assessment2), f"WordAssessment {self.word2.word}")

    def test_user_word_assessment_mapping_creation(self):
        # Create UserWordAssessmentMapping
        mapping1 = UserWordAssessmentMapping.objects.create(
            assessment=self.user_assessment, word_assessment=self.word_assessment1
        )
        mapping2 = UserWordAssessmentMapping.objects.create(
            assessment=self.user_assessment, word_assessment=self.word_assessment2
        )

        self.assertEqual(
            str(mapping1), f"UserWordAssessment Assessment {self.user.username} WordAssessment {self.word1.word}"
        )
        self.assertEqual(
            str(mapping2), f"UserWordAssessment Assessment {self.user.username} WordAssessment {self.word2.word}"
        )


class UserAssessmentSerializerTestCase(TestCase):
    def setUp(self):
        """Sets up the test data required for all tests."""
        self.user = User.objects.create(username="testuser", email="testuser@gmail.com", password="testpassword")
        self.user_profile = UserProfile.objects.create(user=self.user)
        self.word1 = Word.objects.create(word="hate")
        self.word2 = Word.objects.create(word="love")
        self.word3 = Word.objects.create(word="ball")
        self.word4 = Word.objects.create(word="car")

    def create_serializer(self, data):
        """Helper method to initialize and return the serializer with data."""
        return UserAssessmentSerializer(data=data)

    def test_invalid_empty_data(self):
        """Tests validation error when no data is provided."""
        serializer = self.create_serializer(data={})

        self.assertFalse(serializer.is_valid())
        self.assertEqual(set(serializer.errors.keys()), {'selected_words', 'unselected_words'})
        self.assertEqual(serializer.errors['selected_words'][0], ErrorDetail('This field is required.', code='required'))
        self.assertEqual(
            serializer.errors['unselected_words'][0], ErrorDetail('This field is required.', code='required')
        )

    def test_invalid_empty_selected_unselected_words(self):
        """Tests validation error when selected_words and unselected_words are empty."""
        data = {"selected_words": [], "unselected_words": []}
        serializer = self.create_serializer(data=data)

        self.assertFalse(serializer.is_valid())
        self.assertEqual(set(serializer.errors.keys()), {'non_field_errors'})
        self.assertEqual(
            serializer.errors['non_field_errors'][0],
            ErrorDetail('Both selected_words and unselected_words are required.', code='invalid'),
        )

    def test_valid_data(self):
        """Tests valid data case for successful validation."""
        selected_words = [self.word1.id, self.word2.id]
        unselected_words = [self.word3.id, self.word4.id]
        data = {"selected_words": selected_words, "unselected_words": unselected_words}

        serializer = self.create_serializer(data=data)

        self.assertTrue(serializer.is_valid())
        validated_data = serializer.validated_data
        self.assertEqual(validated_data["selected_words"], selected_words)
        self.assertEqual(validated_data["unselected_words"], unselected_words)

    def test_partial_data_missing_unselected_words(self):
        """Tests validation error when only selected_words are provided."""
        data = {"selected_words": [self.word1.id, self.word2.id]}
        serializer = self.create_serializer(data=data)

        self.assertFalse(serializer.is_valid())
        self.assertEqual(set(serializer.errors.keys()), {'unselected_words'})
        self.assertEqual(
            serializer.errors['unselected_words'][0], ErrorDetail('This field is required.', code='required')
        )

    def test_partial_data_missing_selected_words(self):
        """Tests validation error when only unselected_words are provided."""
        data = {"unselected_words": [self.word3.id, self.word4.id]}
        serializer = self.create_serializer(data=data)

        self.assertFalse(serializer.is_valid())
        self.assertEqual(set(serializer.errors.keys()), {"selected_words"})
        self.assertEqual(
            serializer.errors["selected_words"][0],
            ErrorDetail("This field is required.", code="required"),
        )
