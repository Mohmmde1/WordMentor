import logging

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

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

    @action(detail=False, methods=['delete'])
    def bulk_delete(self, request):
        logger.info(f"Bulk delete request data: {request.data}")
        try:
            # Assuming request.data contains a list of book IDs to delete
            book_ids = request.data.get('book_ids', [])
            if not book_ids:
                logger.warning("No book IDs provided for deletion")
                return Response({"error": "No book IDs provided for deletion"}, status=status.HTTP_400_BAD_REQUEST)
            books = UserBook.objects.filter(id__in=book_ids)
            books.delete()
            logger.info(f"Books with IDs {book_ids} deleted successfully")
            return Response({"message": "Books deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            logger.error(f"Error while bulk deleting books: {str(e)}", exc_info=True)
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
