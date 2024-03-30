from django.db import models
from softdelete.models import SoftDeleteModel

class BaseModel(SoftDeleteModel):
    """
    Abstract base model that includes common attributes
    such as created_at, updated_at, and deleted_at.
    """
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
