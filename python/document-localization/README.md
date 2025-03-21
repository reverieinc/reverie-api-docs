# Reverie Language Translation API Example

This is a simple Python script demonstrating how to use the Reverie Language Translation API to upload, translate, and download documents.

## Prerequisites

* **Python 3.6+:** Ensure you have Python installed on your system.
* **Required Libraries:** Install the necessary libraries using pip:

    ```bash
    pip install requests
    ```

* **Reverie API Credentials:** You will need a Reverie API key, application ID, and application name. Obtain these from your Reverie developer account.

## Setup

1.  **Clone or Download:** Clone this repository or download the Python script (`your_script_name.py`).
2.  **API Credentials:** Replace the placeholder API credentials in the script with your actual credentials:

    ```python
    REV_APP_ID = "your_app_id"  # Replace with your Reverie App ID
    REV_APPNAME = "your_app_name" # Replace with your Reverie App Name
    REV_API_KEY = "your_api_key"  # Replace with your Reverie API Key
    ```

3.  **Input File:** Place the document you want to translate (e.g., a `.pdf` or `.docx` file) in the same directory as the script. Change the `file_path` variable in the script to the name of your file.

    ```python
    file_path = 'your_document.pdf' # Replace with your file name
    ```

4.  **Source and Target Languages:** Specify the source and target languages. The supported languages are:

    * english
    * bengali
    * gujarati
    * hindi
    * kannada
    * malayalam
    * odia
    * punjabi
    * sanskrit
    * tamil
    * telugu

    Change the `source_lang` and `target_lang` variables in the script:

    ```python
    source_lang = 'english'  # Source language (e.g., English)
    target_lang = 'hindi'  # Target language (e.g., Hindi)
    ```

## Running the Script

1.  **Open a Terminal or Command Prompt:** Navigate to the directory containing the script.
2.  **Execute the Script:** Run the Python script:

    ```bash
    python your_script_name.py
    ```

3.  **Output:** The script will:
    * Upload the file to the Reverie API.
    * Check the translation status periodically.
    * Download the translated document to the `output` directory.
    * Print status messages to the console.

4.  **Translated Document:** The translated document will be saved in the `output` directory as `translated_document_{target_lang}.docx`.

## Example Usage

To translate a file named `my_document.pdf` from English to Tamil:

1.  Place `my_document.pdf` in the same directory as the script.
2.  Set `file_path = 'my_document.pdf'`, `source_lang = 'en'`, and `target_lang = 'ta'`.
3.  Run the script: `python your_script_name.py`.
4.  The translated document will be saved as `output/translated_document_ta.docx`.

## Important Notes

* Ensure you have a stable internet connection.
* The translation time depends on the size of the document and the Reverie API's processing load.
* If you encounter any errors, check the console output for error messages.
* Ensure your API keys are correct.
* This example is for educational purpose, for production environment, please handle exceptions and errors properly.