let finalResult = '';
let partialResult = '';
let auxHtml = '';
let auxHtml2 = '';
let isListening = false;
const transcriptElement = document.getElementById('transcript');
const toggleBtn = document.getElementById('toggleBtn');
const languageSelect = document.getElementById('language');
const resetBtn = document.getElementById('resetBtn');
const languages = [
    { key: "en", label: "English" },
    { key: "hi", label: "Hindi (हिन्दी)" },
    { key: "as", label: "Assamese (অসমীয়া)" },
    { key: "bn", label: "Bangla (বাংলা)" },
    { key: "gu", label: "Gujarati (ગુજરાતી)" },
    { key: "kn", label: "Kannada (ಕನ್ನಡ)" },
    { key: "ml", label: "Malayalam (മലയാളം)" },
    { key: "mr", label: "Marathi (मराठी)" },
    { key: "or", label: "Odia (ଓଡ଼ିଆ)" },
    { key: "pa", label: "Punjabi (ਪੰਜਾਬੀ)" },
    { key: "ta", label: "Tamil (தமிழ்)" },
    { key: "te", label: "Telugu (తెలుగు)" }
];

languages.forEach(lang => {
    const option = document.createElement("option");
    option.value = lang.key;
    option.textContent = lang.label;
    languageSelect.appendChild(option);
});

const sttInitialization = async () => {
    const srcLangKey = languageSelect.value;

    try {
        await window.stt_stream.initSTT({
            apikey: '<YOUR-API-KEY>',
            appId: '<YOUR-APP-ID>',
            language: srcLangKey,
            domain: 'generic',
            silence: 1,
            continuous: 1,
            logging: true,
            timeout: 180,
            eventHandler: voiceText,
            errorHandler: (error) => console.error('Error:', error),
        });
        console.log('STT Streaming initialized successfully');
    } catch (error) {
        console.error('STT Initialization failed:', error);
    }
};

const voiceText = (event) => {
    let text = event.data;
    if (event.event === "FINAL_RESULT") {
        finalResult = text;
        partialResult = "";
        auxHtml = auxHtml2 + " " + finalResult; // Reset auxHtml instead of appending
        updateTranscript();
    } else if (event.event === "PARTIAL_RESULTS") {
        if (["es-ES", "fr-FR", "ar-SA"].includes(languageSelect.value)) {
            transcriptElement.value = text;
        }
        partialResult = text;
        updateTranscript();
    }
};

const updateTranscript = () => {
    if (partialResult !== "") {
        transcriptElement.value = auxHtml2 + " " + partialResult;
    } else if (finalResult !== "") {
        transcriptElement.value = auxHtml;
        auxHtml2 = auxHtml;
    }
};


const toggleRecognition = async () => {
    if (isListening) {
        window.stt_stream.stopSTT();
        isListening = false;
        toggleBtn.textContent = "Start Speaking";
    } else {
        await sttInitialization();
        window.stt_stream.startSTT();
        isListening = true;
        toggleBtn.textContent = "Stop Speaking";
    }
};

toggleBtn.addEventListener('click', toggleRecognition);
languageSelect.addEventListener('change', async () => {
    if (isListening) {
        window.stt_stream.stopSTT();
        await sttInitialization();
        window.stt_stream.startSTT();
    }
});

resetBtn.addEventListener('click', () => {
    if (isListening) {
        window.stt_stream.stopSTT();
        isListening = false;
        toggleBtn.textContent = "Start Speaking";
    }

    finalResult = "";
    partialResult = "";
    auxHtml = "";
    auxHtml2 = "";

    transcriptElement.value = "";
});
