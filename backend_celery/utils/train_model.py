# Import the function
# from settings.models import Profile
from transformers import BertTokenizer, BertForSequenceClassification, AdamW
from torch.utils.data import DataLoader, TensorDataset
import torch

def fine_tune_bert(labeled_data, path, epochs=3, batch_size=8, learning_rate=1e-5):
    # Load pre-trained BERT tokenizer
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

    # Load pre-trained BERT model for sequence classification
    model = BertForSequenceClassification.from_pretrained('bert-base-uncased')

    # Tokenize your data
    tokenized_texts = tokenizer(list(labeled_data.keys()), return_tensors="pt", padding=True, truncation=True)

    # Prepare labels
    labels = torch.tensor(list(labeled_data.values()))

    # Create TensorDataset
    dataset = TensorDataset(tokenized_texts['input_ids'], tokenized_texts['attention_mask'], labels)

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
            outputs = model(input_ids=input_ids, attention_mask=attention_mask, labels=batch_labels)
            loss = outputs.loss
            loss.backward()
            optimizer.step()

            total_loss += loss.item()

        print(f"Epoch {epoch + 1}, Loss: {total_loss}")

    # Save the fine-tuned model
    model.save_pretrained(path)


# Example usage :
# need labled_data & profile_id

# profile = Profile.objects.get(id=4)
# print(extract_data(profile))