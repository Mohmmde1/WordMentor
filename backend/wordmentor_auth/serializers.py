import logging

from django.db import transaction
from django.forms import ValidationError
from rest_framework import serializers

from dj_rest_auth.registration.serializers import RegisterSerializer

from settings.models import UserProfile

from .models import User


logger = logging.getLogger(__name__)


class CustomRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(write_only=True)
    last_name = serializers.CharField(write_only=True)

    def validate(self, data):
        logger.debug("Validating registration data: %s", data)
        return super().validate(data)

    def custom_signup(self, request, user):
        logger.debug("Request data at signup: %s", request.data)
        first = request.data.get("first_name")
        last = request.data.get("last_name")

        if not first or not last:
            logger.error("First name or last name not provided.")
            raise ValidationError("First name and last name are required.")

        with transaction.atomic():
            user.first_name = first
            user.last_name = last
            user.save()

            UserProfile.objects.create(user=user)
            logger.debug("User and UserProfile created: %s, %s", user, user.userprofile)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        model = User


class UserDetailSerializer(serializers.ModelSerializer):
    profile_info = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name", "profile_info"]

    def get_profile_info(self, obj):
        try:
            profile = UserProfile.objects.get(user=obj)
            profile_info = {"profile_id": profile.id, "has_taken_assessment": profile.has_taken_assessment}
            logger.debug("Profile info for user %s: %s", obj, profile_info)
            return profile_info
        except UserProfile.DoesNotExist:
            logger.debug("No profile found for user %s", obj)
            return {"profile_id": None, "has_taken_assessment": None}
