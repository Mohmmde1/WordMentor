from django.db import models
from django.utils.text import slugify


class UserProfile(models.Model):
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    slug = models.SlugField(unique=True)
    user = models.OneToOneField('wordmentor_auth.User', on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

    def save(self, *args, **kwargs):
        """
        Override the save method to generate and update the slug field.
        """
        if not self.slug:
            # Generate slug based on user's username
            self.slug = slugify(self.user.username)
        super().save(*args, **kwargs)

    @property
    def has_taken_assessment(self):
        """
        Property method to check if an assessment related to the profile exists.
        """
        try:
            from progress_tracking.models import UserAssessment

            return UserAssessment.objects.filter(profile=self).exists()
        except Exception:
            # Log error if needed
            return False

    def extract_data(self):
        """
        Method to generate a dictionary of labeled words for the ML model.
        """
        from progress_tracking.models import UserWordProgress

        unknown_words = UserWordProgress.objects.filter(profile=self, is_known=False).values_list(
            'word_meaning__word__word', flat=True
        )
        known_words = UserWordProgress.objects.filter(profile=self, is_known=True).values_list(
            'word_meaning__word__word', flat=True
        )

        # Create a dictionary with the words as keys and their labels as values
        labeled_data = {word: 1 for word in known_words}
        labeled_data.update({word: 0 for word in unknown_words})
        return labeled_data
