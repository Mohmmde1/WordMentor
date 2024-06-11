from rest_framework import serializers
from .models import UserAssessment


class UserAssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        model = UserAssessment
