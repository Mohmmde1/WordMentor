import logging
from django.db import models
from wdapi.django_client import get_client_from_settings

logger = logging.getLogger(__name__)

class WordManager(models.Manager):
    def get_or_fetch(self, entry):
        from .models import Word  # Import inside the method to avoid circular import
        try:
            return self.get(entry=entry)
        except Word.DoesNotExist:
            api_client = get_client_from_settings()
            try:
                word_definition = api_client.get_word_definition(entry)
                word_difficulty = api_client.get_word_difficulty(entry)
            except Exception as e:
                logger.exception("Failed to fetch data for '%s' from the Twinword API due to an unexpected error: %s", entry, str(e))
                raise Word.DoesNotExist(f"Word with entry '{entry}' not found in database and Twinword API call failed unexpectedly")

            if word_definition and word_difficulty:
                if word_definition.result_code == "200":
                    try:
                        word = self.create( 
                            author=word_definition.author,
                            email=word_definition.email,
                            entry=entry,
                            ipa=word_definition.ipa,
                            meaning=word_definition.meaning,
                            request=word_definition.request,
                            response=word_definition.response,
                            result_code=word_definition.result_code,
                            result_msg=word_definition.result_msg,
                            version=word_definition.version,
                            ten_degree=word_difficulty.ten_degree
                        )
                        return word
                    except Exception as e:
                        logger.exception("Failed to create Word object for '%s' fetched from Twinword API due to an unexpected error: %s", entry, str(e))
                        raise Word.DoesNotExist(f"Failed to create Word object for '{entry}' fetched from Twinword API")
                else:
                    logger.error("Failed to fetch data for '%s' from the Twinword API. Result message is not 200.", entry)
                    raise Word.DoesNotExist(f"Word with entry '{entry}' not found in database and Twinword API response is invalid")
            else:
                logger.error("Failed to fetch data for '%s' from the Twinword API.", entry)
                raise Word.DoesNotExist(f"Word with entry '{entry}' not found in database and Twinword API response is incomplete")
