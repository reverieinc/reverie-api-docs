# Speech-to-Text (File) API

## Steps to Run the Application

### Prerequisites:

- **VS Code** installed
- **Node.js** installed (for Webpack-based setup)

## Installation

1. **Install Dependencies**

   - Open the terminal in VS Code
   - Run:
     ```sh
     npm install
     ```

2. **Start the Dev Server**

   - Run:
     ```sh
     npm start
     ```
   - This will start the Webpack Dev Server on `http://localhost:3000/`

3. **Build for Production**

   - Run:
     ```sh
     npm run build
     ```
   - This will generate the bundled files in the `dist/` folder

## Usage

- Click **Start Speaking** to begin speech recognition.
- Select a language from the dropdown .
- Transcription will appear in the text area.
- Click **Reset** to clear the text.

## Query Parameters

## Headers

| Header Name     | Description                                                                   | Is Mandatory? | Value      |
| --------------- | ----------------------------------------------------------------------------- | ------------- | ---------- |
| **REV-API-KEY** | A unique key/token provided by Reverie to identify the user using the STT API | Yes           | -          |
| **REV-APP-ID**  | The unique account ID to identify the user and the default account settings   | Yes           | -          |
| **REV-APPNAME** | The parameter to identify the API                                             | Yes           | `stt_file` |

## Request Parameters

| Parameter Name | Description                                                                                                          | Is Mandatory? | Value                                                                                                                                                                                                                                                                                                                                                |
| -------------- | -------------------------------------------------------------------------------------------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **domain**     | Specifies the domain in which the STT API is used for transcribing the audio file. Example: Banking, Insurance, etc. | Yes           | Specify the domain code. Refer to the Supporting Domain section for valid domain ID.                                                                                                                                                                                                                                                                 |
| **src_lang**   | Indicates the language in which the audio is spoken                                                                  | Yes           | Specify the language code. Refer to the Language Code section for valid language codes.                                                                                                                                                                                                                                                              |
| **format**     | Indicates the supporting format of the audio file                                                                    | No            | Mention the audio sample rate and file format of the uploaded file. By default: `16k_int16` (WAV, Signed 16-bit, 16,000 Hz).                                                                                                                                                                                                                         |
| **logging**    | Indicates the type of logging of data                                                                                | No            | Default value: `true`. Possible values: <br> `true` - Stores client’s audio and keeps transcript in logs. <br> `no_audio` - Does not store client’s audio but keeps transcript in logs. <br> `no_transcript` - Does not keep transcript in logs but stores client’s audio. <br> `false` - Does not keep either client’s audio or transcript in logs. |
| **punctuate**  | Indicates whether capitalization and punctuation are needed in the transcript                                        | No            |

## Supported Audio Formats

| Audio Format   | Description                                                                                |
| -------------- | ------------------------------------------------------------------------------------------ |
| **wav**        | The default audio format. Any bit depth (Pulse-code Modulation), any sample rate.          |
| **mp3**        | Compressed audio file in .mp3 format.                                                      |
| **flac**       | Free Lossless Audio Codec format.                                                          |
| **ogg_opus**   | Compressed audio format for mid to high quality (8kHz-48.0kHz, 16+ bit, polyphonic) audio. |
| **ogg_vorbis** | Format that is used for internet streaming.                                                |

## Supported Languages

| Language       | Code |
| -------------- | ---- |
| Hindi          | `hi` |
| Bengali        | `bn` |
| Gujarati       | `gu` |
| Kannada        | `kn` |
| Malayalam      | `ml` |
| Marathi        | `mr` |
| Punjabi        | `pa` |
| Tamil          | `ta` |
| Telugu         | `te` |
| Indian English | `en` |
| Assamese       | `as` |
| Odia           | `or` |

## Supporting Domains

| Domain Name      | Description                                                                                                                      |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **generic**      | The model is trained on transcribing audio files irrespective of industry type.                                                  |
| **bfsi**         | The BFSI model is specially trained to accurately transcribe the audio files related to the banking and financial terminologies. |
| **ecomm**        | Model optimized for e-commerce-related transcriptions.                                                                           |
| **voice-search** | Model trained for voice search queries.                                                                                          |
| **alphanumeric** | Model trained to recognize alphanumeric data.                                                                                    |
| **names**        | Model specialized in recognizing names.                                                                                          |
| **address**      | Model trained for address-related transcriptions.                                                                                |
| **language**     | Model optimized for multilingual support.                                                                                        |
| **yes-no**       | Model specifically for yes/no type responses.                                                                                    |
