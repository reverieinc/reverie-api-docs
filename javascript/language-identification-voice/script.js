import ReverieClient from "@reverieit/reverie-client";

document.getElementById("uploadBtn").addEventListener("click", async () => {
    const reverieClient = new ReverieClient({
        apiKey: "<YOUR-API-KEY>",
        appId: "<YOUR-APP-ID>",
    });

    const fileInput = document.getElementById("audioFile");
    const loader = document.getElementById("loader");
    const responseText = document.getElementById("response");

    if (!fileInput.files.length) {
        responseText.textContent = "Please select an audio file.";
        return;
    }
    loader.classList.remove("hidden");

    try {
        const language = await reverieClient.uploadAudio({
            file: fileInput.files[0],
        });
        if (language) {
            responseText.textContent = `Language: ${language.language}`;
        } else {
            responseText.textContent = `Error: ${language.cause}`;
        }
    } catch (error) {
        console.log(error);
        responseText.textContent = "Upload failed. Please try again.";
    }
    finally {
        loader.classList.add("hidden");
    }
});
