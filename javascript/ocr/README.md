# OCR API

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

- Upload PDF or image files for OCR processing.
- Select from multiple language options.
- Choose between **Layout OCR** (for PDFs) and **Only OCR** (for both PDFs and images).
- View the extracted text or download the processed document.

## API Parameters

| Parameter   | Type   | Required | Description                                               |
| ----------- | ------ | -------- | --------------------------------------------------------- |
| `file`      | File   | Yes      | The PDF or image file to process                          |
| `file_type` | String | Yes      | Type of file (`pdf` or `img`)                             |
| `languages` | String | Yes      | Comma-separated list of language codes (e.g., `en,hi,ta`) |
| `ocr_type`  | String | Yes      | Type of OCR processing (`layout_ocr` or `only_ocr`)       |

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
