import os
import time

import nltk
import pandas as pd
import torch
from django.conf import settings
from django.core.management.base import BaseCommand
from nltk.corpus import stopwords, words
from nltk.tokenize import word_tokenize
from PyPDF2 import PdfReader
from transformers import BertForSequenceClassification, BertTokenizer


class Command(BaseCommand):
    help = 'Process a PDF book and classify words using a BERT model'

    def add_arguments(self, parser):
        parser.add_argument('--model-path', type=str, required=True, help='Path to the fine-tuned BERT model')
        parser.add_argument('--book-path', type=str, required=True, help='Path to the PDF book')
        parser.add_argument('--from-page', type=int, required=True, help='Starting page number')
        parser.add_argument('--to-page', type=int, required=True, help='Ending page number')

    def handle(self, *args, **options):
        fine_tuned_models_path = settings.BASE_DIR / "data/fine_tuned_models/test"
        model_path = os.path.join(fine_tuned_models_path, options['model_path'])
        book_path = options['book_path']
        from_page = options['from_page']
        to_page = options['to_page']

        nltk_data_path = os.path.join(settings.BASE_DIR, 'data', 'nltk_data')
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

        start_time = time.time()
        try:
            tokenizer_cache = os.path.join(settings.BASE_DIR, 'data', 'cache_dir', 'tokenizer')
            tokenizer = BertTokenizer.from_pretrained('bert-base-uncased', cache_dir=tokenizer_cache)
            model = BertForSequenceClassification.from_pretrained(model_path)
            model.eval()

            extracted_text = extract_text_from_pdf(book_path, from_page, to_page)
            tokens = extract_important_words(extracted_text)

            inputs = tokenizer(list(tokens), return_tensors="pt", padding=True, truncation=True)

            with torch.no_grad():
                outputs = model(**inputs)

            probs = torch.softmax(outputs.logits, dim=-1)
            predicted_labels = torch.argmax(probs, dim=-1).tolist()

            class_names = ['Not_Known', 'Known']
            predicted_classes = [class_names[label] for label in predicted_labels]

            unknown_words = [word for word, predicted_class in zip(tokens, predicted_classes) if predicted_class == 'Not_Known']

            # Save predictions and metadata to a CSV file
            results = {
                'word': list(tokens),
                'predicted_class': predicted_classes,
                'probability_known': probs[:, 1].tolist(),
                'probability_not_known': probs[:, 0].tolist()
            }
            df = pd.DataFrame(results)
            csv_output_path = os.path.join(settings.BASE_DIR, 'data', 'results', options['model_path'], 'predictions.csv')
            os.makedirs(os.path.dirname(csv_output_path), exist_ok=True)
            df.to_csv(csv_output_path, index=False)

            self.stdout.write(f"Unknown words: {unknown_words}")
            self.stdout.write(f"Predictions saved to {csv_output_path}")
            self.stdout.write(f"--- {time.time() - start_time} seconds ---")
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"An error occurred: {str(e)}"))
