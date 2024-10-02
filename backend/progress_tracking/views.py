from datetime import timedelta

from django.db.models import F
from django.utils import timezone
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from trainedmodels.models import BookPrediction

from .models import UserWordProgress
from .permissions import IsOwner
from .serializers import UserWordProgressSerializer


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
        updated_count = queryset.filter(
            word_meaning__word__word=word_text).update(is_known=True)
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

    @action(detail=False, methods=['get'], url_path='statistics')
    def statistics(self, request):
        user = request.user
        now = timezone.now()
        last_week = now - timedelta(days=7)

        # Current counts
        current_known_words_count = self.get_queryset().filter(is_known=True).count()
        current_unknown_words_count = self.get_queryset().filter(is_known=False).count()
        current_predictions_counts = BookPrediction.objects.filter(
            book__profile__user=user).count()

        # Previous counts (words updated before last week)
        previous_known_words_count = self.get_queryset().filter(
            is_known=True, updated_at__lt=last_week).count()
        previous_unknown_words_count = self.get_queryset().filter(
            is_known=False, updated_at__lt=last_week).count()
        previous_predictions_counts = BookPrediction.objects.filter(
            book__profile__user=user, updated_at__lt=last_week).count()

        # Changes
        known_words_change = current_known_words_count - previous_known_words_count
        unknown_words_change = current_unknown_words_count - previous_unknown_words_count
        predictions_change = current_predictions_counts - previous_predictions_counts
        # Progress calculations
        current_progress = round(current_known_words_count / (current_known_words_count + current_unknown_words_count)
                                 * 100, 2) if (current_known_words_count + current_unknown_words_count) > 0 else 0
        previous_progress = round(previous_known_words_count / (previous_known_words_count + previous_unknown_words_count)
                                  * 100, 2) if (previous_known_words_count + previous_unknown_words_count) > 0 else 0
        progress_change = current_progress - previous_progress

        return Response({
            'known_words_count': current_known_words_count,
            'known_words_change': known_words_change,
            'unknown_words_count': current_unknown_words_count,
            'unknown_words_change': unknown_words_change,
            'progress': current_progress,
            'progress_change': progress_change,
            'predictions_count': current_predictions_counts,
            'predictions_change': predictions_change
        }, status=200)

    @action(detail=False, methods=['put'], url_path='update-words-status')
    def update_words_status(self, request):
        """
        Update the words status to known.
        """
        try:
            data = request.data.get('learnedWords', [])
            if not data:
                return Response({"error": "No data has been submitted"}, status=404)

            queryset = self.get_queryset()
            updated_count = queryset.filter(
                word_meaning__word__word__in=data).update(is_known=True)
            
            if updated_count == 0:
                return Response({"error": "No matching words found"}, status=404)

            return Response({"message": "Word status updated successfully"}, status=200)
        
        except Exception as e:
            return Response({"error": str(e)}, status=500)