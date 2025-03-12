# Text-to-Speech (TTS) Client (Go)

This Go program provides a simple client for using a Text-to-Speech (TTS) API. It sends two types of requests: plain text TTS and SSML-based TTS, and saves the resulting audio files.

## Prerequisites

* Go 1.16 or later

## Usage

1.  **Replace Placeholders:** In the `main.go` file, replace `<YOUR-API-KEY>` and `<YOUR-APP-ID>` with your actual API key and application ID.
2.  **Run the Program:**
    ```bash
    go run main.go
    ```
3.  **Check Output:** The generated audio files (`output1.wav` and `output2.mp3`) will be created in the same directory as the Go program.

## Code Explanation

The `sendRequest` function handles the process of sending an HTTP POST request to the TTS API and saving the audio response.

1.  **Request Creation:** It creates an HTTP POST request to the specified URL with the provided payload.
2.  **Headers:** It sets the required headers, including:
    * `REV-API-KEY`: Your API key.
    * `REV-APP-ID`: Your application ID.
    * `REV-APPNAME`: Set to "tts".
    * `speaker`: Specifies the speaker (e.g., "hi_female").
    * `Content-Type`: Set to "application/json".
3.  **HTTP Client:** It uses an `http.Client` to send the request.
4.  **Response Handling:**
    * It checks for errors during the request.
    * It creates a file with the specified filename.
    * It copies the response body (the audio data) to the file.
5.  **Main Function:**
    * The `main` function defines two payloads: `payload1` for plain text TTS and `payload2` for SSML-based TTS.
    * It calls `sendRequest` with each payload and the desired output filename.

## Example Payloads

* **Plain Text TTS (`payload1`):**

    ```json
    {
        "text": ["भारत मेरा देश है।", "मेरी कंपनी का नाम रेवेरी लैंग्वेज टेक्नोलॉजीज है।"],
        "speed": 1,
        "pitch": 0,
        "format": "WAV"
    }
    ```

    This payload requests TTS for the provided Hindi text, with normal speed and pitch, and saves the output as a WAV file.

* **SSML-based TTS (`payload2`):**

    ```json
    {
        "ssml": "<speak> <voice name=\"en_female\"> Hello. </voice> </speak>",
        "speed": 1,
        "pitch": 0,
        "format": "mp3"
    }
    ```

    This payload uses SSML to specify the voice and text, and saves the output as an MP3 file.

## Error Handling

The program includes basic error handling for:

* Request creation errors.
* Request sending errors.
* File creation errors.
* File write errors.

## API Details

* **Base URL:** `https://revapi.reverieinc.com/` (Replace with the actual API endpoint if different)
* **Authentication:** Requires `REV-API-KEY` and `REV-APP-ID` headers.
* **Request Method:** POST
* **Content-Type:** application/json
* **Request Body:** JSON object with `text` or `ssml` fields, along with `speed`, `pitch`, and `format` fields.
* **Response Body:** Audio data (WAV or MP3).

## Future Improvements

* Add command-line flags for API key, app ID, speaker, input text/SSML, output format, and output filename.
* Implement more robust error handling and logging.
* Add support for other TTS API features.
* Add better input validation.
* Add unit tests.