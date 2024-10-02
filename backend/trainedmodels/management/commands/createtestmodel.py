import argparse
import logging
import os
import time

import pandas as pd
import torch
from django.conf import settings
from django.core.management.base import BaseCommand
from sklearn.metrics import accuracy_score
from torch.optim import AdamW
from torch.utils.data import DataLoader, TensorDataset
from tqdm import tqdm
from transformers import BertForSequenceClassification, BertTokenizer

# Configure logging
logger = logging.getLogger(__name__)

# Set cache directories
cache_dir = os.path.join(settings.BASE_DIR, 'data', 'cache_dir')
tokenizer_cache = os.path.join(cache_dir, 'tokenizer')
model_cache = os.path.join(cache_dir, 'model')
test_data = os.path.join(settings.BASE_DIR, 'data', 'test' )

def fine_tune_bert(labeled_data, path, epochs=3, batch_size=8, learning_rate=1e-5):
    """
    Fine-tunes a BERT model for sequence classification on the provided labeled data.
    Logs various metrics to a CSV file for further analysis.

    Args:
        labeled_data (dict): A dictionary with text data as keys and labels as values.
        path (str): Path to save the fine-tuned model.
        epochs (int, optional): Number of training epochs. Default is 3.
        batch_size (int, optional): Size of the training batches. Default is 8.
        learning_rate (float, optional): Learning rate for the optimizer. Default is 1e-5.
    """
    try:
        # Load pre-trained BERT tokenizer
        logger.info("Loading pre-trained BERT tokenizer...")
        tokenizer = BertTokenizer.from_pretrained('bert-base-uncased', cache_dir=tokenizer_cache)

        # Load pre-trained BERT model for sequence classification
        logger.info("Loading pre-trained BERT model for sequence classification...")
        model = BertForSequenceClassification.from_pretrained('bert-base-uncased', cache_dir=model_cache)

        # Tokenize input texts
        logger.info("Tokenizing input texts...")
        tokenized_texts = tokenizer(list(labeled_data.keys()), return_tensors="pt", padding=True, truncation=True)

        # Prepare labels
        labels = torch.tensor(list(labeled_data.values()))

        # Create TensorDataset
        logger.info("Creating TensorDataset...")
        dataset = TensorDataset(tokenized_texts['input_ids'], tokenized_texts['attention_mask'], labels)

        # Create DataLoader
        logger.info("Creating DataLoader...")
        dataloader = DataLoader(dataset, batch_size=batch_size, shuffle=True)

        # Define optimizer
        optimizer = AdamW(model.parameters(), lr=learning_rate)

        # Initialize metrics tracking
        metrics = {
            'epoch': [],
            'loss': [],
            'accuracy': [],
            'time': []
        }

        # Training loop
        logger.info("Starting fine-tuning...")
        for epoch in range(epochs):
            epoch_start_time = time.time()
            total_loss = 0.0
            all_preds = []
            all_labels = []
            model.train()

            # Use tqdm for progress bar
            tqdm_dataloader = tqdm(dataloader, desc=f"Epoch {epoch + 1}/{epochs}", unit="batch")

            for batch in tqdm_dataloader:
                input_ids, attention_mask, batch_labels = batch
                optimizer.zero_grad()
                outputs = model(input_ids=input_ids, attention_mask=attention_mask, labels=batch_labels)
                loss = outputs.loss
                loss.backward()
                optimizer.step()
                total_loss += loss.item()

                # Collect predictions for accuracy calculation
                preds = torch.argmax(outputs.logits, dim=1).tolist()
                all_preds.extend(preds)
                all_labels.extend(batch_labels.tolist())

                # Update tqdm progress bar
                tqdm_dataloader.set_postfix({'loss': total_loss / len(tqdm_dataloader)})

            epoch_end_time = time.time()
            epoch_time = epoch_end_time - epoch_start_time
            epoch_accuracy = accuracy_score(all_labels, all_preds)
            
            # Log metrics
            metrics['epoch'].append(epoch + 1)
            metrics['loss'].append(total_loss)
            metrics['accuracy'].append(epoch_accuracy)
            metrics['time'].append(epoch_time)
            
            logger.info(f"Epoch {epoch + 1}/{epochs}, Loss: {total_loss:.4f}, Accuracy: {epoch_accuracy:.4f}, Time: {epoch_time:.2f} seconds")

        # Save the fine-tuned model
        fine_tuned_model_path = os.path.join(settings.BASE_DIR, "data", "fine_tuned_models", "test", path)
        os.makedirs(os.path.dirname(fine_tuned_model_path), exist_ok=True)
        model.save_pretrained(fine_tuned_model_path)

        # Save metrics to CSV file
        metrics_df = pd.DataFrame(metrics)
        metrics_csv_path = os.path.join(settings.BASE_DIR, 'data', 'results', path, 'training_metrics.csv')
        os.makedirs(os.path.dirname(metrics_csv_path), exist_ok=True)
        metrics_df.to_csv(metrics_csv_path, index=False)
        
        logger.info(f"Model fine-tuned and saved at {fine_tuned_model_path}")
        logger.info(f"Training metrics saved at {metrics_csv_path}")

    except Exception as e:
        logger.error(f"An error occurred during fine-tuning: {str(e)}")
        raise

class Command(BaseCommand):
    help = 'Train models using BERT and labeled data from CSV'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='Path to CSV file containing labeled data')
        parser.add_argument('filename', type=str, help="Output's file name")
        parser.add_argument('--epochs', type=int, default=3, help='Number of training epochs (default: 3)')
        
    def handle(self, *args, **kwargs):
        try:
            # Parse command line arguments
            csv_file = kwargs['csv_file']
            epochs = kwargs['epochs']
            filename = kwargs['filename']
            csv_file = os.path.join(test_data, csv_file)
            # Validate file path
            if not os.path.isfile(csv_file):
                raise FileNotFoundError(f"File '{csv_file}' not found!")

            # Read data from CSV into a DataFrame
            df = pd.read_csv(csv_file)

            # Convert 'known' column to binary (0 or 1)
            df['known'] = df['known'].apply(lambda x: 1 if x == 'known' else 0)

            # Convert DataFrame to dictionary
            labeled_data = dict(zip(df['word'], df['known']))
            
            fine_tune_bert(labeled_data, filename, epochs=epochs)

            self.stdout.write(self.style.SUCCESS("BERT model fine-tuned successfully!"))

        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error during fine-tuning: {str(e)}"))
