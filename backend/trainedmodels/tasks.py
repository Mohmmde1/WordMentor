import logging
import os

import torch
from django.conf import settings
from torch.optim import AdamW
from torch.utils.data import DataLoader, TensorDataset
from transformers import BertForSequenceClassification, BertTokenizer

# Configure logging
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)


def fine_tune_bert(
    labeled_data, user_trained_model, epochs=3, batch_size=8, learning_rate=1e-5
):
    """
    Fine-tunes a BERT model for sequence classification on the provided labeled data.

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
        tokenizer = BertTokenizer.from_pretrained(
            "bert-base-uncased", cache_dir=settings.TOKENIZER_DIR
        )

        # Load pre-trained BERT model for sequence classification
        logger.info("Loading pre-trained BERT model for sequence classification...")
        model = BertForSequenceClassification.from_pretrained(
            "bert-base-uncased", cache_dir=settings.MODEL_DIR
        )

        # Tokenize input texts
        logger.info("Tokenizing input texts...")
        tokenized_texts = tokenizer(
            list(labeled_data.keys()),
            return_tensors="pt",
            padding=True,
            truncation=True,
        )

        # Prepare labels
        labels = torch.tensor(list(labeled_data.values()))

        # Create TensorDataset
        logger.info("Creating TensorDataset...")
        dataset = TensorDataset(
            tokenized_texts["input_ids"], tokenized_texts["attention_mask"], labels
        )

        # Create DataLoader
        logger.info("Creating DataLoader...")
        dataloader = DataLoader(dataset, batch_size=batch_size, shuffle=True)

        # Define optimizer
        optimizer = AdamW(model.parameters(), lr=learning_rate)

        # Training loop
        logger.info("Starting fine-tuning...")
        for epoch in range(epochs):
            total_loss = 0.0
            model.train()
            for batch in dataloader:
                input_ids, attention_mask, batch_labels = batch
                optimizer.zero_grad()
                outputs = model(
                    input_ids=input_ids,
                    attention_mask=attention_mask,
                    labels=batch_labels,
                )
                loss = outputs.loss
                loss.backward()
                optimizer.step()
                total_loss += loss.item()
            logger.info(f"Epoch {epoch + 1}/{epochs}, Loss: {total_loss:.4f}")

        # Save the fine-tuned model
        full_path = user_trained_model.get_user_model_full_path()
        user_trained_model.store_user_model()
        model.save_pretrained(full_path)
        user_trained_model.is_ready = True
        user_trained_model.save()
        logger.info(f"Model fine-tuned and saved at {full_path}")

    except Exception as e:
        logger.error(f"An error occurred during fine-tuning: {str(e)}")
        raise


def check_status(path):
    """
    Check if a fine-tuned model exists at the specified path.

    Args:
        path (str): Path to the fine-tuned model.

    Returns:
        bool: True if the model exists, False otherwise.
    """
    fine_tuned_model_path = os.path.join(
        settings.BASE_DIR, "data", "fine_tuned_models", path
    )
    return os.path.exists(fine_tuned_model_path)
