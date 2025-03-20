// List of supported languages with their keys and labels
import ReverieClient from "reverie-client";

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

    const reverieClient = new ReverieClient({
        apiKey: "<YOUR-API-KEY>",
        appId: "<YOUR-APP-ID>"
    });

    try {
        // Perform text analysis
        const result = await reverieClient.analyze_text({
            text: inputText,
            src_lang: selectedlanguage,
            tgt_lang: "or",
            translation_domain: "generic",
            pii_redaction: { redact_pii_sub: "entity_name", redact_pii_types: [] },
            summary: { summary_model: "gemma2:2b", summary_type: "gist" },
            entity_recognition: { entity_types: [] },
            sentiment: { level: "whole" },
            content_moderation: { moderation_types: ["hate_speech", "profanity"] }
        });

        console.log("Analysis Result:", result);

        document.getElementById("results-tabs").style.display = "block";

        // Handle summary
        if (summaryToggle && result?.summary?.summarised_text) {
            document.getElementById("summary-tab").innerHTML = result.summary.summarised_text;
        } else {
            document.getElementById("summary-tab").innerHTML = "No summary available.";
        }

        // Handle entity recognition
        if (entityToggle && result?.entity_recognition?.entities) {
            const entities = result.entity_recognition.entities;
            const entityList = Object.entries(entities)
                .map(([category, values]) => {
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
                })
                .join("");

            document.getElementById("entity-tab").innerHTML = entityList ? `<ul>${entityList}</ul>` : "No entities found.";
        } else {
            document.getElementById("entity-tab").innerHTML = "No entity recognition data.";
        }

        // Handle sentiment analysis
        if (sentimentToggle && result?.sentiment?.sentiments) {
            document.getElementById("sentiment-tab").innerHTML = JSON.stringify(result.sentiment.sentiments, null, 2);
        } else {
            document.getElementById("sentiment-tab").innerHTML = "No sentiment data.";
        }

        // Handle content moderation
        if (moderationToggle && result?.content_moderation?.moderated_text) {
            document.getElementById("moderation-tab").innerHTML = result.content_moderation.moderated_text;
        } else {
            document.getElementById("moderation-tab").innerHTML = "No moderation results.";
        }

        // Handle PII redaction
        if (piiToggle && result?.pii_redaction?.redacted_text) {
            document.getElementById("pii-tab").innerHTML = result.pii_redaction.redacted_text;
        } else {
            document.getElementById("pii-tab").innerHTML = "No PII redaction results.";
        }

        // Show default tab
        showTab("summary");

    } catch (error) {
        console.error("Error analyzing text:", error);
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

    const targetTab = document.getElementById(tabName + '-tab');
    if (targetTab) {
        targetTab.style.display = 'block';
    } else {
        console.error(`Tab with ID '${tabName}-tab' not found.`);
    }

    const activeButton = document.querySelector(`.tab-btn[data-tab="${tabName}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    } else {
        console.error(`Button for tab '${tabName}' not found.`);
    }
}


// Function to reset the form and clear previous results
function resetForm() {
    document.getElementById("input-text").value = "";
    document.getElementById("language").selectedIndex = 0;
    document.querySelectorAll("input[type='checkbox']").forEach(checkbox => checkbox.checked = false);
    document.getElementById("results-tabs").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("analyzeButton").addEventListener("click", analyzeText);
    document.getElementById("resetButton").addEventListener("click", resetForm);
    document.querySelectorAll(".tab-btn").forEach(button => {
        button.addEventListener("click", () => showTab(button.getAttribute("data-tab")));
    });
});