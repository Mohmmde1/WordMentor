from rest_framework import serializers

from wordmentor_auth.serializers import UserSerializer

from .models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    avatar_url = serializers.SerializerMethodField()
    has_taken_assessment = serializers.BooleanField()

    class Meta:
        model = UserProfile
        fields = ["id", "user", "avatar", "slug", "avatar_url", "has_taken_assessment"]

    def get_avatar_url(self, obj):
        """
        Method to get the full URL of the avatar image.
        """
        if obj.avatar:
            return obj.avatar.url
        return None
