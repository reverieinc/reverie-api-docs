document.addEventListener("DOMContentLoaded", function () {
    const sourceLangSelect = document.getElementById("sourceLang"); //Source Language
    const targetLangSelect = document.getElementById("targetLang"); //Target Language
    const domainSelect = document.getElementById("domain"); //Domain 
    const transliterateBtn = document.getElementById("transliterateBtn");
    const resetBtn = document.getElementById("resetBtn");
    const sourceText = document.getElementById("sourceText"); //Source Text
    const targetText = document.getElementById("targetText"); //Target Text

    let apiKey = '<YOUR-API-KEY>'; //Your API Key
    let appId = '<YOUR-APP-ID>'; //Your APP ID
    let inputToolKey = 'phonetic';

    //Available Source Languages
    const sourceLanguages = [
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
        { key: 'generic', label: 'Generic' },
        { key: 'pii_names', label: 'People Name' },
        { key: 'pii_addresses', label: 'Location' },
        { key: 'OnlyEnglish', label: 'OnlyEnglish' },
        { key: 'bfsi', label: 'Banking' },
        { key: 'ecommerce', label: 'ECommerce' },
        { key: 'food', label: 'Food' },
        { key: 'infotainment', label: 'Infotainment' },
        { key: 'medical', label: 'Medical' },
        { key: 'enterprise', label: 'Enterprise' }
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

    //Target Language is filtered so that the Source and Target language cannot be same
    function updateTargetLanguages() {
        const selectedSource = sourceLangSelect.value;
        const filteredTargets = sourceLanguages.filter(lang => lang.key !== selectedSource);
        populateDropdown(targetLangSelect, filteredTargets);
    }

    populateDropdown(sourceLangSelect, sourceLanguages);
    updateTargetLanguages();
    populateDropdown(domainSelect, domainOptions);

    sourceLangSelect.addEventListener("change", updateTargetLanguages);

    transliterateBtn.addEventListener("click", function () {
        const sourceLang = sourceLangSelect.value;
        const targetLang = targetLangSelect.value;
        const domain = domainSelect.value;
        const text = sourceText.value.trim();

        if (!text) {
            alert("Please enter text to transliterate.");
            return;
        }

        fetch("https://revapi.reverieinc.com/", { //Base URL
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "REV-API-KEY": apiKey,
                "REV-APP-ID": appId,
                "src_lang": sourceLang,
                "tgt_lang": targetLang,
                "domain": domain,
                "cnt_lang": "en",
                "REV-APPNAME": "transliteration",
                "REV-APPVERSION": "2.0"
            },
            body: JSON.stringify({
                data: [text],
                isBulk: false,
                ignoreTaggedEntities: false
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.responseList && data.responseList.length > 0) {
                    targetText.value = data.responseList[0].outString[0]; //Result is mapped to Output Textarea
                } else {
                    targetText.value = "Error: No response received";
                }
            })
            .catch(error => {
                console.error("Error:", error);
                targetText.value = "Error: Failed to transliterate";
            });
    });

    resetBtn.addEventListener("click", function () {
        sourceText.value = "";
        targetText.value = "";
    });

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

    sourceLangSelect.addEventListener('change', function () {
        let selectedLang = sourceLangSelect.value;
        disableSwalekh('#sourceText');
        enableSwalekh('#sourceText', selectedLang, inputToolKey, '1');
        updateTargetLanguages();
    });
});
