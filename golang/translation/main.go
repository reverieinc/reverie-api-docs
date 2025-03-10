package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
)

const (
	apiURL = "https://revapi.reverieinc.com/"
	apiKey     = "<YOUR API KEY>"
	appID      = "<YOUR APP ID>"
)

type RequestBody struct {
	Data                 []string `json:"data"`
	IsBulk               bool     `json:"isBulk"`
	IgnoreTaggedEntities bool     `json:"ignoreTaggedEntities"`
}

type APIResponse struct {
	ResponseList []struct {
		APIStatus int    `json:"apiStatus"`
		InString  string `json:"inString"`
		OutString string `json:"outString"` // Change []string to string
	} `json:"responseList"`
	TokenConsumed int `json:"tokenConsumed"`
}


func main() {
	text := "Reverie Language Technologies ltd is a great place to work."

	// Constructing JSON Request Body
	requestBody := map[string]interface{}{
		"data":                 []string{text},
		"isBulk":               false,
		"ignoreTaggedEntities": false,
	}

	jsonData, err := json.Marshal(requestBody)
	if err != nil {
		log.Fatalf("Error marshaling JSON: %v", err)
	}

	// Creating HTTP Request
	req, err := http.NewRequest("POST", apiURL, bytes.NewBuffer(jsonData))
	if err != nil {
		log.Fatalf("Error creating request: %v", err)
	}

	// Setting Request Headers
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("REV-API-KEY", apiKey)
	req.Header.Set("REV-APP-ID", appID)
	req.Header.Set("src_lang", "en")
	req.Header.Set("tgt_lang", "hi")
	req.Header.Set("domain", "1")
	req.Header.Set("cnt_lang", "en")
	req.Header.Set("REV-APPNAME", "localization")

	// Making HTTP Request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Fatalf("Error making request: %v", err)
	}
	defer resp.Body.Close()

	// Handle non-200 response codes
	if resp.StatusCode != http.StatusOK {
		log.Fatalf("Unexpected API response status: %d", resp.StatusCode)
	}

	// Read Response Body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatalf("Error reading response body: %v", err)
	}

	// Unmarshalling JSON Response
	var apiResponse APIResponse
	err = json.Unmarshal(body, &apiResponse)
	if err != nil {
		log.Fatalf("Error unmarshaling response: %v", err)
	}

	// Check if response contains valid translation
	if len(apiResponse.ResponseList) > 0 {
		response := apiResponse.ResponseList[0]
		if len(response.OutString) > 0 {
			fmt.Println("Translated Text:", response.OutString)
		} else {
			fmt.Println("No translated text received.")
		}

		// Handling API Status
		if response.APIStatus != 3 { // Example: 3 might indicate partial success
			fmt.Printf("Warning: API returned status %d\n", response.APIStatus)
		}
	} else {
		fmt.Println("No response from API")
	}
}
