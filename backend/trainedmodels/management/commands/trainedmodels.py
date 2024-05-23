import os
import time
import nltk
import torch
from PyPDF2 import PdfReader
from transformers import BertTokenizer, BertForSequenceClassification
from django.core.management.base import BaseCommand
from django.conf import settings
from nltk.corpus import stopwords, words
from nltk.tokenize import word_tokenize

class Command(BaseCommand):
    help = 'Train models using BERT and PDF data'

    def handle(self, *args, **kwargs):
        nltk_data_path = os.path.join(settings.BASE_DIR, 'nltk_data')
        os.makedirs(nltk_data_path, exist_ok=True)
        nltk.data.path.append(nltk_data_path)

        # Download the required nltk corpora if not already present
        nltk.download('stopwords', download_dir=nltk_data_path)
        nltk.download('punkt', download_dir=nltk_data_path)
        nltk.download('words', download_dir=nltk_data_path)

        # List of valid English words
        valid_words = set(words.words())

        def extract_important_words(text):
            words = word_tokenize(text)
            filtered_words = [
                word.lower() for word in words
                if word.lower() not in stopwords.words('english') and word.isalpha() and len(word) > 1 and word.lower() in valid_words
            ]
            return set(filtered_words)

        def extract_text_from_pdf(pdf_path, from_page, to_page):
            with open(pdf_path, 'rb') as file:
                reader = PdfReader(file)
                text = ""
                for page_num in range(from_page - 1, to_page):
                    page = reader.pages[page_num]
                    text += page.extract_text()
            return text

        pdf_path = '/Users/mohammedalnashrei/projects/WordMentor/backend/media/books/bookC34dayang.pdf'
        from_page = 1
        to_page = 5
        start_time = time.time()
        try:
            tokenizer = BertTokenizer.from_pretrained('bert-base-uncased', cache_dir='/Users/mohammedalnashrei/projects/WordMentor/backend/cache_dir/tokenizer')
            model = BertForSequenceClassification.from_pretrained("/Users/mohammedalnashrei/projects/WordMentor/backend/fine_tuned_models/mohammed_model")
            model.eval()

            extracted_text = extract_text_from_pdf(pdf_path, from_page, to_page)
            tokens = extract_important_words(extracted_text)

            inputs = tokenizer(list(tokens), return_tensors="pt", padding=True, truncation=True)

            with torch.no_grad():
                outputs = model(**inputs)

            probs = torch.softmax(outputs.logits, dim=-1)
            predicted_labels = torch.argmax(probs, dim=-1).tolist()

            class_names = ['Not_Known', 'Known']
            predicted_classes = [class_names[label] for label in predicted_labels]

            unknown_words = [word for word, predicted_class in zip(tokens, predicted_classes) if predicted_class == 'Not_Known']

            self.stdout.write(f"Unknown words: {unknown_words}")
            self.stdout.write(f"--- {time.time() - start_time} seconds ---")
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"An error occurred: {str(e)}"))
