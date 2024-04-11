from rest_framework.response import Response
from rest_framework import mixins, viewsets, status


from .models import Word
from .serializers import WordSerializer
from .wdapi_integration import create_word_object

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

        # Check if the word exists in the database
        try:
            word = Word.objects.get(entry=word_entry)
            serializer = WordSerializer(word)
            return Response(serializer.data)
        except Word.DoesNotExist:
            pass  # Word does not exist in the database, fetch from API

        # Fetch word details from the API
        word_data = create_word_object(word_entry)
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
