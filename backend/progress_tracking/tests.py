from io import BytesIO
from django.test import TestCase
from django.contrib.auth import get_user_model
from settings.models import UserProfile
from word.models import WordMeaning, Word
from progress_tracking.models import UserWordProgress
from progress_tracking.serializers import UserWordProgressSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.utils.dateparse import parse_datetime

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

