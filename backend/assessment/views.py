import logging

from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import UserAssessment
from .serializers import UserAssessmentSerializer


logger = logging.getLogger(__name__)


class AssessmentViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = UserAssessmentSerializer

    @action(detail=False, methods=["get"], url_path="assessment-status")
    def assessment_status(self, request):
        exists = UserAssessment.objects.filter(profile__user=request.user).exists()
        return Response({"assessment_exists": exists}, status=status.HTTP_200_OK)
