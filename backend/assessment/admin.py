from django.contrib import admin
from assessment.models import UserAssessment, WordAssessment, UserWordAssessmentMapping

admin.site.register(UserAssessment)
admin.site.register(WordAssessment)
admin.site.register(UserWordAssessmentMapping)