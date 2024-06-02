from django.db import models
from books.models import Book
from core.models import BaseModel
from settings.models import Profile
from progress_tracking.models import WordProgress
class TrainedModel(BaseModel):
    profile = models.OneToOneField(Profile, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=100)
    version = models.CharField(max_length=20)
    description = models.TextField()
    file_path = models.CharField(max_length=255) 
    status = models.CharField(max_length=20, default="created")

class Prediction(BaseModel):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="predictions")
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="predictions")
    trained_model_version = models.CharField(max_length=20)
    from_page = models.IntegerField()
    to_page = models.IntegerField()
    class Meta:
        verbose_name = "Prediction"
        verbose_name_plural = "Predictions"

    def __str__(self):
        return f"Prediction for {self.profile} using {self.trained_model_version}"
    
class WordPrediction(WordProgress):
    prediction = models.ForeignKey(Prediction, on_delete=models.CASCADE, related_name="word_predictions")
    
    