from rest_framework import mixins, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

from .models import Book
from .serializers import BookSerializer


class BookViewSet(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.DestroyModelMixin,
                  viewsets.GenericViewSet):

    queryset = Book.objects.all()
    serializer_class = BookSerializer
    
    @action(detail=False, methods=['get'], url_path='by-profile/(?P<profile_id>[^/.]+)')  
    def get_books_by_profile(self, request, profile_id, *args, **kwargs):
        try:
            books = Book.objects.filter(profiles__id=profile_id)
            serializer = BookSerializer(books, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"error": "Books not found for the given profile ID"}, status=status.HTTP_404_NOT_FOUND)