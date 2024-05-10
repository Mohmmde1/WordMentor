from django.db import models
from core.models import BaseModel
from settings.models import Profile

class TrainedModel(BaseModel):
    profile = models.OneToOneField(Profile, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=100)
    version = models.CharField(max_length=20)
    description = models.TextField()
    file_path = models.CharField(max_length=255) 


