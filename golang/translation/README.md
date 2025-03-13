# Localization Client (Go)

This Go program provides a simple client for using a localization API. It sends a text string for translation and retrieves the translated output.

## Prerequisites

* Go 1.16 or later

## Usage

1.  **Replace Placeholders:** In the `main.go` file, replace `<YOUR API KEY>` and `<YOUR APP ID>` with your actual API key and application ID.
2.  **Run the Program:**
    ```bash
    go run main.go
    ```
3.  **View Output:** The translated text and any API status warnings will be printed to the console.

## Code Explanation

The program performs the following steps:

1.  **Define Constants:** Sets the API URL, API key, and application ID as constants.
2.  **Define Data Structures:** Defines `RequestBody` and `APIResponse` structs to represent the request and response data structures. Note the `OutString` in `APIResponse` is a `string` and not a `[]string` as in the previous example.
3.  **Prepare Request Body:**
    * Creates a map representing the request body, including the input text, `isBulk` flag, and `ignoreTaggedEntities` flag.
    * Marshals the map into JSON format.
4.  **Create HTTP Request:**
    * Creates an HTTP POST request to the API URL with the JSON request body.
    * Sets the required headers, including:
        * `Content-Type`: `application/json`
        * `REV-API-KEY`: Your API key.
        * `REV-APP-ID`: Your application ID.
        * `src_lang`: Source language (e.g., "en").
        * `tgt_lang`: Target language (e.g., "hi").
        * `domain`: Domain (e.g., "1").
        * `cnt_lang`: Content language (e.g., "en").
        * `REV-APPNAME`: `localization`.
5.  **Send Request and Receive Response:**
    * Sends the request to the API and receives the response.
    * Handles non-200 response codes.
    * Reads the response body.
6.  **Parse Response:**
    * Unmarshals the JSON response into an `APIResponse` struct.
7.  **Extract and Display Translated Text:**
    * Checks if the response contains any translated text.
    * Prints the translated text to the console or a "No translated text received." message if no text is found.
    * Handles API status codes and prints warnings if necessary.
8.  **Error Handling:**
    * Includes error handling for JSON marshaling, request creation, request sending, response reading, and JSON unmarshaling.
    * If an error occurs, the program terminates with a fatal log message.

## Example

```go
package main

import (
    "fmt"
)

func main() {
    // ... (rest of the code) ...
    if len(apiResponse.ResponseList) > 0 {
        response := apiResponse.ResponseList[0]
        if len(response.OutString) > 0 {
            fmt.Println("Translated Text:", response.OutString)
        } else {
            fmt.Println("No translated text received.")
        }
        if response.APIStatus != 3 {
            fmt.Printf("Warning: API returned status %d\n", response.APIStatus)
        }
    } else {
        fmt.Println("No response from API")
    }
}