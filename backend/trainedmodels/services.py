import os
import ssl
import nltk
import logging

from django.conf import settings

logger = logging.getLogger(__name__)


def download_nltk_resources(resources):
    ssl._create_default_https_context = ssl._create_unverified_context
    os.makedirs(settings.NLTK_DIR, exist_ok=True)
    nltk.data.path.append(settings.NLTK_DIR)


    for resource in resources:
        try:
            nltk.data.find(f"{resource}")
            logger.info(f"Resource has been downloaded: {resource}")
        except LookupError:
            nltk.download(resource, download_dir=settings.NLTK_DIR)
            logger.info(f"Resource have been successfully downloaded: {resource}")
        except:
            logger.debug(f"Failed to download: {resource}!")
        