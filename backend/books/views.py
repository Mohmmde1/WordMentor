import logging

from rest_framework import viewsets

from .models import UserBook
from .permissions import IsOwner
from .serializers import UserBookSerializer


logger = logging.getLogger(__name__)


class BookViewSet(viewsets.ModelViewSet):
    queryset = UserBook.objects.all()
    serializer_class = UserBookSerializer
    permission_classes = [IsOwner]

    def get_queryset(self):
        return UserBook.objects.filter(profile__user=self.request.user)
