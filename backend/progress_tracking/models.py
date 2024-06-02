from django.db import models
from core.models import BaseModel
from settings.models import Profile
from word.models import Word

status_choices = [("known", "known"), ("unknown", "unknown")]
class WordProgress(BaseModel):
    word = models.ForeignKey(Word, on_delete=models.CASCADE, related_name="word_progress")
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="word_progress")
    status = models.CharField(choices=status_choices, default="unknown", max_length=20)

# class Flashcard(BaseModel):
#     word_progress = models.ForeignKey(WordProgress, on_delete=models.CASCADE, related_name="flashcards")
#     status = models.CharField(max_length=20, default="started")
#     last_shown = models.DateTimeField(null=True)
#     next_show = models.DateTimeField(null=True)
#     interval = models.IntegerField(default=0)
#     repetitions = models.IntegerField(default=0)
#     easiness = models.FloatField(default=2.5)
#     quality = models.IntegerField(default=0)
#     review_date = models.DateTimeField(null=True)
#     review_interval = models.IntegerField(default=0)
#     review_repetitions = models.IntegerField(default=0)
#     review_easiness = models.FloatField(default=2.5)
#     review_quality = models.IntegerField(default=0)
#     review_review_date = models.DateTimeField(null=True)
#     review_review_interval = models.IntegerField(default=0)
#     review_review_repetitions = models.IntegerField(default=0)
#     review_review_easiness = models.FloatField(default=2.5)
#     review_review_quality = models.IntegerField(default=0)
#     review_review_review_date = models.DateTimeField(null=True)
#     review_review_review_interval = models.IntegerField(default=0)
#     review_review_review_repetitions = models.IntegerField(default=0)
#     review_review_review_easiness = models.FloatField(default=2.5)
    
    
    
