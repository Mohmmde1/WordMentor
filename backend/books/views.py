from rest_framework import mixins, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied

from settings.models import Profile


from .permissions import IsOwner
from .models import Book
from .serializers import BookSerializer


class BookViewSet(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.DestroyModelMixin,
                  viewsets.GenericViewSet):

    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsOwner]
    

    @action(detail=False, methods=['get'], url_path='by-profile/(?P<profile_id>[^/.]+)')  
    def get_books_by_profile(self, request, profile_id, *args, **kwargs):
        try:
            profile = Profile.objects.get(pk=profile_id)
            self.check_object_permissions(request, profile)
            books = Book.objects.filter(profiles__id=profile_id)
            serializer = BookSerializer(books, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Profile.DoesNotExist:
            return Response({"error": "Profile not found for the given profile ID"}, status=status.HTTP_404_NOT_FOUND)
        except PermissionDenied:
            return Response({"error": "You do not have permission to access this profile"}, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
