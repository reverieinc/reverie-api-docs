# REVERIE LANGUAGE TECHNOLOGIES SLID API Client

This Python script provides a client for interacting with the Spoken Language Identification (SLID) API. It allows you to upload an audio file and identify the spoken language.

## Prerequisites

* Python 3.6 or higher
* `requests` library (Install using: `pip install requests`)

## Installation

1.  Clone this repository or download the `slid_api_client.py` file.

## Usage

1.  **Obtain API Credentials:** You need to have a valid API Key and App ID provided by Reverie. 
2.  **Install Dependencies:** If you haven't already, install the necessary Python library:
    ```bash
    pip install requests
    ```
3.  **Configure the Script:**
    * Open `slid_api_client.py` in a text editor.
    * Replace `<Your API Key>` and `<Your App ID>` with your actual API credentials.
    * Modify the `audio_file` variable to point to the path of the audio file you want to analyze.
    * If your audio file is not in the default format (WAV, Signed 16 bit, 16,000 Hz), you can specify the format using the `audio_format` parameter in the `identify_language` function. 
4.  **Run the Script:**
    ```bash
    python slid_api_client.py
    ```
5.  **View the Output:** The script will print the JSON response from the API, which includes the detected language and confidence score.

## Code Details

* The `SLIDApiClient` class encapsulates the API interaction.
* The `identify_language` method sends a POST request to the SLID API endpoint with the audio file and necessary headers.  
* Error handling is implemented using `try-except` blocks to catch potential exceptions during the API request.  
* The script demonstrates how to use the client with both the default audio format and a specific format.

## Supported Audio Formats

The API supports various audio formats, including:  

* WAV (default): Signed 16 bit, 16,000 Hz (16k\_int16), Unsigned 8 bit, 16,000 Hz (16k\_uint8),  Signed 16 bit, 8,000 Hz (8k\_int16), Unsigned 8 bit, 8,000 Hz (8k\_uint8)
* MP3
* FLAC
* OGG Vorbis
* OGG Opus
