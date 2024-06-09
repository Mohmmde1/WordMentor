from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import UserWordProgress
from .serializers import UserWordProgressSerializer
from .permissions import IsOwner

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
