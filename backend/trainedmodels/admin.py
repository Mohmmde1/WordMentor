from django.contrib import admin
from .models import UserTrainedModel, BookPrediction, WordPredictionMapping

admin.site.register(UserTrainedModel)
admin.site.register(BookPrediction)
admin.site.register(WordPredictionMapping)