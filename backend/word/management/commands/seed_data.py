from django.core.management.base import BaseCommand
from word.models import Word
from word.wdapi_integration import create_word_objects
from django.conf import settings

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Fetch data from Firestore collection
def fetch_data_from_firestore():
    path = settings.FIREBASE_PATH
    cred = credentials.Certificate(path)

    firebase_admin.initialize_app(cred)

    db = firestore.client()
    words = []
    try:
        print("Fetching entries from firebase...")
        collection_ref = db.collection('words')
        docs = collection_ref.get()
        for doc in docs:
            # Extract fields from document
            data = doc.to_dict()
            entry = data.get("entry", "")
            ipa = data.get("ipa", "")
            meaning = data.get("meaning", {})
            noun = meaning.get("noun", "")
            verb = meaning.get("verb", "")
            tenDegree = data.get("tenDegree", "")
            words.append(entry)
        print("Finished fetching data from firebase!")
        return words

    except Exception as e:
        print(f'Error fetching data: {e}')

class Command(BaseCommand):
    help = 'Seeds the database with initial data'

    def handle(self, *args, **kwargs):
        word_entries = fetch_data_from_firestore()
        word_objects = create_word_objects(word_entries)

        if word_objects:
            bulk_objects = [
                Word(**word_object) for word_object in word_objects
            ]
            Word.objects.bulk_create(bulk_objects, ignore_conflicts=True)

            self.stdout.write(self.style.SUCCESS('Successfully seeded data for all entries'))
        else:
            self.stdout.write(self.style.WARNING('Failed to seed data'))
