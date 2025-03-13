# Language Identification Client (Go)

This Go program provides a simple client for identifying the language of a given text using an external API.

## Prerequisites

* Go 1.16 or later

## Usage

1.  **Replace Placeholders:** In the `main.go` file, replace `"REV-API-KEY"` and `"REV-APP-ID"` with your actual API key and application ID.
2.  **Run the Program:**
    ```bash
    go run main.go
    ```
3.  **View Output:** The API's response (or an error message) will be printed to the console.

## Code Explanation

The `LangIdentifier` struct encapsulates the necessary information to interact with the language identification API, including the base URL, API key, and application ID.

The `IdentifyLanguageByText` method performs the following steps:

1.  **Input Validation:** Checks if the input text is empty or exceeds the maximum length of 512 characters.
2.  **Calculate Max Length:** Calculates the `max_length` parameter for the API call using the formula `2^(floor(sqrt(textLength)) + 1)`.
3.  **Create Request Body:** Marshals the input text and calculated `max_length` into a JSON request body.
4.  **Create HTTP Request:** Creates an HTTP POST request to the API endpoint, setting the necessary headers, including `Content-Type`, `REV-API-KEY`, `REV-APP-ID`, and `REV-APPNAME`.
5.  **Send Request and Receive Response:** Sends the request to the API and receives the response.
6.  **Decode Response:** Decodes the JSON response into a `LangIDResponse` struct.
7.  **Return Result:** Returns the decoded response or an error if any occurred.

## Example

```go
package main

import (
        "fmt"
)

func main() {
        li := LangIdentifier{
                BaseURL: "[https://revapi.reverieinc.com](https://revapi.reverieinc.com)",
                APIKey:  "YOUR_API_KEY",
                AppID:   "YOUR_APP_ID",
        }

        response, err := li.IdentifyLanguageByText("This is a test.")
        if err != nil {
                fmt.Println("Error:", err)
        } else {
                fmt.Println("Response:", response)
        }
}