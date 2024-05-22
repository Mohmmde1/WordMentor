from transformers import BertTokenizer, BertForSequenceClassification
from PyPDF2 import PdfReader
import torch
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import time

# Download the stopwords corpus if not already downloaded
nltk.download('stopwords')
nltk.download('punkt')

def extract_important_words(text):

    # Tokenize the text into words
    words = word_tokenize(text)

    # Filter out stopwords
    filtered_words = [word.lower() for word in words if word.lower() not in stopwords.words('english') and word.isalpha() and len(word)>1]

    return set(filtered_words)

def extract_text_from_pdf(pdf_path, from_page, to_page):
    # Open the PDF file
    with open(pdf_path, 'rb') as file:
        reader = PdfReader(file)
        text = ""
        
        # Iterate over the specified page range
        for page_num in range(from_page - 1, to_page):
            page = reader.pages[page_num]
            text += page.extract_text()
    
    return text



def main():
    pdf_path = '/app/backend/media/books/bookC34dayang.pdf'
    from_page = 1
    to_page = 5
    start_time = time.time()
    try:
        # Load pre-trained BERT tokenizer
        tokenizer = BertTokenizer.from_pretrained('bert-base-uncased', cache_dir='/app/backend/cache_dir/tokenizer')

        # # Load the fine-tuned BERT model
        model = BertForSequenceClassification.from_pretrained("/app/backend/fine_tuned_models/mohammed_model")

        # # Set the model to evaluation mode
        model.eval()

        # Extract text from the specified pages
        extracted_text = extract_text_from_pdf(pdf_path, from_page, to_page)

        tokens = extract_important_words(extracted_text)
        unknown_words = []
        # Iterate over random words
        for word in tokens:
            # Tokenize the input word
            inputs = tokenizer(word.lower(), return_tensors="pt")

            # Perform inference
            with torch.no_grad():
                outputs = model(**inputs)

            # Get predicted probabilities
            probs = torch.softmax(outputs.logits, dim=-1)

            # Get the predicted label
            predicted_label = torch.argmax(probs, dim=-1).item()

            # Map the predicted label to its corresponding class
            class_names = ['Not_Known', 'Known']  # Assuming 0: Not_Known, 1: Known
            predicted_class = class_names[predicted_label]
            if predicted_class == 'Not_Known':
                unknown_words.append(word)
            # print("Predicted class for the word", word, ":", predicted_class)
        print(unknown_words)
        print("--- %s seconds ---" % (time.time() - start_time))   
    except Exception as e:
        print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    main()
