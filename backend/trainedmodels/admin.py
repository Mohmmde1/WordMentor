from django.contrib import admin
from .models import TrainedModel, Prediction

admin.site.register(TrainedModel)
admin.site.register(Prediction)