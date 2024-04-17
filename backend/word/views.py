from rest_framework.response import Response
from rest_framework import mixins, viewsets, status
from django.core.exceptions import ValidationError
from rest_framework.decorators import action

from .models import Word
from .serializers import WordListSerializer, WordSerializer
from .wdapi_integration import create_word_objects

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
            # Attempt to fetch the word from the database
            word = Word.objects.get(entry=word_entry)
            serializer = WordSerializer(word)
            return Response(serializer.data)

        except Word.DoesNotExist:
            try:
                # Fetch word details from the API
                word_data = create_word_objects([word_entry])[0]

                if word_data:
                    # Save word details to the database
                    serializer = WordSerializer(data=word_data)
                    if serializer.is_valid():
                        serializer.save()
                        return Response(serializer.data, status=status.HTTP_201_CREATED)
                    else:
                        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({"error": f"Failed to retrieve details for '{word_entry}'"}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['GET'], url_path='assessment')
    def get_assessment_words(self, request):
        words = []
        for i in range(1, 11):
            words.extend(list(Word.objects.filter(ten_degree=i)[:10]))
        serializer = WordListSerializer(words, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
