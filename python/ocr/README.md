# Reverie OCR API Example

This Python script demonstrates how to use the Reverie OCR (Optical Character Recognition) API to process documents. It supports both PDF and image files and offers different processing modes.

## Prerequisites

* **Python 3.6+:** Ensure you have Python installed.
* **Required Libraries:** Install the `requests` library:

    ```bash
    pip install requests
    ```

* **Reverie API Credentials:** You'll need your Reverie API key, application ID, and application name. Obtain these from your Reverie developer account.

## Setup

1.  **Clone or Download:** Download or clone this repository.
2.  **API Credentials:** Replace the placeholder API credentials in the script with your actual credentials:

    ```python
    headers = {
        "REV-API-KEY": "<YOUR-API-KEY>",  # Replace with your Reverie API Key
        "REV-APP-ID": "<YOUR-APP-ID>",  # Replace with your Reverie App ID
        "REV-APPNAME": "ocr",  # Application name (typically "ocr" for this API)
    }
    ```

3.  **Input File:**
    * Place the document or image you want to process in the same directory as the script.
    * Update the `file_path` variable with the correct path to your file:

        ```python
        file_path = "<YOUR-FILE-PATH>"  # Replace with the path to your file
        ```

4.  **File Type:** Specify the type of file you are uploading ("pdf" or "img") in the `data` dictionary:

    ```python
    data = {
        "file_type": "pdf",  # or "img"
        "languages": "en",
        "ocr_type": "layout_ocr",
    }
    ```

5.  **Languages:** Specify the languages present in the document using comma-separated language codes.  For example, "en" for English, "en,hi" for English and Hindi.  See the "Supported Languages" section for available codes.

    ```python
     data = {
        "file_type": "pdf",
        "languages": "en",  # Example: English
        "ocr_type": "layout_ocr",
    }
    ```

    **Supported Languages:**

    The following language codes are supported[cite: 5]:

    | Language Code | Language   |
    | :------------ | :--------- |
    | en            | English    |
    | bn            | Bengali    |
    | gu            | Gujarati   |
    | hi            | Hindi      |
    | kn            | Kannada    |
    | ml            | Malayalam  |
    | or            | Oriya      |
    | pa            | Punjabi   |
    | sa            | Sanskrit   |
    | ta            | Tamil      |
    | te            | Telugu     |

6.  **OCR Type:** Choose the OCR processing mode.

    * `layout_ocr`:  For PDFs, performs layout analysis and OCR, preserving the document's structure. Returns a DOCX file.  Not supported for images[cite: 3, 6].
    * `only_ocr`: Performs basic OCR. Returns a plain text file[cite: 3, 6].

    ```python
    data = {
        "file_type": "pdf",
        "languages": "en",
        "ocr_type": "layout_ocr",  # or "only_ocr"
    }
    ```

## Running the Script

1.  **Open a Terminal or Command Prompt:** Navigate to the directory containing the script.
2.  **Execute the Script:** Run the Python script:

    ```bash
    python your_script_name.py
    ```

3.  **Output:** The script will send the file to the Reverie OCR API and print the response to the console. The response will vary depending on the `ocr_type`:
    * `layout_ocr`:  The API will return a DOCX file[cite: 6, 7].
    * `only_ocr`: The API will return a plain text file[cite: 6, 7].

## Example

To perform layout OCR on a PDF file named "my\_document.pdf" containing English text:

1.  Place "my\_document.pdf" in the same directory as the script.
2.  Set `file_path = "my_document.pdf"`, `file_type = "pdf"`, `languages = "en"`, and `ocr_type = "layout_ocr"`.
3.  Run the script: `python your_script_name.py`.
4.  The API response (a DOCX file) will be processed based on how you handle the `response.text` in your code.
