from django.shortcuts import get_object_or_404

from settings.models import UserProfile


def get_profile(context):
    user = context["request"].user
    return get_object_or_404(UserProfile, user=user)
