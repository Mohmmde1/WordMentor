from django.shortcuts import render

from rest_framework import mixins, viewsets

from .serializers import ProfileSerializer
from .models import Profile

class ProfileViewSet(mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   viewsets.GenericViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
