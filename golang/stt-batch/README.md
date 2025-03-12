# Speech-to-Text (STT) File Transcription Client (Go)

This Go program provides a simple client for using a Speech-to-Text (STT) API to transcribe audio files.

## Prerequisites

* Go 1.16 or later
* An audio file (`audio.wav` by default) in the same directory as the Go program.

## Usage

1.  **Replace Placeholders:** In the `main.go` file, replace `"your_api_key"` and `"your_app_id"` with your actual API key and application ID.
2.  **Place Audio File:** Ensure your audio file is named `audio.wav` and is located in the same directory as your Go program. If you have a different audio file or path, change the `audioPath` constant.
3.  **Run the Program:**
    ```bash
    go run main.go
    ```
4.  **View Output:** The transcribed text will be printed to the console.

## Code Explanation

The program performs the following steps:

1.  **Define Constants:** Sets the API URL, API key, application ID, application name, source language, domain, and audio file path as constants.
2.  **Define Data Structure:** Defines an `ApiResponse` struct to represent the API's JSON response.
3.  **`transcribeAudio` Function:**
    * Opens the specified audio file.
    * Creates a `multipart/form-data` request body to send the audio file.
    * Reads the audio file's content into memory.
    * Creates an HTTP POST request to the API URL with the `multipart/form-data` body.
    * Sets the required headers, including:
        * `src_lang`: Source language.
        * `domain`: Domain.
        * `REV-API-KEY`: Your API key.
        * `REV-APPNAME`: Application name.
        * `REV-APP-ID`: Your application ID.
        * `Content-Type`: The `multipart/form-data` content type.
    * Sends the request to the API and receives the response.
    * Reads the response body.
    * Unmarshals the JSON response into an `ApiResponse` struct.
    * Returns the transcribed text or an error if any occurred.
4.  **`main` Function:**
    * Calls the `transcribeAudio` function with the audio file path.
    * Handles any errors returned by the `transcribeAudio` function.
    * Prints the transcribed text to the console.

## Example

```go
package main

import (
    "fmt"
)

func main() {
    transcription, err := transcribeAudio("audio.wav")
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println("Transcription:", transcription)
}