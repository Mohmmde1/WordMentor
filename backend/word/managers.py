import logging
from django.db import models
from .wdapi_integration import create_word_objects  
from .models import Word

logger = logging.getLogger(__name__)

# class WordManager(models.Manager):
#     def get_or_fetch(self, entry):
        
#         try:
#             # Try to get the word from the database
#             entry = entry.lower()
#             return self.get(entry=entry)
#         except self.model.DoesNotExist:
#             # If the word is not found, fetch it from the Twinword API
#             word_objects = create_word_objects([entry])
#             if word_objects:
#                 word_data = word_objects[0]
#                 try:
#                     word = self.create(
#                         author=word_data["author"],
#                         email=word_data["email"],
#                         entry=word_data["entry"],
#                         ipa=word_data["ipa"],
#                         meaning=word_data["meaning"],
#                         request=word_data["request"],
#                         response=word_data["response"],
#                         result_code=word_data["result_code"],
#                         result_msg=word_data["result_msg"],
#                         version=word_data["version"],
#                         ten_degree=word_data["ten_degree"]
#                     )
#                     return word
#                 except Exception as e:
#                     logger.error("Failed to create Word object for '%s': %s", entry, str(e))
#                     raise self.model.DoesNotExist(f"Failed to create Word object for '{entry}'")
#             else:
#                 logger.error("Word with entry '%s' not found in database and Twinword API call failed", entry)
#                 raise self.model.DoesNotExist(f"Word with entry '{entry}' not found in database and Twinword API call failed")

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
            return self._fetch_from_wordnet(word_text)

    def _fetch_from_wordnet(self, word_text):
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
            logger.error("Word with entry '%s' not found in WordNet", word_text)
            raise self.model.DoesNotExist(f"Word with entry '{word_text}' not found in WordNet")

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