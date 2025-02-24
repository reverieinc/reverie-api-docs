// List of supported languages with their keys and labels
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

// Populates the language dropdown with available languages
function populateLanguageDropdown() {
    const languageDropdown = document.getElementById('language');
    languages.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang.key;
        option.textContent = lang.label;
        languageDropdown.appendChild(option);
    });
}

// Ensures the dropdown is populated when the page loads
document.addEventListener("DOMContentLoaded", populateLanguageDropdown);

async function analyzeText() {
    const analyzeBtn = document.querySelector('.analyze-btn');
    const inputText = document.getElementById('input-text').value;
    const selectedlanguage = document.getElementById('language').value;
    const summaryToggle = document.getElementById('summary-toggle').checked;
    const entityToggle = document.getElementById('entity-toggle').checked;
    const sentimentToggle = document.getElementById('sentiment-toggle').checked;
    const moderationToggle = document.getElementById('moderation-toggle').checked;
    const piiToggle = document.getElementById('pii-toggle').checked;

    if (!inputText) {
        alert('Please enter some text to analyze');
        return;
    }
    // Ensure at least one analysis option is selected
    if (!summaryToggle && !entityToggle && !sentimentToggle && !moderationToggle && !piiToggle) {
        alert('Please select at least one analysis option.');
        return;
    }

    analyzeBtn.disabled = true;
    analyzeBtn.textContent = 'Analyzing...';

    const apiUrl = `https://revapi.reverieinc.com/api/v2/text-analyse?translate=false&summary=${summaryToggle}&sentiment=${sentimentToggle}&detect_entities=${entityToggle}&content_safety=${moderationToggle}&pii_redaction=${piiToggle}`;

    // API credentials (Replace with actual values)
    const apiKey = '<YOUR-API-KEY>';
    const appId = '<YOUR-APP-ID>';

    const requestData = {
        text: inputText,
        language: selectedlanguage,
        translation: {
            target_language: "or",
            translation_domain: "generic"
        },
        pii_redaction: { redact_pii_sub: "entity_name", redact_pii_types: [] },
        summary: { summary_model: "gemma2:2b", summary_type: "gist" },
        entity_recognition: { entity_types: [] },
        sentiment: { level: "whole" },
        content_moderation: { moderation_types: ["hate_speech", "profanity"] }
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            mode: "cors",
            redirect: "follow",
            headers: {
                'Content-Type': 'application/json',
                'REV-API-KEY': apiKey,
                'REV-APP-ID': appId,
                'REV-APPNAME': 'text-analysis'
            },
            body: JSON.stringify(requestData)
        });

        const result = await response.json();
        document.getElementById('results-tabs').style.display = 'block';

        if (summaryToggle && result.results.summary) {
            document.getElementById('summary-tab').innerHTML = result.results.summary.summarised_text;
        }
        if (entityToggle && result.results.entity_recognition) {
            const entities = result.results?.entity_recognition?.entities || {};
            const entityList = Object.entries(entities).map(([category, values]) => {
                const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
                const formattedValues = Array.isArray(values)
                    ? values
                        .map(item =>
                            typeof item === "object"
                                ? category.toLowerCase() === "time"
                                    ? `${item.hh} ${item.nn.toUpperCase()}`
                                    : item.value || item.text || ""
                                : item
                        )
                        .filter(val => val)
                        .join(", ")
                    : values;

                return `<li><strong>${formattedCategory}:</strong> ${formattedValues}</li>`;
            }).join("");

            document.getElementById('entity-tab').innerHTML = `<ul>${entityList}</ul>`;

        }
        if (sentimentToggle && result.results.sentiment) {
            document.getElementById('sentiment-tab').innerHTML = JSON.stringify(result.results.sentiment.sentiments, null, 2);
        }
        if (moderationToggle && result.results.content_moderation) {
            document.getElementById('moderation-tab').innerHTML = result.results.content_moderation.moderated_text;
        }
        if (piiToggle && result.results.pii_redaction) {
            document.getElementById('pii-tab').innerHTML = result.results.pii_redaction.redacted_text;
        }

        showTab('summary');
    } catch (error) {
        console.error('Error analyzing text:', error);
    }
    analyzeBtn.disabled = false;
    analyzeBtn.textContent = 'Analyze';
}

// Function to display a specific result tab
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(tabName + '-tab').style.display = 'block';
    document.querySelector(`.tab-btn[onclick="showTab('${tabName}')"]`).classList.add('active');
}

// Function to reset the form and clear previous results
function resetForm() {
    document.getElementById('input-text').value = '';
    document.getElementById('language').selectedIndex = 0;
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    document.getElementById('results-tabs').style.display = 'none';
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.innerHTML = tab.id.replace('-tab', ' results will appear here');
    });
}
