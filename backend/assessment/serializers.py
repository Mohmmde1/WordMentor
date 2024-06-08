from rest_framework import serializers
from .models import Assessment, UserAssessment

class AssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        model = Assessment

class UserAssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        model = UserAssessment
