import logging

from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response

from .models import UserProfile
from .serializers import UserProfileSerializer


logger = logging.getLogger(__name__)


class ProfileViewSet(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()
    parser_classes = (MultiPartParser, FormParser)

    @action(detail=True, methods=['post'], url_path='upload-image')
    def upload_image(self, request, pk=None):
        profile = self.get_object()
        serializer = self.get_serializer(profile, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'], url_path='by-user/(?P<user_id>[^/.]+)')
    def get_profile_by_user(self, request, user_id):
        try:
            # Fetch the profile associated with the given user ID
            profile = UserProfile.objects.get(user_id=user_id)
            serializer = self.get_serializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response({"error": "Profile not found for the given user ID"}, status=status.HTTP_404_NOT_FOUND)
