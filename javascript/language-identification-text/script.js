import ReverieClient from "@reverieit/reverie-client";

async function identifyLanguage() {
    const text = document.getElementById('text-input').value;

    const reverieClient = new ReverieClient({
        apiKey: "<YOUR-API-KEY>",
        appId: "<YOUR-APP-ID>",
    });


    if (!text) {
        alert('Text is required.');
        return;
    }
    if (text.length > 512) {
        alert('Text exceeds the maximum allowed length of 512 characters.');
        return;
    }

    // Calculate maxLength (this is an approximation of your Go code's logic)

    try {
        const response = await reverieClient.identify_language_by_text({ text: text });
        // Extract the 'lang' field from the response
        if (response.lang) {
            document.getElementById('response-output').textContent = `Detected Language: ${response.lang}`;
        } else {
            document.getElementById('response-output').textContent = "Language could not be identified.";
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('response-output').textContent = 'An error occurred while identifying the language.';
    }

}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("identifyLanguage").addEventListener("click", identifyLanguage);

});
