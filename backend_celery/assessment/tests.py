from django.db import IntegrityError
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from settings.models import Profile
from word.models import Word
from .models import Assessment
from wordmentor_auth.models import User

class AssessmentViewSetTestCase(APITestCase):
    def setUp(self):
        # Create sample user, profile, and words for testing
        self.user = User.objects.create(email="test@example.com", username="testuser")
        self.profile = Profile.objects.create(user=self.user)
        self.word1 = Word.objects.create(entry="word1", meaning="meaning1")
        self.word2 = Word.objects.create(entry="word2", meaning="meaning2")
        self.url = reverse("assessment-list")
        self.client.force_authenticate(user=self.user)

    def test_create_assessment(self):
        # Test scenario where assessment is successfully created
        data = {
            "profile": self.profile.id,
            "selected_words": [self.word1.id],
            "unselected_words": [self.word2.id]
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Assessment.objects.count(), 1)
        assessment = Assessment.objects.first()
        self.assertEqual(assessment.profile, self.profile)
        self.assertCountEqual(assessment.profile.known_words.all(), [self.word1])
        self.assertCountEqual(assessment.profile.unknown_words.all(), [self.word2])
    
    def test_create_assessment_invalid_data(self):
        # Test scenario where invalid data is provided
        data = {
            "profile": self.profile.id,
            "selected_words": [self.word1.id],
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Assessment.objects.count(), 0)

    def test_create_assessment_missing_profile(self):
        # Test scenario where profile ID is missing
        data = {
            "selected_words": [self.word1.id],
            "unselected_words": [self.word2.id]
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Assessment.objects.count(), 0)

    def test_create_assessment_invalid_profile(self):
        # Test scenario where invalid profile ID is provided
        data = {
            "profile": self.profile.id + 999,  # Assuming this ID doesn't exist
            "selected_words": [self.word1.id],
            "unselected_words": [self.word2.id]
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Assessment.objects.count(), 0)

    def test_create_assessment_missing_words(self):
        # Test scenario where both selected and unselected words are missing
        data = {
            "profile": self.profile.id,
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Assessment.objects.count(), 0)

    def test_create_assessment_integrity_error(self):
        # Test scenario where an IntegrityError occurs during assessment creation
        data = {
            "profile": self.profile.id,
            "selected_words": [self.word1.id],
            "unselected_words": [self.word2.id]
        }

        # Simulate an IntegrityError by providing invalid data for assessment creation
        with self.assertRaises(IntegrityError):
            response = self.client.post(self.url, data, format='json')