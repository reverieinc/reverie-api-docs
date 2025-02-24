package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

const (
	apiURL     = "https://revapi.reverieinc.com/"
	apiKey     = "8b2bdd790d81cd8dd3eac38b258ba7cd0990f83d"
	appID      = "com.reverieetherpad"
)

type RequestBody struct {
	Data                 []string `json:"data"`
	IsBulk               bool     `json:"isBulk"`
	IgnoreTaggedEntities bool     `json:"ignoreTaggedEntities"`
}

type APIResponse struct {
	ResponseList []struct {
		APIStatus int      `json:"apiStatus"`
		InString  string   `json:"inString"`
		OutString []string `json:"outString"`
	} `json:"responseList"`
}
func main() {
	text := "Reverie Language Technologies ltd website address is www.reverieinc.com"
	requestBody := map[string]interface{}{
		"data":                 []string{text},
		"isBulk":               false,
		"ignoreTaggedEntities": false,
	}

	jsonData, err := json.Marshal(requestBody)
	if err != nil {
		log.Fatalf("Error marshaling JSON: %v", err)
	}

	req, err := http.NewRequest("POST", apiURL, bytes.NewBuffer(jsonData))
	if err != nil {
		log.Fatalf("Error creating request: %v", err)
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("REV-API-KEY", apiKey)
	req.Header.Set("REV-APP-ID", appID)
	req.Header.Set("src_lang", "en")
	req.Header.Set("tgt_lang", "hi")
	req.Header.Set("domain", "generic")
	req.Header.Set("cnt_lang", "en")
	req.Header.Set("REV-APPNAME", "transliteration")
	req.Header.Set("REV-APPVERSION", "2.0")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Fatalf("Error making request: %v", err)
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalf("Error reading response body: %v", err)
	}

	var apiResponse APIResponse
	err = json.Unmarshal(body, &apiResponse)
	if err != nil {
		log.Fatalf("Error unmarshaling response: %v", err)
	}

	if len(apiResponse.ResponseList) > 0 && len(apiResponse.ResponseList[0].OutString) > 0 {
		fmt.Println("Transliterated text:", apiResponse.ResponseList[0].OutString[0])
	} else {
		fmt.Println("No response from API")
	}
}