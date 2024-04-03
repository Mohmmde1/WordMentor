from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer

from .models import User

class CustomRegisterSerializer(RegisterSerializer):
     first_name = serializers.CharField(write_only=True)
     last_name = serializers.CharField(write_only=True)
     def custom_signup(self, request, user):
         print(request.data)
         first = request.data.get("first_name")
         last = request.data.get("last_name")
         user.first_name = first
         user.last_name = last
         user.save()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        model = User
