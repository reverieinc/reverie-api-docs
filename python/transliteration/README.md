# Reverie SDK Transliteration Example (Python)

This Python script demonstrates how to use the Reverie SDK to perform transliteration of English text to Hindi.

## Prerequisites

* Python 3.6 or later
* `reverie_sdk` library installed (`pip install reverie-sdk`)
* A Reverie API key and application ID

## Usage

1.  **Install Reverie SDK:**
    ```bash
    pip install reverie-sdk
    ```
2.  **Replace Placeholders:** In the script, replace `"MY_API_KEY"` and `"MY_APP_ID"` with your actual API key and application ID.
3.  **Run the Script:**
    ```bash
    python your_script_name.py
    ```
4.  **View Output:** The transliteration results will be printed to the console as a Python dictionary.

## Code Explanation

1.  **Import ReverieClient:** The script imports the `ReverieClient` from the `reverie_sdk` library.
2.  **Initialize ReverieClient:** It initializes the client with your API key and application ID.
3.  **Transliteration:**
    * It uses the `client.t13n.transliteration()` method to perform transliteration.
    * `data`: A list of strings to be transliterated.
    * `src_lang`: The source language (English in this case, "en").
    * `cnt_lang`: The content language (English in this case, "en").
    * `tgt_lang`: The target language (Hindi in this case, "hi").
    * `noOfSuggestions`: The number of transliteration suggestions to return (2 in this case).
4.  **Print Results:**
    * The script prints the `res` variable, which contains the transliteration results as a Python dictionary.