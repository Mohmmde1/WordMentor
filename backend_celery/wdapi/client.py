import logging
import requests

from .models import WdDefinition, WdDifficulty



logger = logging.getLogger(__name__)

WD_API_URL = "https://twinword-word-graph-dictionary.p.rapidapi.com/"

class WdApiClient:
    def __init__(self, api_key):
        self.api_key = api_key

    def get_word_definition(self, word):
        endpoint = f"{WD_API_URL}definition/"
        headers = {
            "X-RapidAPI-Key": self.api_key,
        }
        params = {
            "entry": word
        }

        try:
            response = requests.get(endpoint, headers=headers, params=params)
            response.raise_for_status()
            data = response.json()
            return WdDefinition(data)
        except requests.exceptions.RequestException as e:
            logger.error(f"Error fetching word definition for {word}: {e}")
            return None

    def get_word_difficulty(self, word):
        endpoint = f"{WD_API_URL}difficulty/"
        headers = {
            "X-RapidAPI-Key": self.api_key,
        }
        params = {
            "entry": word
        }

        try:
            response = requests.get(endpoint, headers=headers, params=params)
            response.raise_for_status()
            data = response.json()
            return WdDifficulty(data)
        except requests.exceptions.RequestException as e:
            logger.error(f"Error fetching word difficulty for {word}: {e}")
            return None
