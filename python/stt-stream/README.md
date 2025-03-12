# Reverie SDK Streaming Speech-to-Text (ASR) Example with Microphone Input (Python)

This Python script demonstrates how to use the Reverie SDK to perform streaming Speech-to-Text (ASR) with real-time microphone input using `pyaudio`.

## Prerequisites

* Python 3.6 or later
* `reverie_sdk` library installed (`pip install reverie-sdk`)
* `pyaudio` library installed (`pip install pyaudio`)
* A working microphone
* A Reverie API key and application ID

**Note:** `pyaudio` installation might require additional system dependencies depending on your operating system. Refer to the `pyaudio` documentation for platform-specific instructions.

## Usage

1.  **Install Required Libraries:**
    ```bash
    pip install reverie-sdk pyaudio
    ```
2.  **Replace Placeholders:** In the script, replace `<YOUR-API-KEY>` and `<YOUR-APP-ID>` with your actual API key and application ID.
3.  **Run the Script:**
    ```bash
    python your_script_name.py
    ```
4.  **Speak into the Microphone:** The script will start listening to your microphone input. The transcribed text will be printed to the console in real-time.
5.  **Stop the Script:** Press `Ctrl+C` to stop the script.

## Code Explanation

1.  **Import Libraries:** The script imports `pyaudio`, `asyncio`, `ReverieClient`, and `AudioStream`.
2.  **Initialize ReverieClient:** It initializes the `ReverieClient` with your API key and application ID.
3.  **Initialize AudioStream:** An `AudioStream` object is created to manage the audio chunks.
4.  **Initialize PyAudio:** A `pyaudio.PyAudio` object (`pa`) is created to interact with the audio hardware.
5.  **`mic_callback` Function:**
    * This function is the callback for the `pyaudio` stream.
    * It runs asynchronously to add audio chunks to the `AudioStream` object using `stream.add_chunk_async(in_data)`.
    * It handles potential exceptions and returns the appropriate `pyaudio` status.
6.  **`main` Function (Async):**
    * It opens a `pyaudio` stream for microphone input with the specified parameters (16kHz, mono, 16-bit).
    * It starts the `pyaudio` stream.
    * It prints a message indicating that the script is listening.
    * It calls `client.asr.stt_stream_async()` to perform streaming ASR.
    * `src_lang`: The source language (English in this case, "en").
    * `bytes_or_stream`: The `AudioStream` object containing the audio chunks.
    * `callback`: The `print` function is used as the callback to print the transcribed text.
    * It handles potential exceptions during the ASR process.
    * It stops and closes the `pyaudio` stream in the `finally` block.
7.  **Run `main` Function:** The `asyncio.run(main())` line runs the `main` function asynchronously.
8.  **Terminate PyAudio:** The `pa.terminate()` line terminates the `pyaudio` session.