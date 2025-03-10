# Localization API

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
   - Select the Source and Target Language from the dropdowns
   - Enter your text in the provided text box.
   - Click **Translate** to process the text.
   - Results will be displayed in output box
   - Click **Reset** to clear the input.

## **Supported Languages**

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

## **Supported Domains**

| Domain ID | Domain Name | Description                                  |
| --------- | ----------- | -------------------------------------------- |
| 1         | General     | Default domain for any content.              |
| 2         | Travel      | Optimized for travel industry terminologies. |
| 3         | Ecommerce   | Localizes content for the ecommerce domain.  |
| 4         | Music       | Focused on media & entertainment domain.     |
| 5         | Banking     | Accurate localization of BFSI content.       |
| 6         | Grocery     | Tailored for grocery industry content.       |
| 7         | Education   | Optimized for academic content.              |
| 8         | Medical     | Designed for healthcare industry content.    |

## **API Parameters**

| Parameter             | Type    | Required | Description                                                                    |
| --------------------- | ------- | -------- | ------------------------------------------------------------------------------ |
| enableNmt             | boolean | No       | Uses NMT technology if true; defaults to false.                                |
| enableTransliteration | boolean | No       | Uses transliteration if true; defaults to true.                                |
| enableLookup          | boolean | No       | Refers to Lookup DB if true; defaults to false.                                |
| debugMode             | boolean | No       | Provides log details for debugging; defaults to false.                         |
| nmtMask               | boolean | No       | Masks non-dictionary words if true; requires src_lang = en. Defaults to false. |
| nmtMaskTerms          | array   | No       | Specifies words to be masked, automatically setting nmtMask to true.           |

### **Example: Masking a term**

```json
"nmtMaskTerms": ["Reverie Language Technologies"]
```

The API will mask and transliterate "Reverie Language Technologies" in localized content if found in the source content.

---

This documentation provides an overview of the Localization API features, supported languages, domains, and key parameters for accurate content localization.
