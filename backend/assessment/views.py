import logging
from rest_framework import mixins, viewsets, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db import IntegrityError, transaction
from rest_framework.decorators import action

from word.models import Word, WordMeaning
from progress_tracking.models import UserWordProgress
from settings.models import UserProfile
from .models import UserAssessment, WordAssessment, UserWordAssessmentMapping
from .serializers import UserAssessmentSerializer

logger = logging.getLogger(__name__)


class AssessmentViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = UserAssessmentSerializer

    @action(detail=False, methods=["get"], url_path="assessment-status")
    def assessment_status(self, request):
        exists = UserAssessment.objects.filter(profile__user=request.user).exists()
        return Response({"assessment_exists": exists}, status=status.HTTP_200_OK)
