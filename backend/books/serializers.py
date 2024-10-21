import logging

from rest_framework import serializers

from PyPDF2 import PdfReader

from core.services import get_profile

from .models import UserBook


logger = logging.getLogger(__name__)


class UserBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserBook
        fields = ['id', 'updated_at', 'created_at', 'file_path', 'pages', 'title']

    def create(self, validated_data):
        try:
            validated_data['profile_id'] = get_profile(self.context).id
            # Access the uploaded file
            file = validated_data.get('file_path')
            if not file:
                logger.error("No file uploaded")
                raise serializers.ValidationError("No file uploaded")

            # Extract number of pages from the PDF file
            reader = PdfReader(file)
            num_pages = len(reader.pages)
            if num_pages <= 0:
                logger.error("No pages found in the uploaded PDF file")
                raise serializers.ValidationError("No pages found in the uploaded PDF file")

            # Add number of pages to validated_data data
            validated_data['pages'] = num_pages
            logger.info(f"PDF file uploaded with {num_pages} pages")

            # Call the parent create method to save the book
            return super().create(validated_data)
        except Exception as e:
            logger.error(f"Error while creating book: {str(e)}", exc_info=True)
            raise serializers.ValidationError(str(e))
