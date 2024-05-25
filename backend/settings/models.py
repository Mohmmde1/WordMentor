from word.models import Word
from django.db import models
from django.utils.text import slugify
from assessment.models import Assessment

from wordmentor_auth.models import User
from core.models import BaseModel


class Profile(BaseModel):
    """
    This model represents user profiles and establishes a one-to-one
    relationship with the User model provided by the wordmentor_auth app.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    slug = models.SlugField(max_length=255, unique=True)
    assessment = models.OneToOneField(Assessment, on_delete=models.SET_NULL, null=True, related_name='profile')

    def save(self, *args, **kwargs):
        """
        Override the save method to generate and update the slug field.
        """
        if not self.slug:
            # Generate slug based on user's email or any other field
            self.slug = slugify(self.user.username)
        super().save(*args, **kwargs)

    @property
    def has_taken_assessment(self):
        """
        Property method to check if an assessment related to the profile exists.
        """
        try:
            return self.assessment is not None
        except Assessment.DoesNotExist:
            return False  # Or you can return 'skull' if you prefer
 # Or you can re

    @property
    def get_avatar_url(self):
        """
        Property method to get the full URL of the avatar image.
        """
        if self.avatar:
            return self.avatar.url
        return None

    def extract_data(self):
        """
        Method to generte a dictionary of labled words for the ML model.
        """
        known_words = self.word_progress.filter(status="unknown").word.values_list('entry', flat=True)
        unknown_words = self.word_progress.filter(status="known").word.values_list('entry', flat=True)
        labeled_data = {word: 1 for word in known_words}
        
        labeled_data.update({word: 0 for word in unknown_words})
        return labeled_data

    def __str__(self):
        return f"Profile for {self.user.username}"
