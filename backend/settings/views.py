import logging
from django.shortcuts import render

from rest_framework import mixins, viewsets, status
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response

from word.wdapi_integration import create_word_objects
from word.models import Word

from .serializers import ProfileSerializer
from .models import Profile

logger = logging.getLogger(__name__)
class ProfileViewSet(mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   viewsets.GenericViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
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
            profile = Profile.objects.get(user_id=user_id)
            serializer = self.get_serializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Profile.DoesNotExist:
            return Response({"error": "Profile not found for the given user ID"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'], url_path='remove-word')
    def remove_word(self, request, pk=None):
        profile = self.get_object()
        word_entry = request.data.get('word')

        if not word_entry:
            logger.error("Word entry is missing in the request data")
            return Response({'error': 'Word entry is missing'}, status=status.HTTP_400_BAD_REQUEST)
        
        word_entry = word_entry.lower()

        try:
            word_to_remove = Word.objects.get_or_fetch(entry=word_entry)
        except Word.DoesNotExist:
            logger.error(f"Failed to retrieve details for '{word_entry}'")
            return Response({'error': f"Failed to retrieve details for '{word_entry}'"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.exception(f"An error occurred while fetching word '{word_entry}'")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if word_to_remove in profile.unknown_words.all():
            profile.unknown_words.remove(word_to_remove)
            logger.info(f"Word '{word_entry}' removed from unknown words")

        if word_to_remove not in profile.known_words.all():
            profile.known_words.add(word_to_remove)
            logger.info(f"Word '{word_entry}' added to known words")

        profile.save()
        logger.info(f"Profile updated successfully for user ID: {profile.user_id}")
        return Response({'status': f'Word {word_to_remove.entry} moved to known words'}, status=status.HTTP_200_OK)
