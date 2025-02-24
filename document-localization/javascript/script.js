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

    translateBtn.addEventListener('click', async function () {
        if (!uploadedFile) {
            statusMessage.textContent = 'Please upload a file first';
            return;
        }

        const selectedSource = languages.find(lang => lang.key === sourceLanguageSelect.value);
        const selectedTarget = languages.find(lang => lang.key === targetLanguageSelect.value);

        const formData = new FormData();
        formData.append('sourceLanguage', selectedSource ? selectedSource.key : 'english');
        formData.append('targetLanguage', selectedTarget ? selectedTarget.key : 'hindi');
        formData.append('projectFiles', uploadedFile);

        statusMessage.textContent = 'Translating document...';

        try {
            const response = await fetch('https://revapi.reverieinc.com/translate_doc_import', {
                method: 'POST',
                headers: {
                    'REV-APP-ID': '<YOUR-APP-ID>',
                    'REV-APPNAME': 'nmt',
                    'REV-API-KEY': '<YOUR-API-KEY>'
                },
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                docId = data.projectId;
                checkStatus(docId);
            } else {
                statusMessage.textContent = 'Error in translation process';
            }
        } catch (error) {
            statusMessage.textContent = 'Translation failed';
        }
    });

    async function checkStatus(docId) {
        try {
            const statusResponse = await fetch(`https://revapi.reverieinc.com/translate_doc_status?doc_id=${docId}`, {
                headers: {
                    'REV-APP-ID': '<YOUR-APP-ID>',
                    'REV-APPNAME': 'nmt',
                    'REV-API-KEY': '<YOUR-API-KEY>'
                }
            });
            const statusData = await statusResponse.json();

            if (statusData.success && statusData.message === "completed") {
                statusMessage.textContent = 'Translation complete!';
                downloadBtn.classList.add('visible');
            } else {
                setTimeout(() => checkStatus(docId), 2000);
            }
        } catch (error) {
            statusMessage.textContent = 'Error checking status';
        }
    }

    downloadBtn.addEventListener('click', async function () {
        if (!docId) return;

        const selectedTarget = languages.find(lang => lang.key === targetLanguageSelect.value);
        const requestBody = { unitId: docId, targetLanguages: [selectedTarget.key] };

        try {
            const response = await fetch('https://revapi.reverieinc.com/translate_doc_export', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'REV-APP-ID': '<YOUR-APP-ID>',
                    'REV-APPNAME': 'nmt',
                    'REV-API-KEY': '<YOUR-API-KEY>'
                },
                body: JSON.stringify(requestBody)
            });

            const responseData = await response.json();
            if (responseData.success) {
                Object.values(responseData.data.targetURLS).forEach(languages => {
                    Object.values(languages).forEach(fileURL => {
                        window.open(fileURL, '_blank');
                    });
                });
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
