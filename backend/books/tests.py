import re
from io import BytesIO
from unittest.mock import MagicMock, patch

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.exceptions import PermissionDenied, ValidationError
from rest_framework.test import APIClient

from books.models import UserBook
from books.serializers import UserBookSerializer
from settings.models import UserProfile
from wordmentor_auth.models import User


class BookViewSetTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username="testuser", email="testuser@example.com", password="testpass"
        )
        self.user_profile = UserProfile.objects.create(user=self.user)
        self.client.force_authenticate(user=self.user)

    @patch("books.views.PdfReader")
    def test_create_book_success(self, MockPdfReader):
        mock_pdf = MagicMock()
        mock_pdf.pages = [1, 2, 3]
        MockPdfReader.return_value = mock_pdf

        file = BytesIO(b"%PDF-1.4")
        file.name = "test.pdf"
        data = {"file_path": file, "profile": self.user_profile.id, "title": file.name}
        response = self.client.post(reverse("books-list"), data, format="multipart")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(UserBook.objects.filter(profile=self.user_profile).exists())
        self.assertEqual(UserBook.objects.get(profile=self.user_profile).pages, 3)

    def test_create_book_no_file_uploaded(self):
        response = self.client.post(reverse("books-list"), {}, format="multipart")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {"error": "No file uploaded"})

    @patch("books.views.PdfReader")
    def test_create_book_invalid_pdf(self, MockPdfReader):
        MockPdfReader.side_effect = Exception("Invalid PDF file")
        file = BytesIO(b"%PDF-1.4")
        file.name = "test.pdf"
        data = {"file_path": file, "profile": self.user_profile.id, "title": file.name}
        response = self.client.post(reverse("books-list"), data, format="multipart")

        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(response.data, {"error": "Invalid PDF file"})

    def test_get_books_by_profile_success(self):
        mock_file = SimpleUploadedFile("test.pdf", b"%PDF-1.4")
        book = UserBook.objects.create(
            profile=self.user_profile, pages=10, title="test.pdf", file_path=mock_file
        )

        response = self.client.get(
            reverse("books-get-books-by-profile", args=[self.user_profile.id])
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["id"], book.id)

    def test_get_books_by_profile_not_found(self):
        response = self.client.get(reverse("books-get-books-by-profile", args=[999]))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(
            response.data, {"error": "Profile not found for the given profile ID"}
        )

    @patch("books.views.UserProfile.objects.get")
    @patch("books.views.UserBook.objects.filter")
    def test_get_books_by_profile_permission_denied(self, mock_filter, mock_get):
        mock_get.side_effect = PermissionDenied

        response = self.client.get(
            reverse("books-get-books-by-profile", args=[self.user_profile.id])
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(
            response.data,
            {"error": "You do not have permission to access this profile"},
        )


class UserBookModelTest(TestCase):

    def setUp(self):
        # Create a user and user profile
        self.user = User.objects.create_user(
            username="testuser", email="testuser@example.com", password="testpass"
        )
        self.user_profile = UserProfile.objects.create(user=self.user)

        # Create a mock file using SimpleUploadedFile
        self.mock_file = SimpleUploadedFile("test.pdf", b"%PDF-1.4")

    def test_user_book_creation(self):
        # Create a UserBook instance
        user_book = UserBook.objects.create(
            file_path=self.mock_file,
            pages=10,
            title="Test Book",
            profile=self.user_profile,
        )

        # Check that the UserBook instance was created successfully
        # Use regex to match the file path to handle unique suffix
        self.assertTrue(re.match(r"books/test.*\.pdf", user_book.file_path.name))
        self.assertEqual(user_book.pages, 10)
        self.assertEqual(user_book.title, "Test Book")
        self.assertEqual(user_book.profile, self.user_profile)

    def test_user_book_str_representation(self):
        # Create a UserBook instance
        user_book = UserBook.objects.create(
            file_path=self.mock_file,
            pages=10,
            title="Test Book",
            profile=self.user_profile,
        )

        # Check the string representation of the UserBook instance
        self.assertEqual(str(user_book), "Test Book")


class UserBookSerializerTestCase(TestCase):

    def setUp(self):
        # Create a user and user profile
        self.user = User.objects.create_user(
            username="testuser", email="testuser@example.com", password="testpass"
        )
        self.user_profile = UserProfile.objects.create(user=self.user)

        # Create a mock file using SimpleUploadedFile
        self.mock_file = SimpleUploadedFile("test.pdf", b"%PDF-1.4")

        # Create a UserBook instance
        self.user_book = UserBook.objects.create(
            file_path=self.mock_file,
            pages=10,
            title="Test Book",
            profile=self.user_profile,
        )

        # Serializer data
        self.serializer_data = {
            "file_path": self.mock_file,
            "pages": 10,
            "title": "Test Book",
            "profile": self.user_profile.id,
        }

    def test_contains_expected_fields(self):
        serializer = UserBookSerializer(instance=self.user_book)
        data = serializer.data
        self.assertCountEqual(
            data.keys(),
            [
                "id",
                "created_at",
                "updated_at",
                "file_path",
                "pages",
                "title",
                "profile",
            ],
        )

    def test_serialization(self):
        serializer = UserBookSerializer(instance=self.user_book)

        # Check if 'file_path' is in the serialized data
        self.assertIn("file_path", serializer.data)
        # Use regex to match the file path pattern
        self.assertTrue(
            re.match(r"/media/books/test.*\.pdf", serializer.data["file_path"]),
            f"file_path is {serializer.data['file_path']}",
        )

        self.assertEqual(serializer.data["pages"], 10)
        self.assertEqual(serializer.data["title"], "Test Book")
        self.assertEqual(serializer.data["profile"], self.user_profile.id)

    def test_deserialization(self):
        serializer = UserBookSerializer(data=self.serializer_data)
        self.assertTrue(serializer.is_valid())
        user_book = serializer.save()
        self.assertTrue(
            re.match(
                r"books/test.*\.pdf",
                user_book.file_path.name,
            )
        )
        self.assertEqual(user_book.pages, 10)
        self.assertEqual(user_book.title, "Test Book")
        self.assertEqual(user_book.profile, self.user_profile)

    def test_invalid_data(self):
        invalid_data = {
            "file_path": None,  # file_path is required
            "pages": -1,
            "title": "",  # invalid title value
            "profile": None,  # profile is required
        }
        serializer = UserBookSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertEqual(
            set(serializer.errors.keys()), {"file_path", "title", "profile"}
        )

    def test_update(self):
        updated_data = {
            "file_path": self.mock_file,
            "pages": 20,
            "title": "Updated Test Book",
            "profile": self.user_profile.id,
        }
        serializer = UserBookSerializer(instance=self.user_book, data=updated_data)
        self.assertTrue(serializer.is_valid())
        updated_book = serializer.save()
        self.assertTrue(re.match(r"books/test.*\.pdf", updated_book.file_path.name))
        self.assertEqual(updated_book.pages, 20)
        self.assertEqual(updated_book.title, "Updated Test Book")
        self.assertEqual(updated_book.profile, self.user_profile)
