# Text to Speech API

## Steps to Run the Application

### Prerequisites:

- **VS Code** installed
- **Node.js** installed (for Webpack-based setup)

### Running the Application:

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

4. **Using the Application**
   - Select the Language and Speaker from the dropdowns
   - Enter your text in the provided text box.
   - Click **Generate** to process the text.
   - Results will be displayed in the audio player

## Supported Domains

| Language       | Code | Male Speakers                            | Female Speakers                     |
| -------------- | ---- | ---------------------------------------- | ----------------------------------- | --- |
| Hindi          | hi   | hi_male, hi_male_2, hi_male_3, hi_male_4 | hi_female, hi_female_2, hi_female_3 |
| Bengali        | bn   | bn_male, bn_male_2                       | bn_female, bn_female_2              |
| Kannada        | kn   | kn_male, kn_male_2                       | kn_female, kn_female_2              |
| Malayalam      | ml   | ml_male                                  | ml_female                           |
| Tamil          | ta   | ta_male                                  | ta_female                           |
| Telugu         | te   | te_male, te_male_2                       | te_female, te_female_2              |
| Gujarati       | gu   | gu_male                                  | gu_female                           |
| Odia           | or   | or_male                                  | or_female                           |
| Assamese       | as   | as_male                                  | as_female                           |
| Marathi        | mr   | mr_male, mr_male_2, mr_male_3            | mr_female, mr_female_2, mr_female_3 |
| Punjabi        | pa   | pa_male                                  | pa_female                           |
| Indian English | en   | en_male, en_male_2                       | en_female, en_female_2              |     |

## API Request Parameters

| Element              | Type            | Mandatory? | Description                                                                                                          |
| -------------------- | --------------- | ---------- | -------------------------------------------------------------------------------------------------------------------- |
| **text** or **ssml** | string / array  | Yes        | The plain text or SSML input to synthesize an audio output. If following W3 standards, use `ssml` instead of `text`. |
| **speed**            | float (seconds) | No         | Speech rate of the audio file. Values: **0.5** (slowest) to **1.5** (fastest). Default: **1 (normal speed)**.        |
| **pitch**            | float (seconds) | No         | Speaking pitch. Values: **-3 to 3**. `3` increases by 3 semitones, `-3` decreases by 3 semitones. Default: **0**.    |
| **sample_rate**      | integer         | No         | Sampling rate in Hz. Default: **22050 Hz (22.05 kHz)**. Refer to supported sample rates.                             |
| **format**           | string          | No         | Audio format of the synthesized speech. Default: **WAV**. Refer to supported formats.                                |
