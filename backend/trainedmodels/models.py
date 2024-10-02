import logging
import os
import shutil

from django.conf import settings
from django.db import models

from books.models import UserBook
from core.models import BaseModel
from progress_tracking.models import UserWordProgress
from settings.models import UserProfile

# Configure logging
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

class UserTrainedModel(BaseModel):
    name = models.CharField(max_length=255)
    description = models.TextField()
    file_path = models.CharField(max_length=255)
    is_ready = models.BooleanField(default=False)
    version = models.CharField(max_length=50)
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    def get_user_model_full_path(self):
        if self.file_path:
            return os.path.join(
            settings.BASE_DIR, "media", "fine_tuned_models", self.file_path
        )
        return ""
    
    def delete_user_model(self):
        """delete method to remove the folder from the filesystem."""
        if self.file_path:
            folder_full_path = self.get_user_model_full_path()

            # Check if the path is a directory
            if os.path.exists(folder_full_path) and os.path.isdir(folder_full_path):
                try:
                    # Remove the entire directory and its contents
                    shutil.rmtree(folder_full_path)
                    logger.info(f"Deleted folder: {folder_full_path}")
                except Exception as e:
                    logger.error(f"Error while deleting folder: {e}")
            elif os.path.exists(folder_full_path):
                # If it's a file, delete the file
                os.remove(folder_full_path)
                logger.info(f"Deleted file: {folder_full_path}")


    def store_user_model(self):
        # Save the fine-tuned model
        os.makedirs(os.path.dirname(self.get_user_model_full_path()), exist_ok=True)



class BookPrediction(BaseModel):
    from_page = models.IntegerField()
    to_page = models.IntegerField()
    trained_model_version = models.CharField(max_length=50)
    book = models.ForeignKey(UserBook, on_delete=models.CASCADE)

    def __str__(self):
        return f"Prediction {self.id}"


class WordPredictionMapping(BaseModel):
    word_progress = models.ForeignKey(UserWordProgress, on_delete=models.CASCADE)
    prediction = models.ForeignKey(BookPrediction, on_delete=models.CASCADE)

    def __str__(self):
        return f"WordPrediction {self.id}"