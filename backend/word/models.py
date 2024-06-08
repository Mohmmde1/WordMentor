from django.db import models
from core.models import BaseModel

from .managers import WordManager

class Word(BaseModel):
    word = models.CharField(max_length=255)

    def __str__(self):
        return self.word
