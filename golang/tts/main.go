package main

import (
	"bytes"
	"fmt"
	"io"
	"net/http"
	"os"
)

func sendRequest(payload string, filename string) {
	url := "https://revapi.reverieinc.com/"

	req, err := http.NewRequest("POST", url, bytes.NewBuffer([]byte(payload)))
	if err != nil {
		fmt.Println("Request creation error:", err)
		return
	}

	// Set Headers
	req.Header.Set("REV-API-KEY", "<YOUR-API-KEY>")
	req.Header.Set("REV-APP-ID", "<YOUR-APP-ID>")
	req.Header.Set("REV-APPNAME", "tts")
	req.Header.Set("speaker", "hi_female") //Set Speaker
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Request error:", err)
		return
	}
	defer resp.Body.Close()

	// Create a file to save the response
	file, err := os.Create(filename)
	if err != nil {
		fmt.Println("File creation error:", err)
		return
	}
	defer file.Close()

	// Copy response body to file
	_, err = io.Copy(file, resp.Body)
	if err != nil {
		fmt.Println("File write error:", err)
		return
	}
	fmt.Println("Audio saved as", filename)
}

func main() {
	// Request 1: Plain text TTS
	payload1 := `{
		"text": ["भारत मेरा देश है।", "मेरी कंपनी का नाम रेवेरी लैंग्वेज टेक्नोलॉजीज है।"],
		"speed": 1,
		"pitch": 0,
		"format": "WAV"
	}`
	sendRequest(payload1, "output1.wav")

	// Request 2: SSML-based TTS
	payload2 := `{
		"ssml": "<speak> <voice name=\"en_female\"> Hello. </voice> </speak>",
		"speed": 1,
		"pitch": 0,
		"format": "mp3"
	}`
	sendRequest(payload2, "output2.mp3")
}
