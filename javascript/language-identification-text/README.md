# Identify Language by Text API

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

- Enter the Text.
- View the detected language of the input text.

## API Parameters

| Parameter | Type   | Required | Description                                      |
| --------- | ------ | -------- | ------------------------------------------------ |
| `text`    | String | Yes      | The input text to process (Max: 512 characters). |

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
