from settings.models import Profile
from django.db import models

from core.models import BaseModel

class Assessment(BaseModel):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)
