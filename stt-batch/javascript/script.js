async function transcribeAudio() {
    const fileInput = document.getElementById("audioFile");
    const audioPlayer = document.getElementById("audioPlayer");
    const transcriptionOutput = document.getElementById("transcription");
    const language = document.getElementById("language").value;

    const reverieClient = new ReverieClient({
        apiKey: "<YOUR-API-KEY>",
        appId: "<YOUR-APP-ID>"
    });

    if (fileInput.files.length === 0) {
        alert("Please select an audio file first.");
        return;
    }

    const file = fileInput.files[0];

    const objectURL = URL.createObjectURL(file);
    audioPlayer.src = objectURL;

    try {
        const response = await reverieClient.stt_batch({
            audioFile: file,
            src_lang: language
        });
        console.log('hey', response);
        transcriptionOutput.textContent = response;
    } catch (error) {
        console.error("Error:", error);
        transcriptionOutput.textContent = "Error processing the request.";
    }
}
