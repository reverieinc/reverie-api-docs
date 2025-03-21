import requests

url = "https://revapi.reverieinc.com/process_doc"

headers = {
    "REV-API-KEY": "<YOUR-API-KEY",
    "REV-APP-ID": "<YOUR-APP-ID",
    "REV-APPNAME": "ocr",
}

file_path = "<YOUR-FILE-PATH>"
files = {"file": open(file_path, "rb")}
data = {
    "file_type": "pdf",
    "languages": "en",
    "ocr_type": "layout_ocr",
}

response = requests.post(url, headers=headers, files=files, data=data)

print(response.text)
