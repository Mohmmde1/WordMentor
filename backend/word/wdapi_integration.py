import logging
from re import DEBUG

from wdapi.django_client import get_client_from_settings

logger = logging.getLogger(__name__)


def create_word_objects(word_entries):
    """
    Fetch word details from Twinword API for a list of word entries.
    Returns a list of dictionaries containing the word details for each entry.
    """
    api_client = get_client_from_settings()
    word_objects = []

    for word_entry in word_entries:
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
                    "ten_degree": word_difficulty.ten_degree,
                }
                word_objects.append(word_data)
            else:
                word_data = {
                    "author": word_definition.author,
                    "email": word_definition.email,
                    "entry": word_entry,
                    "ipa": "",
                    "meaning": "",
                    "request": "",
                    "response": "",
                    "result_code": word_definition.result_code,
                    "result_msg": word_definition.result_msg,
                    "version": word_definition.version,
                    "ten_degree": "0",
                }
                word_objects.append(word_data)
                logger.error(
                    "Failed to fetch data for '%s' from the Twinword API. Result message is not 200.",
                    word_entry,
                )
        else:
            logger.error(
                "Failed to fetch data for '%s' from the Twinword API.", word_entry
            )

    return word_objects
