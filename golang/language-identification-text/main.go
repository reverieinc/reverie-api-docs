package main

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"math"
)

type LangIDRequest struct {
	Text      string `json:"text"`
	MaxLength int    `json:"max_length"`
}

type LangIDResponse struct {
	// Define response fields based on API response structure
}

type LangIdentifier struct {
	BaseURL string
	APIKey  string
	AppID   string
}

func (li *LangIdentifier) IdentifyLanguageByText(text string) (interface{}, error) {
	if text == "" {
		return nil, errors.New("text to identify is required")
	}
	if len(text) > 512 {
		return nil, errors.New("text exceeds maximum length of 512 characters")
	}

	maxLength := int(math.Pow(2, float64(int(math.Sqrt(float64(len(text))))+1)))

	reqBody, _ := json.Marshal(LangIDRequest{Text: text, MaxLength: maxLength})

	req, err := http.NewRequest("POST", li.BaseURL, bytes.NewBuffer(reqBody))
	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("REV-API-KEY", li.APIKey)
	req.Header.Set("REV-APP-ID", li.AppID)
	req.Header.Set("REV-APPNAME", "lang_id_text")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var result LangIDResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, err
	}

	return result, nil
}

func main() {
	li := LangIdentifier{
		BaseURL: "https://revapi.reverieinc.com", 
		APIKey:  "REV-API-KEY",
		AppID:   "REV-APP-ID",
	}

	response, err := li.IdentifyLanguageByText("Hello, how are you?")
	if err != nil {
		fmt.Println("Error:", err)
	} else {
		fmt.Println("Response:", response)
	}
}
