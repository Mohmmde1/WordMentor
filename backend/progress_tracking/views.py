from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import UserWordProgress
from .serializers import UserWordProgressSerializer
from .permissions import IsOwner

from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import UserWordProgress
from .serializers import UserWordProgressSerializer
from .permissions import IsOwner

from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import F

class WordProgressViewSet(ModelViewSet):
    """
    A simple ViewSet for viewing and editing progress words.
    """
    queryset = UserWordProgress.objects.all()
    serializer_class = UserWordProgressSerializer
    permission_classes = [IsAuthenticated, IsOwner]  # Use a list to define permission classes

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
        queryset.filter(word_meaning__word__word=word_text).update(is_known=True)
        return Response({'message': f'Word progress for "{word_text}" updated successfully'}, status=200)

