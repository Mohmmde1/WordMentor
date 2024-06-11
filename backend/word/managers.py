import json
import logging
from django.db import models
from .wdapi_integration import create_word_objects  
from .models import Word

logger = logging.getLogger(__name__)

class WordMeaningManager(models.Manager):
    def get_or_fetch(self, word):
        # Determine if the input is a Word object or a string
        if isinstance(word, Word):
            word_text = word.word
        elif isinstance(word, str):
            word_text = word.lower()
        else:
            raise ValueError("Input must be a Word instance or a string")

        try:
            # Try to get the WordMeaning from the database
            return self.get(word__word=word_text)
        except self.model.DoesNotExist:
            # If the word is not found, fetch it from WordNet
            return self._fetch_from_wordnet_or_api(word_text)

    def _fetch_from_wordnet_or_api(self, word_text):
        from nltk.corpus import wordnet as wn
        synsets = wn.synsets(word_text)
        if synsets:
            synset = synsets[0]  # Take the first synset for simplicity
            definition = synset.definition()
            part_of_speech = synset.pos()
            examples = synset.examples()
            example_sentence = examples[0] if examples else ""
            return self._create_word_meaning(word_text, definition, part_of_speech, example_sentence)
        else:
            logger.warning("Word with entry '%s' not found in WordNet, trying external API", word_text)
            return self._fetch_from_external_api(word_text)

    def _fetch_from_external_api(self, word_text):
        try:
            word_objects = create_word_objects([word_text])
            if word_objects:
                word_data = word_objects[0]
                word_obj, _ = Word.objects.get_or_create(word=word_text)
                word_meaning_instance = self.create(
                    word=word_obj,
                    definition=self._extract_meaning(word_data.get("meaning")),
                    part_of_speech=word_data.get("part_of_speech", "") ,
                    example_sentence=word_data.get("example_sentence", ""),
                )
                return word_meaning_instance
            else:
                logger.error("External API call failed for word '%s'", word_text)
                raise self.model.DoesNotExist(f"Word with entry '{word_text}' not found in database and external API call failed")
        except Exception as e:
            logger.error("Failed to fetch from external API and create WordMeaning object for '%s': %s", word_text, str(e))
            raise self.model.DoesNotExist(f"Failed to create WordMeaning object for '{word_text}'")
    
    def _extract_meaning(self, meaning_str):
        """Extracts and combines meanings from the JSON response."""
        try:
            if not meaning_str:
                return ""  # Return empty string if meaning_str is empty
            
            if isinstance(meaning_str, dict):
                meaning_dict = meaning_str
            else:
                # Convert the string to a dictionary with strict=False to handle non-standard JSON
                meaning_dict = json.loads(meaning_str.replace("'", "\""), strict=False)
            
            # Extract definitions for each part of speech
            meanings = [meaning for pos, meaning in meaning_dict.items() if meaning]
            
            # Combine the meanings into a single string
            return "\n".join(meanings)
        except (json.JSONDecodeError, AttributeError) as e:
            logger.error("Failed to decode meaning string: %s", str(e))
            return ""


    def _create_word_meaning(self, word_text, definition, part_of_speech, example_sentence):
        try:
            word_obj, _ = Word.objects.get_or_create(word=word_text)
            word_meaning_instance = self.create(
                word=word_obj,
                definition=definition,
                part_of_speech=part_of_speech,
                example_sentence=example_sentence,
            )
            return word_meaning_instance
        except Exception as e:
            logger.error("Failed to create WordMeaning object for '%s': %s", word_text, str(e))
            raise self.model.DoesNotExist(f"Failed to create WordMeaning object for '{word_text}'")
