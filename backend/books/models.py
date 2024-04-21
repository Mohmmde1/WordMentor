from django.db import models

from core.models import BaseModel

class Book(BaseModel):
    title = models.CharField(max_length=255)
    pages = models.IntegerField()
    # cover = models.ImageField(upload_to='covers/', null=True, blank=True)

    def __str__(self):
        return f"id: {self.pk}, title: {self.title}"