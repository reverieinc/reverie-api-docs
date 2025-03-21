import os
import time
import requests

REV_APP_ID = "<YOUR-APP-ID>"
REV_APPNAME = "nmt"
REV_API_KEY = "<YOUR-API-KEY>"

UPLOAD_URL = "https://revapi.reverieinc.com/translate_doc_import"
STATUS_URL = "https://revapi.reverieinc.com/translate_doc_status"
DOWNLOAD_URL = "https://revapi.reverieinc.com/translate_doc_export"

OUTPUT_DIR = "output"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def upload_file(file_path, source_lang, target_lang):
    """Uploads a document for translation."""
    with open(file_path, "rb") as file:
        files = {"projectFiles": file}
        data = {"sourceLanguage": source_lang, "targetLanguage": target_lang}
        headers = {
            "REV-APP-ID": REV_APP_ID,
            "REV-APPNAME": REV_APPNAME,
            "REV-API-KEY": REV_API_KEY,
        }
        
        response = requests.post(UPLOAD_URL, headers=headers, files=files, data=data)
        if response.status_code == 200:
            json_response = response.json()
            print("File uploaded successfully.")
            return json_response.get("projectId")
        else:
            print("Error in uploading file:", response.text)
            return None

def check_status(doc_id):
    """Checks the translation status."""
    while True:
        params = {"doc_id": doc_id}
        headers = {
            "REV-APP-ID": REV_APP_ID,
            "REV-APPNAME": REV_APPNAME,
            "REV-API-KEY": REV_API_KEY,
        }
        
        response = requests.get(STATUS_URL, headers=headers, params=params)
        json_response = response.json()
        
        if json_response.get("success") and json_response.get("message") == "completed":
            print("Translation completed!")
            return True
        else:
            print("Translation in progress... Checking again in 2 seconds.")
            time.sleep(2)

def download_translation(doc_id, target_lang):
    """Downloads the translated document and saves it to the output folder."""
    headers = {
        "Content-Type": "application/json",
        "REV-APP-ID": REV_APP_ID,
        "REV-APPNAME": REV_APPNAME,
        "REV-API-KEY": REV_API_KEY,
    }
    
    json_data = {"unitId": doc_id, "targetLanguages": [target_lang]}
    response = requests.post(DOWNLOAD_URL, headers=headers, json=json_data)

    if response.status_code == 200:
        json_response = response.json()
        if json_response.get("success"):
            target_urls = json_response.get("data", {}).get("targetURLS", {})
            for filename, lang_urls in target_urls.items():
                file_url = lang_urls.get(target_lang)
                if file_url:
                    download_and_save(file_url, filename)
                    print('File downloaded successfully')
                else:
                    print(f"Target language '{target_lang}' not found for file '{filename}'.")
    else:
        print("Error downloading translation:", response.text)


def download_and_save(file_url, filename):
    """Downloads the file from the URL and saves it."""
    response = requests.get(file_url, stream=True)
    
    if response.status_code == 200:
        output_path = os.path.join(OUTPUT_DIR, f"translated_{filename}")
        with open(output_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
        print(f"Saved translated file to: {output_path}")
    else:
        print("Failed to download translated document.")


if __name__ == "__main__":
    file_path = '<YOUR-FILE-PATH>'
    source_lang = '<SOURCE-LANGUAGE>'
    target_lang = '<TARGET-LANGUAGE>'

    doc_id = upload_file(file_path, source_lang, target_lang)

    if doc_id:
        if check_status(doc_id):
            download_translation(doc_id, target_lang)
