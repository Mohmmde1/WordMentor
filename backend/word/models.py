from django.db import models
from core.models import BaseModel

from .managers import WordManager

class Word(BaseModel):
    author = models.CharField(max_length=100)
    email = models.EmailField()
    entry = models.CharField(max_length=100)
    ipa = models.CharField(max_length=100)
    meaning = models.TextField()
    request = models.CharField(max_length=100)
    response = models.CharField(max_length=100)
    result_code = models.CharField(max_length=100)
    result_msg = models.CharField(max_length=100)
    version = models.CharField(max_length=100)
    ten_degree = models.IntegerField(default=0)
    objects = WordManager()

    def __str__(self):
        return self.entry

class WordNet(BaseModel):
    word = models.CharField(max_length=100, unique=True)
    definition = models.TextField()
    part_of_speech = models.CharField(max_length=50, blank=True)
    example_sentence = models.TextField(blank=True, default="")  # Provide a default value

    def __str__(self):
        return self.word
