import ReverieClient from "@reverieit/reverie-client";

document.getElementById("uploadBtn").addEventListener("click", async () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const languageSelect = document.getElementById('languageSelect');
    const selectedLanguages = Array.from(languageSelect.selectedOptions)
        .map(option => option.value)
        .join(',');

    const ocrTypeSelect = document.getElementById('ocrTypeSelect').value;
    const responseText = document.getElementById('response');
    const loader = document.getElementById('loader');

    const reverieClient = new ReverieClient({
        apiKey: "<YOUR-API-KEY>",
        appId: "<YOUR-APP-ID>",
    });

    if (!file) {
        alert('Please select a file');
        return;
    }

    const fileType = file.type === 'application/pdf' ? 'pdf' : 'img';
    if (fileType === 'img' && ocrTypeSelect === 'layout_ocr') {
        alert('Layout OCR is not supported for images. Please select Only OCR.');
        return;
    }

    responseText.textContent = "";
    loader.style.display = "block";

    try {


        const result = await reverieClient.uploadDocument({
            file: file,
            file_type: fileType,
            languages: selectedLanguages,
            ocr_type: ocrTypeSelect
        });

        if (ocrTypeSelect === 'layout_ocr') {
            const url = window.URL.createObjectURL(result);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'output.docx';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            responseText.textContent = "File downloaded successfully.";
        } else {
            responseText.textContent = result;
        }
    } catch (error) {
        console.error('Error:', error);
        responseText.textContent = 'Error occurred while processing';
    } finally {
        loader.style.display = "none"; // Hide loader
    }
});
