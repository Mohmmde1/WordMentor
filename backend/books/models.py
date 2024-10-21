from django.db import models

from core.models import BaseModel
from settings.models import UserProfile


class UserBook(BaseModel):
    file_path = models.FileField(upload_to='books/')
    pages = models.IntegerField()
    title = models.CharField(max_length=255)
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
