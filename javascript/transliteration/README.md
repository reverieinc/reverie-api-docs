# Transliteration API

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
   - Select the Source and Target Language from the dropdowns
   - Enter your text in the provided text box.
   - Click **Transliterate** to process the text.
   - Results will be displayed in output box
   - Click **Reset** to clear the input.

## Supported Languages

- Hindi (`hi`)
- English (`en`)
- Bengali (`bn`)
- Gujarati (`gu`)
- Kannada (`kn`)
- Malayalam (`ml`)
- Marathi (`mr`)
- Odia (`or`)
- Punjabi (`pa`)
- Tamil (`ta`)
- Telugu (`te`)
- Assamese (`as`)
- Maithili (`mai`)
- Konkani (`kok`)
- Nepali (`ne`)
- Urdu (`ur`)
- Sindhi (`sd`)
- Dogri (`doi`)
- Bodo (`brx`)
- Kashmiri (`ks`)
- Manipuri (`mni`)
- Sanskrit (`sa`)
- Santhali (`sat`)

## Supported Domains

| Domain Name     | Description                                                                                        |
| --------------- | -------------------------------------------------------------------------------------------------- |
| `generic`       | Transliterate generic content                                                                      |
| `pii_names`     | Transliterate people’s names and surnames                                                          |
| `pii_addresses` | Transliterate location details like street name, city name, state, etc.                            |
| `OnlyEnglish`   | Transliterate source content from English script to Indic language script                          |
| `bfsi`          | Transliterate banking and financial terminologies accurately                                       |
| `ecommerce`     | Transliterate brand & product catalog in the eCommerce domain                                      |
| `food`          | Transliterate food and grocery items like restaurant menus, grocery essentials, etc.               |
| `infotainment`  | Transliterate song lyrics, song titles, movie titles, artist names, and more media-related content |
| `medical`       | Transliterate healthcare-related terms (available only for Hindi)                                  |
| `enterprise`    | Transliterate job titles, company names, etc.                                                      |

## API Request Parameters

| Parameter                | Type             | Mandatory? | Description                                                                      |
| ------------------------ | ---------------- | ---------- | -------------------------------------------------------------------------------- |
| `data`                   | array of content | Yes        | List of input text for transliteration                                           |
| `isBulk`                 | boolean          | No         | Whether to process multiple texts at once (default: `true`)                      |
| `noOfSuggestions`        | integer          | No         | Number of transliteration suggestions to return (default: `1`)                   |
| `abbreviate`             | boolean          | No         | Validate and accurately transliterate abbreviations (default: `true`)            |
| `convertNumber`          | string           | No         | Convert numbers to target script (`local`, `words`, `roman`)                     |
| `ignoreTaggedEntities`   | boolean          | No         | Retain entities like email IDs and URLs in the original script (default: `true`) |
| `convertOrdinal`         | boolean          | No         | Convert ordinal values to English numbers (default: `false`)                     |
| `abbreviationWithoutDot` | boolean          | No         | Output abbreviations without dots (default: `false`)                             |
