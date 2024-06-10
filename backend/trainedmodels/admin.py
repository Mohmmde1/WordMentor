from django.contrib import admin
from .models import TrainedModel, Prediction, WordPrediction, UserTrainedModel, BookPrediction, WordPredictionMapping

admin.site.register(TrainedModel)
admin.site.register(Prediction)
admin.site.register(WordPrediction)

admin.site.register(UserTrainedModel)
admin.site.register(BookPrediction)
admin.site.register(WordPredictionMapping)