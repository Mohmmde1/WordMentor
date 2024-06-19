from django.db import IntegrityError
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from unittest.mock import patch, MagicMock

from wordmentor_auth.models import User
from word.models import Word, WordMeaning
from progress_tracking.models import UserWordProgress
from settings.models import UserProfile
from .models import UserAssessment, WordAssessment, UserWordAssessmentMapping

class AssessmentViewSetTest(TestCase):
    
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(username='testuser', email='testuser@gmail.com', password='testpassword')
        self.user_profile = UserProfile.objects.create(user=self.user)
        self.client.force_authenticate(user=self.user)
        self.word1 = Word.objects.create(word='hate')
        self.word2 = Word.objects.create(word='love')
        self.word3 = Word.objects.create(word='ball')
        self.word4 = Word.objects.create(word='car')
        self.url = reverse("assessment-list") 

    def test_create_missing_profile_id(self):
        data = {
            'selected_words': [self.word1.id, self.word2.id],
            'unselected_words': [self.word3.id, self.word4.id],
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {"error": "Profile ID is required"})

    def test_create_missing_selected_unselected_words(self):
        data = {
            'profile': self.user_profile.id,
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {"error": "Both selected_words and unselected_words are required"})

    @patch('django.shortcuts.get_object_or_404')
    def test_create_assessment_success(self, mock_get_object_or_404):
        mock_get_object_or_404.return_value = self.user_profile

        data = {
            'profile': self.user_profile.id,
            'selected_words': [self.word1.id, self.word2.id],
            'unselected_words': [self.word3.id, self.word4.id],
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(UserAssessment.objects.filter(profile=self.user_profile).exists())
        self.assertEqual(UserWordProgress.objects.filter(profile=self.user_profile).count(), 4)

    @patch('django.shortcuts.get_object_or_404')
    @patch('django.db.transaction.atomic')
    def test_create_assessment_integrity_error(self, mock_atomic, mock_get_or_404):
        mock_atomic.side_effect = IntegrityError
        mock_get_or_404.return_value = self.user_profile

        data = {
            'profile': self.user_profile.id,
            'selected_words': [self.word1.id, self.word2.id],
            'unselected_words': [self.word3.id, self.word4.id],
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(response.data, {"error": "IntegrityError occurred while creating assessment"})

    @patch('django.shortcuts.get_object_or_404')
    @patch('word.models.WordMeaning.objects.get_or_fetch')
    def test_create_assessment_generic_exception(self, mock_get_or_fetch, mock_get_object_or_404):
        mock_get_object_or_404.return_value = self.user_profile
        mock_get_or_fetch.side_effect = Exception("Random error")

        data = {
            'profile': self.user_profile.id,
            'selected_words': [self.word1.id, self.word2.id],
            'unselected_words': [self.word3.id, self.word4.id],
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(response.data, {"error": "Random error"})

    def test_assessment_status(self):
        self.client.force_authenticate(user=self.user_profile.user)
        url = reverse('assessment-assessment-status') 
        UserAssessment.objects.create(profile=self.user_profile)

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'assessment_exists': True})

        UserAssessment.objects.all().delete()
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'assessment_exists': False})

class AssessmentModelsTestCase(TestCase):
    def setUp(self):
        # Create a user
        self.user = User.objects.create_user(username='testuser', email='testuser@example.com', password='testpass')
        self.user_profile = UserProfile.objects.create(user=self.user)

        # Create words
        self.word1 = Word.objects.create(word='testword1')
        self.word2 = Word.objects.create(word='testword2')

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
        mapping1 = UserWordAssessmentMapping.objects.create(assessment=self.user_assessment, word_assessment=self.word_assessment1)
        mapping2 = UserWordAssessmentMapping.objects.create(assessment=self.user_assessment, word_assessment=self.word_assessment2)

        self.assertEqual(str(mapping1), f"UserWordAssessment Assessment {self.user.username} WordAssessment {self.word1.word}")
        self.assertEqual(str(mapping2), f"UserWordAssessment Assessment {self.user.username} WordAssessment {self.word2.word}")
