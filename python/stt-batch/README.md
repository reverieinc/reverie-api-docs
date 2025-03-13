# Reverie SDK File-Based Speech-to-Text (ASR) Example (Python)

This Python script demonstrates how to use the Reverie SDK to perform file-based Speech-to-Text (ASR) on an audio file.

## Prerequisites

* Python 3.6 or later
* `reverie_sdk` library installed (`pip install reverie-sdk`)
* An audio file (`audio.wav`)
* A Reverie API key and application ID

## Usage

1.  **Install Reverie SDK:**
    ```bash
    pip install reverie-sdk
    ```
2.  **Replace Placeholders:** In the script, replace `<YOUR API KEY>` and `<YOUR APP ID>` with your actual API key and application ID.
3.  **Replace Audio File Path:** Change `"./path/to/audio.wav"` to the actual path of your audio file.
4.  **Run the Script:**
    ```bash
    python your_script_name.py
    ```
5.  **View Output:** The ASR results will be printed to the console as a Python dictionary.

## Code Explanation

1.  **Import ReverieClient:** The script imports the `ReverieClient` from the `reverie_sdk` library.
2.  **Initialize ReverieClient:** It initializes the client with your API key and application ID.
3.  **File-Based ASR:**
    * It uses the `client.asr.stt_file()` method to perform file-based ASR.
    * `src_lang`: The source language of the audio (English, "en").
    * `data`: The audio file's binary data, obtained by reading the file with `open("./path/to/audio.wav", "rb").read()`.
4.  **Print Results:**
    * The script prints the `resp` variable, which contains the ASR results as a Python dictionary.