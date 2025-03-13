# Reverie SDK Language Identification Example (Text)

This Python script demonstrates how to use the Reverie SDK to identify the language of a given text.

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
4.  **View Output:** The language identification results will be printed to the console as a Python dictionary.

## Code Explanation

1.  **Import ReverieClient:** The script imports the `ReverieClient` from the `reverie_sdk` library.
2.  **Initialize ReverieClient:** It initializes the client with your API key and application ID.
3.  **Language Identification:**
    * It uses the `client.nlu.lang_id_text()` method to identify the language of the provided text.
    * The input text is "भारत दक्षि ण एशि या मेंस्थि त भारतीय उपमहाद्वीप का सबसेबड़ा देश है" (Hindi for "India is the largest country in the Indian subcontinent, located in South Asia").
4.  **Print Results:**
    * The script prints the `resp` variable, which contains the language identification results as a Python dictionary.