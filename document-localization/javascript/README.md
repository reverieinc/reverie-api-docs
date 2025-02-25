# Document Localization API

## Steps to Run the Application with Live Server

### Prerequisites:

- **VS Code** installed
- **Live Server** extension installed in VS Code

### Running the Application:

1. **Open the Project in VS Code**

   - Open VS Code
   - Click **File** > **Open Folder** and select the project directory

2. **Start Live Server**

   - Open `index.html` in VS Code
   - Right-click anywhere in the file and select **"Open with Live Server"**
   - OR click the **Go Live** button in the VS Code status bar

3. **Access the Application**

   - The application will open in your default browser
   - If not, manually open `http://127.0.0.1:5500/` in your browser

4. **Using the Application**
   - Upload a document using **"Browse Files"** or drag and drop
   - Select the source and target languages
   - Click **"Translate Document"** to process
   - Download the translated document using **"Download Translation"**
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
