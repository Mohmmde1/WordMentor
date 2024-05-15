from celery import shared_task

from transformers import BertTokenizer, BertForSequenceClassification
from torch.utils.data import DataLoader, TensorDataset
from torch.optim import AdamW
import torch
import os
from django.conf import settings

cache_dir = os.path.join(settings.BASE_DIR, 'cache_dir')
tokenizer_cache = os.path.join(cache_dir, 'tokenizer')
model_cache = os.path.join(cache_dir, 'model')

@shared_task
def fine_tune_bert(labeled_data, path, epochs=3, batch_size=8, learning_rate=1e-5):
    # Specify the directory where the pre-trained models will be cached

    # Load pre-trained BERT tokenizer
    tokenizer = BertTokenizer.from_pretrained(
        'bert-base-uncased', cache_dir=tokenizer_cache)

    # Load pre-trained BERT model for sequence classification
    model = BertForSequenceClassification.from_pretrained(
        'bert-base-uncased', cache_dir=model_cache)

    # Tokenize your data
    tokenized_texts = tokenizer(
        list(labeled_data.keys()), return_tensors="pt", padding=True, truncation=True)

    # Prepare labels
    labels = torch.tensor(list(labeled_data.values()))

    # Create TensorDataset
    dataset = TensorDataset(
        tokenized_texts['input_ids'], tokenized_texts['attention_mask'], labels)

    # Create DataLoader
    dataloader = DataLoader(dataset, batch_size=batch_size, shuffle=True)

    # Define optimizer
    optimizer = AdamW(model.parameters(), lr=learning_rate)

    # Fine-tuning loop
    for epoch in range(epochs):
        total_loss = 0.0
        model.train()
        for batch in dataloader:
            input_ids, attention_mask, batch_labels = batch

            optimizer.zero_grad()
            outputs = model(input_ids=input_ids,
                            attention_mask=attention_mask, labels=batch_labels)
            loss = outputs.loss
            loss.backward()
            optimizer.step()

            total_loss += loss.item()

        print(f"Epoch {epoch + 1}, Loss: {total_loss}")

    fine_tuned_model_path = os.path.join(
        settings.BASE_DIR, "fine_tuned_models", path)
    # Save the fine-tuned model
    model.save_pretrained(fine_tuned_model_path)

