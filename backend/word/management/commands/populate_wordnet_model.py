import logging

from django.core.management.base import BaseCommand
from django.db import transaction

from nltk.corpus import wordnet as wn

from word.models import Word, WordNet


logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = 'Populates the WordNet model with data from WordNet'

    def handle(self, *args, **options):
        # Iterate over each Word instance
        for word_instance in Word.objects.all():
            word = word_instance.entry
            # Check if a WordNet entry already exists for the word
            if not WordNet.objects.filter(word=word).exists():
                # If not, fetch data from WordNet
                synsets = wn.synsets(word)
                if synsets:
                    synset = synsets[0]  # Take the first synset for simplicity
                    definition = synset.definition()
                    logger.info(f'definition of {word} is {definition}')
                    part_of_speech = synset.pos()
                    examples = synset.examples()
                    example = examples[0] if examples else ""  # Handle empty examples list

                    # Create WordNet instance within an atomic transaction
                    with transaction.atomic():
                        # Create a new WordNet entry
                        WordNet.objects.create(
                            word=word,
                            definition=definition,
                            part_of_speech=part_of_speech,
                            example_sentence=example,
                        )

                    self.stdout.write(self.style.SUCCESS(f"Created WordNet entry for '{word}'"))
                else:
                    self.stdout.write(self.style.WARNING(f"No WordNet synsets found for '{word}'"))
            else:
                self.stdout.write(self.style.WARNING(f"WordNet entry already exists for '{word}'"))
