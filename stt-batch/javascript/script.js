function transcribeAudio() {
    const fileInput = document.getElementById("audioFile");
    const audioPlayer = document.getElementById("audioPlayer");
    const transcriptionOutput = document.getElementById("transcription");
    const language = document.getElementById("language").value; 

    if (fileInput.files.length === 0) {
        alert("Please select an audio file first.");
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("audio_file", file);

    const objectURL = URL.createObjectURL(file);
    audioPlayer.src = objectURL;

    fetch("https://revapi.reverieinc.com/", {
        method: "POST",
        headers: {
            "src_lang": language,
            "domain": "generic",
            "REV-APPNAME": "stt_file",
            "REV-API-KEY": "your_api_key",
            "REV-APP-ID": "your_app_id",

        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        transcriptionOutput.textContent = data.transcription || "Transcription failed.";
    })
    .catch(error => {
        console.error("Error:", error);
        transcriptionOutput.textContent = "Error processing the request.";
    });
}
