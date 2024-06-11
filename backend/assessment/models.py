from django.db import models

from core.models import BaseModel


class UserAssessment(BaseModel):
    profile = models.ForeignKey('settings.UserProfile', on_delete=models.CASCADE)

    def __str__(self):
        return f"Assessment {self.profile.user.username}"


class WordAssessment(BaseModel):
    difficulty_level = models.CharField(max_length=50)
    word = models.ForeignKey('word.Word', on_delete=models.CASCADE)

    def __str__(self):
        return f"WordAssessment {self.word.word}"


class UserWordAssessmentMapping(BaseModel):
    assessment = models.ForeignKey('assessment.UserAssessment', on_delete=models.CASCADE)
    word_assessment = models.ForeignKey('assessment.WordAssessment', on_delete=models.CASCADE)

    def __str__(self):
        return f"UserWordAssessment {self.assessment.__str__} {self.word_assessment.__str__}"
