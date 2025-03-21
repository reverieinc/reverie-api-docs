# Document Localization API

## Steps to Run the Application

### Prerequisites:

- **VS Code** installed

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
   - Upload a document using **"Browse Files"** or drag and drop
   - Select the source and target languages
   - Click **"Translate Document"** to process
   - Translated File will be downloaded automatically
   - Click **"Reset"** to clear the form

## Supported File Extensions

| Extension                                                                                                                                                          | Maximum File Size |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| `.docx`, `.pptx`, `.xlsx`, `.pdf`, `.odt`, `.ott`, `.ods`, `.ots`, `.odp`, `.otp`                                                                                  | 10 MB             |
| `.html`, `.htm`, `.xhtml`, `.ttx`, `.mif`, `.idml`, `.icml`, `.dita`, `.tsv`, `.xml`, `.dtd`, `.json`, `.yaml`, `.properties`, `.resx`, `.strings`, `.srt`, `.wix` | 5 MB              |
| `.txt`, `.csv`                                                                                                                                                     | 1 MB              |

**Maximum Word Count:** 10,000 words

## Supported Languages

- Assamese (`as`)
- Bengali (`bn`)
- Gujarati (`gu`)
- Hindi (`hi`)
- Kannada (`kn`)
- Malayalam (`ml`)
- Marathi (`mr`)
- Odia (`or`)
- Punjabi (`pa`)
- Tamil (`ta`)
- Telugu (`te`)
- English (`en`)

## Supported Translation Pairs

| Source Language  | Target Language                                                                                                                                                                                                                                                                                                                                            |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Assamese (`as`)  | English (`en`)                                                                                                                                                                                                                                                                                                                                             |
| Bengali (`bn`)   | English (`en`)                                                                                                                                                                                                                                                                                                                                             |
| English (`en`)   | Assamese (`as`), Bengali (`bn`), Bodo (`brx`), Dogri (`doi`), Gujarati (`gu`), Hindi (`hi`), Kannada (`kn`), Konkani (`kok`), Kashmiri (`ks`), Maithili (`mai`), Malayalam (`ml`), Manipuri (`mni`), Marathi (`mr`), Nepali (`ne`), Odia (`or`), Punjabi (`pa`), Sanskrit (`sa`), Santali (`sat`), Sindhi (`sd`), Tamil (`ta`), Telugu (`te`), Urdu (`ur`) |
| Gujarati (`gu`)  | English (`en`)                                                                                                                                                                                                                                                                                                                                             |
| Hindi (`hi`)     | English (`en`), Kannada (`kn`)                                                                                                                                                                                                                                                                                                                             |
| Kannada (`kn`)   | English (`en`), Hindi (`hi`)                                                                                                                                                                                                                                                                                                                               |
| Malayalam (`ml`) | English (`en`)                                                                                                                                                                                                                                                                                                                                             |
| Marathi (`mr`)   | English (`en`)                                                                                                                                                                                                                                                                                                                                             |
| Odia (`or`)      | English (`en`)                                                                                                                                                                                                                                                                                                                                             |
| Punjabi (`pa`)   | English (`en`)                                                                                                                                                                                                                                                                                                                                             |
| Tamil (`ta`)     | English (`en`)                                                                                                                                                                                                                                                                                                                                             |
| Telugu (`te`)    | English (`en`)                                                                                                                                                                                                                                                                                                                                             |
