from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import F

from .models import UserWordProgress
from .serializers import UserWordProgressSerializer
from .permissions import IsOwner

class WordProgressViewSet(ModelViewSet):
    """
    A simple ViewSet for viewing and editing word progress.
    """
    queryset = UserWordProgress.objects.all()
    serializer_class = UserWordProgressSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        """
        This method restricts the queryset to only the words owned by the current user.
        """
        user = self.request.user
        return UserWordProgress.objects.filter(profile__user=user)

    @action(detail=False, methods=['put'], url_path='update-word-progress')
    def update_word_progress(self, request):
        """
        Update the is_known field of all instances of UserWordProgress with the provided word_text to True.
        """
        word_text = request.data.get('word_text', None)
        if not word_text:
            return Response({'error': 'Word text is required'}, status=400)

        queryset = self.get_queryset()
        updated_count = queryset.filter(word_meaning__word__word=word_text).update(is_known=True)
        if updated_count == 0:
            return Response({'error': 'No matching words found'}, status=404)
        return Response({'message': f'Word progress for "{word_text}" updated successfully'}, status=200)

    @action(detail=False, methods=['get'], url_path='known-words')
    def known_words(self, request):
        """
        Retrieve the list of known words for the current user.
        """
        known_words = self.get_queryset().filter(is_known=True)
        serializer = self.get_serializer(known_words, many=True)
        return Response(serializer.data, status=200)
    
    @action(detail=False, methods=['get'], url_path='unknown-words')
    def unknown_words(self, request):
        """
        Retrieve the list of unknown words for the current user.
        """
        unknown_words = self.get_queryset().filter(is_known=False)
        serializer = self.get_serializer(unknown_words, many=True)
        return Response(serializer.data, status=200)
