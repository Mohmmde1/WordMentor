from django.db import models
from core.models import BaseModel

class TrainedModel(BaseModel):
    name = models.CharField(max_length=100)
    version = models.CharField(max_length=20)
    description = models.TextField()
    file_path = models.CharField(max_length=255) 


