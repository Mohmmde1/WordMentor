from rest_framework import serializers

from .models import UserBook


class UserBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserBook
        fields = "__all__"
