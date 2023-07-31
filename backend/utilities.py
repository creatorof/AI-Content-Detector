from transformers import pipeline
from PyPDF2 import PdfReader

pipe = pipeline("text-classification", model="roberta-base-openai-detector")

def check_content(content):
    output = pipe(content)
    return output


def read_pdf(file):
    reader = PdfReader(file)
    total_pages = len(reader.pages)
    text = ''

    for count in range(total_pages):
        page = reader.pages[count]
        text += page.extract_text()
    
    return text