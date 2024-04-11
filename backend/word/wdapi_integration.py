import logging
from re import DEBUG

from wdapi.django_client import get_client_from_settings

logger = logging.getLogger(__name__)

def create_word_object(word_entry):
    """
    Fetch word details from Twinword API for a given word entry.
    Returns a dictionary containing the word details.
    """
    api_client = get_client_from_settings()

    word_definition = api_client.get_word_definition(word_entry)
    word_difficulty = api_client.get_word_difficulty(word_entry)

    if word_definition and word_difficulty:
        if word_definition.result_code == "200":
            word_data = {
                "author": word_definition.author,
                "email": word_definition.email,
                "entry": word_entry,
                "ipa": word_definition.ipa,
                "meaning": word_definition.meaning,
                "request": word_definition.request,
                "response": word_definition.response,
                "result_code": word_definition.result_code,
                "result_msg": word_definition.result_msg,
                "version": word_definition.version,
                "ten_degree": word_difficulty.ten_degree
            }

            return word_data
        else:
            logger.error("Failed to fetch data for '%s' from the Twinword API. Result message is not 200.", word_entry)
            return None
    else:
        logger.error("Failed to fetch data for '%s' from the Twinword API.", word_entry)
        return None
