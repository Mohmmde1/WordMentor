from django.db import models

from core.models import BaseModel
from settings.models import Profile, UserProfile

class Book(BaseModel):
    title = models.CharField(max_length=255)
    pages = models.IntegerField()
    file = models.FileField(upload_to="books/", null=True, blank=True)  
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="books")

    def __str__(self):
        return f"id: {self.pk}, title: {self.title}"
    
class UserBook(BaseModel):
    book_id = models.AutoField(primary_key=True)
    file_path = models.FileField(upload_to='books/')
    pages = models.IntegerField()
    title = models.CharField(max_length=255)
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)

    def __str__(self):
        return self.title