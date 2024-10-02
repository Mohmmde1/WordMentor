import csv
import logging

from django.conf import settings
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from assessment.models import WordAssessment
from word.models import Word

logger = logging.getLogger(__name__)

class Command(BaseCommand):
    help = "Seeds the word assessment table"

    def handle(self, *args, **options):
        file_path = settings.BASE_DIR / 'data/assessment_words.csv'
        words_to_create = []
        assessments_to_create = []
        existing_words = set(Word.objects.values_list('word', flat=True))
        
        try:
            with open(file_path, newline='') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    word_text = row['word']
                    difficulty_level = row['difficulty_level']
                    
                    if word_text not in existing_words:
                        word = Word(word=word_text)
                        words_to_create.append(word)
                        existing_words.add(word_text)
                    else:
                        word = Word.objects.get(word=word_text)
                    
                    assessment = WordAssessment(word=word, difficulty_level=difficulty_level)
                    assessments_to_create.append(assessment)

            with transaction.atomic():
                Word.objects.bulk_create(words_to_create)
                WordAssessment.objects.bulk_create(assessments_to_create)

            self.stdout.write(self.style.SUCCESS('Successfully seeded word assessment table'))
        except Exception as e:
            logger.error(f"Error seeding word assessment table: {e}")
            raise CommandError(f"Error seeding word assessment table: {e}")
