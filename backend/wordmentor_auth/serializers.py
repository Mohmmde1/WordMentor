from django.db import transaction
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer

from .models import User
from settings.models import Profile
class CustomRegisterSerializer(RegisterSerializer):
     first_name = serializers.CharField(write_only=True)
     last_name = serializers.CharField(write_only=True)
     def custom_signup(self, request, user):
         print(request.data)
         first = request.data.get("first_name")
         last = request.data.get("last_name")

         # Wrap user creation and profile creation in a transaction
         with transaction.atomic():
             # Register the user first
             user.first_name = first
             user.last_name = last
             user.save()

             Profile.objects.create(user=user)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        model = User

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name"]
