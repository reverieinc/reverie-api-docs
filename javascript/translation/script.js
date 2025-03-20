import ReverieClient from "reverie-client";

document.addEventListener('DOMContentLoaded', function () {
    const translateBtn = document.getElementById('translateBtn');
    const sourceLang = document.getElementById('sourceLang'); //Source Language
    const targetLang = document.getElementById('targetLang'); //Target Language
    const sourceText = document.getElementById('sourceText'); //Source Text
    const targetText = document.getElementById('targetText'); //Target Text
    const domainSelect = document.getElementById('domain'); //Domain 
    const resetBtn = document.getElementById('resetBtn');

    const reverieClient = new ReverieClient({
        apiKey: "<YOUR-API-KEY>",
        appId: "<YOUR-APP-ID>"
    });

    let inputToolKey = 'phonetic';

    resetBtn.addEventListener('click', function () {
        sourceText.value = "";
        targetText.value = "";
    });

    //Available Languages
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
        { key: "te", label: "Telugu (తెలుగు)" },
    ];

    //Available Domains
    const domainOptions = [
        { key: "1", label: "Default" },
        { key: "2", label: "Travel" },
        { key: "3", label: "Ecommerce" },
        { key: "4", label: "Music" },
        { key: "5", label: "Banking" },
        { key: "6", label: "Grocery" },
        { key: "7", label: "Education" },
        { key: "8", label: "Medical" }
    ];

    let supportedPairs = [];

    // This function fetches the supported language pairs from a JSON file.
    // Since we do not support all cross-language translations, 
    // we retrieve only the supported pairs from 'supportedLanguages.json'.
    async function fetchSupportedLanguages() {
        try {
            const response = await fetch('supportedLanguages.json');
            const data = await response.json();
            if (data["0"]) {
                supportedPairs = data["0"];
            }
        } catch (error) {
            console.error("Error loading supported languages from JSON:", error);
        }
    }


    function populateSourceLanguages() {
        sourceLang.innerHTML = languages.map(lang => `<option value="${lang.key}">${lang.label}</option>`).join("");
    }

    function populateDomains() {
        domainSelect.innerHTML = domainOptions.map(domain => `<option value="${domain.key}">${domain.label}</option>`).join("");
    }

    // This function updates the target language dropdown based on the selected source language.
    // It filters out only the supported translation pairs from 'supportedPairs' and avoids self-translation.
    function updateTargetLanguages() {
        const selectedSourceLang = sourceLang.value;
        targetLang.innerHTML = languages
            .filter(lang => supportedPairs.includes(`${selectedSourceLang}-${lang.key}`) && selectedSourceLang !== lang.key)
            .map(lang => `<option value="${lang.key}">${lang.label}</option>`)
            .join("");
    }

    async function initialize() {
        await fetchSupportedLanguages();
        populateSourceLanguages();
        updateTargetLanguages();
    }


    async function handleTranslation() {
        if (!sourceText.value.trim()) {
            alert('Please enter text to translate');
            return;
        }

        const srcLang = sourceLang.value;
        const tgtLang = targetLang.value;
        const domainValue = domainSelect.value;
        translateBtn.disabled = true;
        translateBtn.textContent = 'Translating...';
        targetText.value = 'Translating...';
        const url = 'https://revapi.reverieinc.com/';

        try {
            const result = await reverieClient.translate({
                text: sourceText.value,
                src_lang: srcLang,
                tgt_lang: tgtLang,
                domain: 'generic'
            });
            if (result) {
                targetText.value = result;
            } else {
                targetText.value = "Error: No response received";
            }
        } catch (error) {
            console.error("Error:", error);
            targetText.value = "Error: Failed to transliterate";
        }
        translateBtn.disabled = false;
        translateBtn.textContent = 'Translate';
    }

    //Swalekh is used for Phonetic Suggestions when you type in language other than English
    const enableSwalekh = (querySelector, sourceLanguage, inputToolKey, domain = '1') => {
        let creds = {
            lang: sourceLanguage,
            mode: inputToolKey,
            apiKey: reverieClient.apiKey,
            appId: reverieClient.appId,
            querySel: querySelector,
            domain: domain,
        };
        if (window?.loadSwalekh) {
            window.loadSwalekh(creds);
        }
    };

    const disableSwalekh = (querySelector) => {
        if (window?.unloadSwalekh) {
            window.unloadSwalekh({ querySel: querySelector });
        }
    };

    sourceLang.addEventListener('change', function () {
        let selectedLang = sourceLang.value;
        updateTargetLanguages();
    });

    translateBtn.addEventListener('click', handleTranslation);

    initialize();
    populateDomains();
});
