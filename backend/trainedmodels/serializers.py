from rest_framework import serializers

from settings.models import UserProfile


class FineTuneSerializer(serializers.Serializer):
    profile = serializers.PrimaryKeyRelatedField(queryset=UserProfile.objects.all())

class PDFUploadSerializer(serializers.Serializer):
    from_page = serializers.IntegerField(min_value=1)
    to_page = serializers.IntegerField(min_value=1)
    book_id = serializers.IntegerField(min_value=1)
