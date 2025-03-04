# Reverie Client

Reverie Client is an SDK for interacting with Reverie Language Technologies' APIs for speech-to-text, text translation, language identification, and more.

## Installation

Install the package via npm:

```sh
npm i reverie-client
```

## Getting Started

### Step 1: Obtain API Key

Go to [revup.reverieinc.com](https://revup.reverieinc.com) and create your first API key.

### Step 2: Initialize Reverie Client

Import and initialize `ReverieClient` with your API key and app ID:

```javascript
const ReverieClient = require('reverie-client');

const reverieClient = new ReverieClient({
    apiKey: "YOUR-API-KEY",
    appId: "YOUR-APP-ID"
});
```

### Step 3: Include STT SDK (If Using Speech-to-Text Streaming)

If you are using STT stream, add the following script to the head section of your `index.html`:

```html
<script src="https://cdn.jsdelivr.net/npm/reverie-stt-sdk/dist/bundle.js"></script>
```

## Features

### 1. Transliterate Text

```javascript
const result = await reverieClient.transliterate({
    text: "Namaste",
    src_lang: "en",
    tgt_lang: "ta"
});
```

**Parameters:**
- `text` (string, required): The text to be transliterated.
- `src_lang` (string, required): The source language code (e.g., "hi").
- `tgt_lang` (string, required): The target language code (e.g., "ta").

### 2. Analyze Text

```javascript
const analysis = await reverieClient.analyze_text({
    text: "Aap kaise hain?",
    src_lang: "hi"
});
```

**Parameters:**
- `text` (string, required): The text to analyze.
- `src_lang` (string, required): The source language code.
- `tgt_lang` (string, optional): The target language code for translation.
- `translation_domain` (string, optional): The domain of translation (e.g., "generic").
- `moderation_types` (array, optional): Types of content moderation to apply (e.g., `["hate_speech", "profanity"]`).

### 3. Identify Language

```javascript
const language = await reverieClient.identify_language_by_text({
    text: "Vanakkam"
});
```

**Parameters:**
- `text` (string, required): The text whose language needs to be identified.

### 4. Translate Text

```javascript
const translation = await reverieClient.translate({
    text: "Namaste",
    src_lang: "hi",
    tgt_lang: "ta"
});
```

**Parameters:**
- `text` (string, required): The text to translate.
- `src_lang` (string, required): The source language code.
- `tgt_lang` (string, required): The target language code.
- `domain` (string, optional): The translation domain (default is "generic").

### 5. Speech-to-Text (Batch Processing)

```javascript
const sttResult = await reverieClient.stt_batch({
    audioFile: myAudioFile,
    src_lang: "hi"
});
```

**Parameters:**
- `audioFile` (File, required): The audio file to be transcribed.
- `src_lang` (string, required): The language code of the speech.
- `domain` (string, optional): The domain of speech recognition (default is "generic").

### 6. Text-to-Speech

```javascript
const audioBlob = await reverieClient.text_to_speech({
    text: "Namaste Duniya!",
    speaker: "default",
    speed: 1.0,
    pitch: 1.0
});
```

**Parameters:**
- `text` (string, required): The text to convert into speech.
- `speaker` (string, required): The speaker voice to use.
- `speed` (number, optional): The speech speed (default is 1.0).
- `pitch` (number, optional): The pitch of the speech (default is 1.0).
- `format` (string, optional): The output format (default is "WAV").

### 7. Initialize Speech-to-Text Streaming

```javascript
await reverieClient.init_stt({
    src_lang: "hi",
    callback: (event) => {
        // Handle STT event
    }
});
```

**Parameters:**
- `src_lang` (string, required): The language code for speech recognition.
- `callback` (function, required): The function to handle STT events.
- `element` (DOM element, optional): The element to insert transcribed text.
- `domain` (string, optional): The domain of speech recognition.
- `silence` (number, optional): The silence detection threshold.
- `continuous` (boolean, optional): Whether the STT should continue after detecting silence.
- `logging` (boolean, optional): Whether to enable logging.
- `timeout` (number, optional): Timeout duration in seconds.

### 8. Start/Stop STT Streaming

```javascript
await reverieClient.start_stt();
await reverieClient.stop_stt();
```

**No parameters required.**

## License

MIT License

Copyright (c) 2025 Reverie Language Technologies

