from rest_framework import serializers

from settings.models import Profile

class FineTuneSerializer(serializers.Serializer):
    profile = serializers.PrimaryKeyRelatedField(queryset=Profile.objects.all())
