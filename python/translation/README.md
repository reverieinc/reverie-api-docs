# Reverie SDK Localization (NMT) Example (Python)

This Python script demonstrates how to use the Reverie SDK to perform Neural Machine Translation (NMT) localization with masking and multiple target languages.

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
4.  **View Output:** The localization results will be printed to the console as Python dictionaries.

## Code Explanation

1.  **Import ReverieClient:** The script imports the `ReverieClient` from the `reverie_sdk` library.
2.  **Initialize ReverieClient:** It initializes the client with your API key and application ID.
3.  **Single Target Language Localization:**
    * It uses `client.nmt.localization()` to perform NMT localization.
    * `data`: A list of strings to be translated.
    * `domain`: The domain of the translation (1 in this case).
    * `src_lang`: The source language (English, "en").
    * `tgt_lang`: A list containing the target language(s). In the first example, only Hindi ("hi") is the target.
    * `nmtMask`: Enables masking of specific terms.
    * `nmtMaskTerms`: A list of terms to be masked during translation.
    * `nmtParam`: Enables NMT parameters.
    * `dbLookupParam`: Enables database lookup parameters.
    * `segmentationParam`: Disables segmentation parameters.
    * The result (`resp`) is printed to the console.
4.  **Multiple Target Languages Localization:**
    * The same `client.nmt.localization()` method is used with multiple target languages.
    * `tgt_lang`: A list containing multiple target languages (Hindi "hi", Oriya "or", and Marathi "mr").
    * The result (`respMultiple`) is printed to the console.

