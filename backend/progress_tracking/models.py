from django.db import models

from core.models import BaseModel
from settings.models import UserProfile
from word.models import WordMeaning


class UserWordProgress(BaseModel):
    is_known = models.BooleanField(default=False)
    word_meaning = models.ForeignKey(WordMeaning, on_delete=models.CASCADE)
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)

    def __str__(self):
        return f"WordProgress's {self.profile.user.first_name}"
    
