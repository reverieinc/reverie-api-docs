package main

import (
"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"mime/multipart"
	"net/http"
	"os"
)

const (
	apiURL     = "https://revapi.reverieinc.com/"
	apiKey     = "your_api_key"   
	appID      = "your_app_id"
	appName    = "stt_file"
	srcLang    = "en"
	domain     = "generic"
	audioPath  = "audio.wav"
)

type ApiResponse struct {
	DisplayText string `json:"display_text"`
}

func transcribeAudio(filePath string) (string, error) {
	file, err := os.Open(filePath)
	if err != nil {
		return "", fmt.Errorf("error opening file: %v", err)
	}
	defer file.Close()

	var requestBody bytes.Buffer
	writer := multipart.NewWriter(&requestBody)
	part, err := writer.CreateFormFile("audio_file", filePath)
	if err != nil {
		return "", fmt.Errorf("error creating form file: %v", err)
	}

	fileBytes, err := ioutil.ReadAll(file)
	if err != nil {
		return "", fmt.Errorf("error reading file: %v", err)
	}
	part.Write(fileBytes)
	writer.Close()

	req, err := http.NewRequest("POST", apiURL, &requestBody)
	if err != nil {
		return "", fmt.Errorf("error creating request: %v", err)
	}

	req.Header.Set("src_lang", srcLang)
	req.Header.Set("domain", domain)
	req.Header.Set("REV-API-KEY", apiKey)
	req.Header.Set("REV-APPNAME", appName)
	req.Header.Set("REV-APP-ID", appID)
	req.Header.Set("Content-Type", writer.FormDataContentType())

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", fmt.Errorf("error sending request: %v", err)
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("error reading response: %v", err)
	}

	var apiResponse ApiResponse
	if err := json.Unmarshal(body, &apiResponse); err != nil {
		return "", fmt.Errorf("error parsing JSON: %v", err)
	}

	return apiResponse.DisplayText, nil
}

func main() {
	transcription, err := transcribeAudio(audioPath)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	fmt.Println("Transcription:", transcription)
}
