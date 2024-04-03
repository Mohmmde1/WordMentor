from django.shortcuts import render

from rest_framework import mixins, viewsets

from .serializers import ProfileSerializer
from .models import Profile

class ProfileViewSet(mixins.CreateModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.DestroyModelMixin,
                   viewsets.GenericViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
