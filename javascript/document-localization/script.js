import ReverieClient from "@reverieit/reverie-client";

document.addEventListener('DOMContentLoaded', function () {
    const dropArea = document.getElementById('dropArea');
    const fileInput = document.getElementById('fileInput');
    const fileInfo = document.getElementById('fileInfo');
    const fileName = document.getElementById('fileName');
    const translateBtn = document.getElementById('translateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const resetBtn = document.getElementById('resetBtn');
    const statusMessage = document.getElementById('statusMessage');
    const sourceLanguageSelect = document.getElementById('sourceLanguage');
    const targetLanguageSelect = document.getElementById('targetLanguage');

    const reverieClient = new ReverieClient({
        apiKey: "<YOUR-API-KEY>",
        appId: "<YOUR-APP-ID>",
    });



    let uploadedFile = null;
    let docId = null;

    const languages = [
        { key: "english", label: "English" },
        { key: "hindi", label: "Hindi (हिन्दी)" },
        { key: "assamese", label: "Assamese (অসমীয়া)" },
        { key: "bengali", label: "Bangla (বাংলা)" },
        { key: "gujarati", label: "Gujarati (ગુજરાતી)" },
        { key: "kannada", label: "Kannada (ಕನ್ನಡ)" },
        { key: "malayalam", label: "Malayalam (മലയാളം)" },
        { key: "marathi", label: "Marathi (मराठी)" },
        { key: "odia", label: "Odia (ଓଡ଼ିଆ)" },
        { key: "punjabi", label: "Punjabi (ਪੰਜਾਬੀ)" },
        { key: "tamil", label: "Tamil (தமிழ்)" },
        { key: "telugu", label: "Telugu (తెలుగు)" }
    ];

    function populateDropdown(selectElement, options) {
        selectElement.innerHTML = "";
        options.forEach(option => {
            const opt = document.createElement("option");
            opt.value = option.key;
            opt.textContent = option.label;
            selectElement.appendChild(opt);
        });
    }

    function updateTargetLanguages() {
        const selectedSource = sourceLanguageSelect.value;
        let filteredTargets = [];

        if (selectedSource === "english") {
            filteredTargets = languages.filter(lang => lang.key !== "english");
        } else if (selectedSource === "hindi" || selectedSource === "kannada") {
            filteredTargets = languages.filter(lang => ["english", "kannada", "hindi"].includes(lang.key) && lang.key !== selectedSource);
        } else {
            filteredTargets = languages.filter(lang => lang.key === "english");
        }

        populateDropdown(targetLanguageSelect, filteredTargets);
    }

    populateDropdown(sourceLanguageSelect, languages);
    updateTargetLanguages();

    fileInput.addEventListener('change', function () {
        if (this.files.length > 0) {
            handleFile(this.files[0]);
        }
    });

    dropArea.addEventListener('dragover', function (e) {
        e.preventDefault();
        this.classList.add('active');
    });

    dropArea.addEventListener('dragleave', function () {
        this.classList.remove('active');
    });

    dropArea.addEventListener('drop', function (e) {
        e.preventDefault();
        this.classList.remove('active');
        if (e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
        }
    });

    function handleFile(file) {
        uploadedFile = file;
        fileInfo.classList.add('visible');
        fileName.textContent = file.name;
        statusMessage.textContent = 'File ready for translation';
    }

    translateBtn.addEventListener("click", async function () {
        if (!uploadedFile) {
            statusMessage.textContent = "Please upload a file first";
            return;
        }

        const selectedSource = sourceLanguageSelect.value;
        console.log("hello", selectedSource);

        const selectedTarget = targetLanguageSelect.value;
        statusMessage.textContent = "Translating document...";

        try {
            const response = await reverieClient.translateDocument({
                sourceLanguage: selectedSource,
                targetLanguage: selectedTarget,
                uploadedFile: uploadedFile,
            });

            console.log("Translation API Response:", response);
            statusMessage.textContent = "Translation request sent!";
        } catch (error) {
            console.error("Translation Error:", error);
            statusMessage.textContent = "Error in translation process";
        }
    });


    async function checkStatus(docId) {
        try {
            const translationComplete = await reverieClient.checkStatus(docId);
            if (translationComplete) {
                statusMessage.textContent = 'Translation complete!';
                downloadBtn.classList.add('visible');
                downloadBtn.setAttribute('data-doc-id', docId);
                downloadBtn.setAttribute('data-target-language', targetLanguage);
            } else {
                setTimeout(() => checkStatus(docId), 2000);
            }
        } catch (error) {
            statusMessage.textContent = 'Error checking translation status';
        }
    }

    downloadBtn.addEventListener('click', async function () {
        const docId = downloadBtn.getAttribute('data-doc-id');
        const targetLanguage = downloadBtn.getAttribute('data-target-language');
        if (!docId || !targetLanguage) return;

        try {
            const translatedFileURL = await reverieClient.downloadTranslatedFile(docId, targetLanguage);
            if (translatedFileURL) {
                window.open(translatedFileURL, '_blank');
            }
        } catch (error) {
            statusMessage.textContent = 'Error downloading translation';
        }
    });

    resetBtn.addEventListener('click', function () {
        uploadedFile = null;
        docId = null;
        fileInput.value = '';
        fileInfo.classList.remove('visible');
        fileName.textContent = 'No file selected';
        downloadBtn.classList.remove('visible');
        statusMessage.textContent = '';
        populateDropdown(sourceLanguageSelect, languages);
        updateTargetLanguages();
    });

    sourceLanguageSelect.addEventListener('change', updateTargetLanguages);
});
