from django.db import models

from core.models import BaseModel
from settings.models import Profile

class Book(BaseModel):
    title = models.CharField(max_length=255)
    pages = models.IntegerField()
    file = models.FileField(upload_to="books/", null=True, blank=True)  
    profiles = models.ManyToManyField(Profile)

    def __str__(self):
        return f"id: {self.pk}, title: {self.title}"