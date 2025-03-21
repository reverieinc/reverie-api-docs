import requests

API_URL = "https://revapi.reverieinc.com/api/v2/text-analyse?translate=true&summary=true&sentiment=false&detect_entities=true&content_safety=true&pii_redaction=true"
API_KEY = "<YOUR-API-KEY>"
APP_ID = "<YOUR-APP-ID>"

def analyze_text(text, src_lang, tgt_lang=None, translation_domain="generic", moderation_types=None):
    if not src_lang:
        raise ValueError("Content language is required")
    if not text:
        raise ValueError("Text is required for text analysis")

    headers = {
        "Content-Type": "application/json",
        "REV-API-KEY": API_KEY,
        "REV-APP-ID": APP_ID,
        "REV-APPNAME": "text-analysis"
    }

    data = {
        "text": text,
        "language": src_lang,
        "pii_redaction": {
            "redact_pii_sub": "entity_name",
            "redact_pii_types": []
        },
        "summary": {
            "summary_model": "gemma2:2b",
            "summary_type": "gist"
        },
        "entity_recognition": {
            "entity_types": []
        },
        "sentiment": {
            "level": "whole"
        },
        "content_moderation": {
            "moderation_types": moderation_types or ["hate_speech", "profanity"]
        }
    }

    if tgt_lang:
        data["translation"] = {
            "target_language": tgt_lang,
            "translation_domain": translation_domain
        }

    response = requests.post(API_URL, json=data, headers=headers)

    if response.status_code == 200:
        return response.json().get("results", "No results found")
    else:
        raise Exception(f"Error: {response.text}")

# Example Usage
try:
    result = analyze_text("<YOUR-TEXT-HERE>", "<SOURCE-LANGUAGE>", "<TARGET-LANGUAGE>")
    print("Analysis Result:", result)
except Exception as e:
    print(e)
