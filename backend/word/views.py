import logging

from django.core.exceptions import ValidationError
from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from assessment.models import WordAssessment

from .models import Word, WordMeaning
from .serializers import WordAssessmentListSerializer, WordMeaningSerializer

logger = logging.getLogger(__name__)
class WordViewSet(mixins.RetrieveModelMixin,
                   viewsets.GenericViewSet):
    """
    A simple ViewSet for retrieving word details.
    """

    def retrieve(self, request, pk=None):
        """
        Retrieve word details for a given word entry.
        """
        word_entry = pk

        if not word_entry:
            return Response({"error": "Word entry is missing"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Attempt to fetch the word using the custom manager method
            word = WordMeaning.objects.get_or_fetch(word=word_entry)
            serializer = WordMeaningSerializer(word)
            return Response(serializer.data)

        except Word.DoesNotExist:
            logger.error("Word with entry '%s' not found in database and API call failed", word_entry)
            return Response({"error": f"Failed to retrieve details for '{word_entry}'"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error("An error occurred while retrieving word details for '%s': %s", word_entry, str(e))
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    @action(detail=False, methods=['GET'], url_path='assessment')
    def get_assessment_words(self, request):
        word_assessments = WordAssessment.objects.all()
        serializer = WordAssessmentListSerializer(word_assessments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
