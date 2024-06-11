from django.db import models
from core.models import BaseModel
from settings.models import  UserProfile
from progress_tracking.models import UserWordProgress
from books.models import UserBook

    
class UserTrainedModel(BaseModel):
    name = models.CharField(max_length=255)
    description = models.TextField()
    file_path = models.CharField(max_length=255)
    is_ready = models.BooleanField(default=False)
    version = models.CharField(max_length=50)
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class BookPrediction(BaseModel):
    from_page = models.IntegerField()
    to_page = models.IntegerField()
    trained_model_version = models.CharField(max_length=50)
    book = models.ForeignKey(UserBook, on_delete=models.CASCADE)

    def __str__(self):
        return f"Prediction {self.id}"


class WordPredictionMapping(BaseModel):
    word_progress = models.ForeignKey(UserWordProgress, on_delete=models.CASCADE)
    prediction = models.ForeignKey(BookPrediction, on_delete=models.CASCADE)

    def __str__(self):
        return f"WordPrediction {self.id}"