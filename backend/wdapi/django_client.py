from django.conf import settings

from wdapi.client import WdApiClient


def get_client_from_settings():
    """Create an instance of an WdApiClient using the X_RAPID_API_KEY from the Django settings."""
    return WdApiClient(settings.X_RAPID_API_KEY)
