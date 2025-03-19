
async function identifyLanguage() {
    const text = document.getElementById('text-input').value;
    const apiKey = 'REV-API-KEY'; // Replace with your actual API key
    const appID = 'REV-APP-ID'; // Replace with your actual app ID
    const baseURL = 'https://revapi.reverieinc.com'; // Replace with the actual API base URL

    // Validate text length
    if (!text) {
        alert('Text is required.');
        return;
    }
    if (text.length > 512) {
        alert('Text exceeds the maximum allowed length of 512 characters.');
        return;
    }

    // Calculate maxLength (this is an approximation of your Go code's logic)
    const maxLength = Math.pow(2, Math.ceil(Math.sqrt(text.length)));

    // Prepare request body
    const requestBody = {
        text: text,
        max_length: maxLength > 512 ? 512 : maxLength
    };

    try {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'REV-API-KEY': apiKey,
                'REV-APP-ID': appID,
                'REV-APPNAME': 'lang_id_text'
            },
            body: JSON.stringify(requestBody)
        });

        // Check if the response status is ok
        if (!response.ok) {
            const errorMessage = `API error: ${response.statusText}`;
            document.getElementById('response-output').textContent = errorMessage;
            return;
        }

        const result = await response.json();
        // Assuming the response contains a 'language' field
        document.getElementById('response-output').textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('response-output').textContent = 'An error occurred while identifying the language.';
    }
}
