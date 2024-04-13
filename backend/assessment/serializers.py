from rest_framework import serializers
from .models import Assessment

class AssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        model = Assessment
