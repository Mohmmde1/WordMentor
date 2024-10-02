import logging

from PyPDF2 import PdfReader
from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from settings.models import UserProfile

from .models import UserBook
from .permissions import IsOwner
from .serializers import UserBookSerializer

logger = logging.getLogger(__name__)

class BookViewSet(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.DestroyModelMixin,
                  viewsets.GenericViewSet):

    queryset = UserBook.objects.all()
    serializer_class = UserBookSerializer
    permission_classes = [IsOwner]

    def create(self, request, *args, **kwargs):
        try:
            # Access the uploaded file
            file = request.FILES.get('file_path')
            if not file:
                logger.warning("No file uploaded")
                return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)
            # Extract number of pages from the PDF file
            reader = PdfReader(file)
            num_pages = len(reader.pages)
            if num_pages <= 0:
                logger.warning("No pages found in the uploaded PDF file")
                return Response({"error": "No pages found in the uploaded PDF file"}, status=status.HTTP_400_BAD_REQUEST)
            # Add number of pages to request data
            request.data['pages'] = num_pages
            logger.info(f"PDF file uploaded with {num_pages} pages")
            # Call the parent create method to save the book
            return super().create(request, *args, **kwargs)
        except Exception as e:
            logger.error(f"Error while creating book: {str(e)}", exc_info=True)
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['get'], url_path='by-profile/(?P<profile_id>[^/.]+)')
    def get_books_by_profile(self, request, profile_id, *args, **kwargs):
        try:
            profile = UserProfile.objects.get(pk=profile_id)
            self.check_object_permissions(request, profile)
            books = UserBook.objects.filter(profile__id=profile_id)
            serializer = UserBookSerializer(books, many=True)
            logger.info(f"Books retrieved for profile ID {profile_id}")
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            logger.warning(f"Profile not found for profile ID {profile_id}")
            return Response({"error": "Profile not found for the given profile ID"}, status=status.HTTP_404_NOT_FOUND)
        except PermissionDenied:
            logger.warning(f"Permission denied for profile ID {profile_id}")
            return Response({"error": "You do not have permission to access this profile"}, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            logger.error(f"Error while retrieving books for profile ID {profile_id}: {str(e)}", exc_info=True)
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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
