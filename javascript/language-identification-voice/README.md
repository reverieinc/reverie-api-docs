# Identify Language by Voice API

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

- Upload the Audio File.
- View the detected language of the audio file.

## API Parameters

| Element      | Type | Description                                                                                                            |
| ------------ | ---- | ---------------------------------------------------------------------------------------------------------------------- |
| `audio_file` | File | Local audio file’s path to obtain the transcript. **Note:** Audio file length should be **≤ 120 seconds (2 minutes).** |

## Language Code

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
