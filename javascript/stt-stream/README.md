# Speech-to-Text (Streaming) API

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

## Dependencies

- `express` (for serving static files and handling requests)

## Query Parameters

| Parameter    | Type   | Mandatory? | Description                                                                                                                  |
| ------------ | ------ | ---------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `apikey`     | string | Yes        | A unique key/token provided by Reverie to identify the user using the STT API.                                               |
| `appid`      | string | Yes        | A unique account ID to identify the user and the default account settings.                                                   |
| `appname`    | string | Yes        | The parameter to identify the API. The allowed value is `stt_stream`.                                                        |
| `src_lang`   | string | Yes        | The language in which the audio is spoken. Specify the ISO language code. Example: "hi".                                     |
| `domain`     | string | Yes        | The domain in which the Streaming STT API is used. Specify the domain ID.                                                    |
| `timeout`    | float  | No         | Duration to keep a connection open between the application and the STT server. Default is 15 seconds, max is 180 seconds.    |
| `silence`    | float  | No         | Time to determine when to end the connection after detecting silence. Default is 1 second, max is 30 seconds.                |
| `format`     | string | No         | The audio sampling rate and data format. Default is `16k_int16`.                                                             |
| `logging`    | string | No         | Controls logging of audio and transcripts. Possible values: `true`, `no_audio`, `no_transcript`, `false`. Default is `true`. |
| `punctuate`  | string | No         | Enables punctuation and capitalization. Values: `true`, `false`. Default is `true`. Supported languages: `en`, `hi`.         |
| `continuous` | string | No         | Enables continuous decoding after silence detection. Values: `true/1`, `false/0`. Default is `false/0`.                      |

## Supporting Audio Formats

| Audio Format | Description                              |
| ------------ | ---------------------------------------- |
| `16k_int16`  | Default format: Signed 16-bit, 16KHz WAV |
| `16k_uint8`  | Unsigned 8-bit, 16KHz WAV                |
| `8k_int16`   | Signed 16-bit, 8KHz WAV                  |
| `8k_uint8`   | Unsigned 8-bit, 8KHz WAV                 |
| `opus_16k`   | Opus encoded audio, 16KHz                |
| `opus_8k`    | Opus encoded audio, 8KHz                 |
| `ogg_opus`   | Opus encoded audio in Ogg container      |
| `16k_ulaw`   | µ-Law audio, 16KHz                       |
| `8k_ulaw`    | µ-Law audio, 8KHz                        |

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

| Domain Name    | Description                          |
| -------------- | ------------------------------------ |
| `generic`      | General-purpose transcription        |
| `bfsi`         | Banking & Financial terminologies    |
| `ecomm`        | E-commerce/FMCG terminologies        |
| `healthcare`   | Healthcare/Medical terminologies     |
| `voice-search` | Voice commands with smart formatting |
| `alphanumeric` | Alphanumeric data transcription      |
| `names`        | Person name transcription            |
| `address`      | Address transcription                |
| `language`     | Language variants transcription      |
| `yes-no`       | Yes/No variants transcription        |
| `email`        | Email ID transcription               |
