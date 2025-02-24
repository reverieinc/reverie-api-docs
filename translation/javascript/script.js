document.addEventListener('DOMContentLoaded', function () {
    const translateBtn = document.getElementById('translateBtn');
    const sourceLang = document.getElementById('sourceLang'); //Source Language
    const targetLang = document.getElementById('targetLang'); //Target Language
    const sourceText = document.getElementById('sourceText'); //Source Text
    const targetText = document.getElementById('targetText'); //Target Text
    const domainSelect = document.getElementById('domain'); //Domain 
    const resetBtn = document.getElementById('resetBtn');

    let apiKey = '<YOUR-API-KEY>'; //Your API Key
    let appId = '<YOUR-APP-ID>'; //Your APP ID
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

        const headers = {
            'Content-Type': 'application/json',
            'REV-API-KEY': apiKey,
            'REV-APP-ID': appId,
            'src_lang': srcLang,
            'tgt_lang': tgtLang,
            'domain': 'generic',
            'REV-APPNAME': 'localization',
            'REV-APPVERSION': '3.0'
        };

        const data = {
            "data": [sourceText.value],
            "nmtMask": true,
            "nmtMaskTerms": {},
            "enableNmt": true,
            "enableLookup": true
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (result.responseList && result.responseList.length > 0) {
                targetText.value = result.responseList[0].outString || "Translation unavailable!";
            } else {
                targetText.value = "Translation failed!";
            }
        } catch (error) {
            console.error("Error:", error);
            targetText.value = "Translation error!";
        }

        translateBtn.disabled = false;
        translateBtn.textContent = 'Translate';
    }

    //Swalekh is used for Phonetic Suggestions when you type in language other than English
    const enableSwalekh = (querySelector, sourceLanguage, inputToolKey, domain = '1') => {
        let creds = {
            lang: sourceLanguage,
            mode: inputToolKey,
            apiKey,
            appId,
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
        disableSwalekh('#sourceText');
        enableSwalekh('#sourceText', selectedLang, inputToolKey, '1');
        updateTargetLanguages();
    });

    translateBtn.addEventListener('click', handleTranslation);

    initialize();
    populateDomains();
});
