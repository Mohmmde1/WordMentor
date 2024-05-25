from django.contrib import admin
from .models import TrainedModel, Prediction, WordPrediction

admin.site.register(TrainedModel)
admin.site.register(Prediction)
admin.site.register(WordPrediction)