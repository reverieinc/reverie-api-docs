# Reverie SDK Streaming TTS Example (Python)

This Python script demonstrates how to use the Reverie SDK to perform streaming Text-to-Speech (TTS) on a large text file.

## Prerequisites

* Python 3.6 or later
* `reverie_sdk` library installed (`pip install reverie-sdk`)
* A Reverie API key and application ID
* A text file named `big_text.txt` in the same directory as the script (or a path to a text file)

## Usage

1.  **Install Reverie SDK:**
    ```bash
    pip install reverie-sdk
    ```
2.  **Replace Placeholders:** In the script, replace `"MY_API_KEY"` and `"MY_APP_ID"` with your actual API key and application ID.
3.  **Create Text File:** Ensure you have a text file named `big_text.txt` in the same directory as the script or modify the path accordingly.
4.  **Create Output Directory:** Create the directory `.path/to/output/` or change the output path to your desired location.
5.  **Run the Script:**
    ```bash
    python your_script_name.py
    ```

## Code Explanation

1.  **Import ReverieClient:** The script imports the `ReverieClient` from the `reverie_sdk` library.
2.  **Initialize ReverieClient:** It initializes the client with your API key and application ID.
3.  **Read Text File:** It reads the content of the `big_text.txt` file into the `text` variable.
4.  **Streaming TTS:**
    * It uses the `client.tts.tts_streaming()` method to perform streaming TTS on the text.
    * `text`: The input text.
    * `speaker`: The desired speaker (e.g., "en_male").
    * `max_words_per_chunk`: Limits the number of words in each audio chunk.
    * `fast_sentence_fragment`: if true, the sentence fragments are processed faster, but the quality might be lower.
5.  **Iterate Through Responses:**
    * The script iterates through the responses from the streaming TTS API.
    * For each response (`resp`), it prints the response index and duration.
    * It saves the audio chunk as a WAV file using `resp.save_audio()`.
    * `f".path/to/output/{resp_idx:08d}.wav"`: The output file path, with the response index as the filename.
    * `create_parents=True`: Creates the output directory if it doesn't exist.
    * `overwrite_existing=True`: Overwrites existing files with the same name.

