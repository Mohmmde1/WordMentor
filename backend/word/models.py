from django.db import models
from core.models import BaseModel


class Word(BaseModel):
    word = models.CharField(max_length=255)

    def __str__(self):
        return self.word

from .managers import WordMeaningManager

class WordMeaning(models.Model):
    definition = models.TextField()
    part_of_speech = models.CharField(max_length=50)
    example_sentence = models.TextField()
    word = models.ForeignKey(Word, on_delete=models.CASCADE)
    objects = WordMeaningManager()

    def __str__(self):
        return self.definition