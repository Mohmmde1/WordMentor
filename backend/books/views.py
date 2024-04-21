from rest_framework import mixins, viewsets, status
from rest_framework.response import Response

from .models import Book
from .serializers import BookSerializer


class BookViewSet(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.DestroyModelMixin,
                  viewsets.GenericViewSet):

    queryset = Book.objects.all()
    serializer_class = BookSerializer
    