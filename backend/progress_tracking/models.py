from django.db import models
from core.models import BaseModel
from settings.models import Profile, UserProfile
from word.models import Word, WordMeaning

status_choices = [("known", "known"), ("unknown", "unknown")]
class WordProgress(BaseModel):
    word = models.ForeignKey(Word, on_delete=models.CASCADE, related_name="word_progress")
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="word_progress")
    status = models.CharField(choices=status_choices, default="unknown", max_length=20)

class UserWordProgress(BaseModel):
    is_known = models.BooleanField(default=False)
    word_meaning = models.ForeignKey(WordMeaning, on_delete=models.CASCADE)
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)

    def __str__(self):
        return f"WordProgress {self.id}"
    
