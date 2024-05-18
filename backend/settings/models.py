from word.models import Word
from django.db import models
from django.utils.text import slugify

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
    known_words = models.ManyToManyField(
        Word, related_name='profiles_known', blank=True)
    unknown_words = models.ManyToManyField(
        Word, related_name='profiles_unknown', blank=True)

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
        return self.assessment != None

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
        selected_words = self.known_words.values_list('entry', flat=True)
        unselected_words = self.unknown_words.values_list('entry', flat=True)
        labeled_data = {word: 1 for word in selected_words}
        labeled_data.update({word: 0 for word in unselected_words})
        return labeled_data

    def __str__(self):
        return f"Profile for {self.user.username}"
