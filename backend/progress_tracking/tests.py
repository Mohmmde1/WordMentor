from io import BytesIO

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from django.utils.dateparse import parse_datetime
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from rest_framework.test import APIClient, APITestCase

from progress_tracking.models import UserWordProgress
from progress_tracking.serializers import UserWordProgressSerializer
from settings.models import UserProfile
from word.models import Word, WordMeaning

User = get_user_model()

class UserWordProgressTestCase(TestCase):
    
    def setUp(self):
        # Create a user
        self.user = User.objects.create_user(username='testuser', email='testuser@example.com', password='testpass', first_name='Test', last_name='User')
        self.user_profile = UserProfile.objects.create(user=self.user)
        
        # Create a word meaning
        self.word_meaning = WordMeaning.objects.get_or_fetch(word='ball')

    def test_user_word_progress_creation(self):
        # Create a UserWordProgress instance
        user_word_progress = UserWordProgress.objects.create(
            is_known=True,
            word_meaning=self.word_meaning,
            profile=self.user_profile
        )
        
        # Assert instance creation
        self.assertTrue(UserWordProgress.objects.filter(id=user_word_progress.id).exists())
        
        # Assert field values
        self.assertEqual(user_word_progress.is_known, True)
        self.assertEqual(user_word_progress.word_meaning, self.word_meaning)
        self.assertEqual(user_word_progress.profile, self.user_profile)
        
        # Assert __str__ method
        self.assertEqual(str(user_word_progress), f"WordProgress's {self.user.first_name}")

    def test_default_is_known(self):
        # Create a UserWordProgress instance without specifying 'is_known'
        user_word_progress = UserWordProgress.objects.create(
            word_meaning=self.word_meaning,
            profile=self.user_profile
        )
        
        # Assert default 'is_known' value
        self.assertFalse(user_word_progress.is_known)

    def test_user_word_progress_str_method(self):
        # Create a UserWordProgress instance
        user_word_progress = UserWordProgress.objects.create(
            is_known=False,
            word_meaning=self.word_meaning,
            profile=self.user_profile
        )
        
        # Assert __str__ method
        self.assertEqual(user_word_progress.__str__(), f"WordProgress's {self.user.first_name}")

class UserWordProgressSerializerTestCase(TestCase):
    
    def setUp(self):
        # Create a user
        self.user = User.objects.create_user(username='testuser', email='testuser@example.com', password='testpass', first_name='Test', last_name='User')
        self.user_profile = UserProfile.objects.create(user=self.user)
        
        # Create a word and word meaning
        self.word = Word.objects.create(word='ball')
        self.word_meaning = WordMeaning.objects.get_or_fetch(word=self.word)
        
        # Create a UserWordProgress instance
        self.user_word_progress = UserWordProgress.objects.create(
            is_known=True,
            word_meaning=self.word_meaning,
            profile=self.user_profile
        )
        
        # Serializer data
        self.serializer_data = {
            'created_at': self.user_word_progress.created_at,
            'word': self.word.word,
            'is_known': True
        }

    def test_contains_expected_fields(self):
        serializer = UserWordProgressSerializer(instance=self.user_word_progress)
        data = serializer.data
        self.assertCountEqual(data.keys(), ['created_at', 'word', 'is_known'])

    def test_field_contents(self):
        serializer = UserWordProgressSerializer(instance=self.user_word_progress)
        data = serializer.data
        self.assertEqual(parse_datetime(data['created_at']), self.user_word_progress.created_at)
        self.assertEqual(data['word'], self.word.word)
        self.assertEqual(data['is_known'], True)

    def test_serialization(self):
        serializer = UserWordProgressSerializer(instance=self.user_word_progress)
        json_data = JSONRenderer().render(serializer.data)
        expected_data = JSONRenderer().render(self.serializer_data)
        self.assertEqual(json_data, expected_data)

    def test_deserialization(self):
        json_data = JSONRenderer().render(self.serializer_data)
        stream = BytesIO(json_data)
        data = JSONParser().parse(stream)
        serializer = UserWordProgressSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data['is_known'], True)
        # Since 'word' is a read-only field, it won't be in validated_data.
        # We need to check other fields


    def test_invalid_data(self):
        invalid_data = {
            'created_at': self.user_word_progress.created_at,
            'word': '',  # word should not be empty
            'is_known': 'invalid'  # is_known should be a boolean
        }
        serializer = UserWordProgressSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertEqual(set(serializer.errors.keys()), set(['is_known']))


class WordProgressViewSetTestCase(APITestCase):

    def setUp(self):
        # Create a user and user profile
        self.user = User.objects.create_user(username='testuser', email='testuser@example.com', password='testpass')
        self.user_profile = UserProfile.objects.create(user=self.user)

        # Create a word and word meaning
        self.word = Word.objects.create(word='test')
        self.word_meaning = WordMeaning.objects.get_or_fetch(word=self.word)

        # Create a UserWordProgress instance
        self.user_word_progress = UserWordProgress.objects.create(
            is_known=True,
            word_meaning=self.word_meaning,
            profile=self.user_profile
        )

        self.client = APIClient()
        self.client.force_authenticate(user=self.user)


    def test_update_word_progress_success(self):
        url = reverse('word_progress-update-word-progress')
        data = {'word_text': 'test'}
        response = self.client.put(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Word progress for "test" updated successfully')

    def test_update_word_progress_no_word_text(self):
        url = reverse('word_progress-update-word-progress')
        response = self.client.put(url, {}, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Word text is required')

    def test_update_word_progress_no_matching_words(self):
        url = reverse('word_progress-update-word-progress')
        data = {'word_text': 'nonexistentword'}
        response = self.client.put(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], 'No matching words found')

    def test_known_words(self):
        url = reverse('word_progress-known-words')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['word'], 'test')

    def test_unknown_words(self):

        self.user_word_progress.is_known = False
        self.user_word_progress.save()

        url = reverse('word_progress-unknown-words')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['word'], 'test')

    def test_statistics(self):
            url = reverse('word_progress-statistics')
            response = self.client.get(url) 
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertIn('known_words_count', response.data)
            self.assertIn('known_words_change', response.data)
            self.assertIn('unknown_words_count', response.data)
            self.assertIn('unknown_words_change', response.data)
            self.assertIn('progress', response.data)
            self.assertIn('progress_change', response.data)
            self.assertIn('predictions_count', response.data)
            self.assertIn('predictions_change', response.data)


    def test_update_words_status(self):

        url = reverse('word_progress-update-words-status')
        data = {'learnedWords': ['test']}
        response = self.client.put(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Word status updated successfully')

    def test_update_words_status_no_data(self):
        url = reverse('word_progress-update-words-status')
        response = self.client.put(url, {}, format='json')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], 'No data has been submitted')

    def test_update_words_status_no_matching_words(self):

        url = reverse('word_progress-update-words-status')
        data = {'learnedWords': ['nonexistentword']}
        response = self.client.put(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], 'No matching words found')
        