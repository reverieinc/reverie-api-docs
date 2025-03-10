const speakers = {
    hi: ["hi_male", "hi_male_2", "hi_female", "hi_female_2"],
    bn: ["bn_male", "bn_male_2", "bn_female", "bn_female_2"],
    kn: ["kn_male", "kn_male_2", "kn_female", "kn_female_2"],
    ml: ["ml_male", "ml_female"],
    ta: ["ta_male", "ta_female"],
    te: ["te_male", "te_male_2", "te_female", "te_female_2"],
    gu: ["gu_male", "gu_female"],
    or: ["or_male", "or_female"],
    as: ["as_male", "as_female"],
    mr: ["mr_male", "mr_male_2", "mr_female", "mr_female_2"],
    pa: ["pa_male", "pa_female"],
    en: ["en_male", "en_male_2", "en_female", "en_female_2"]
};

function updateSpeakers() {
    const lang = document.getElementById("language").value;
    const speakerSelect = document.getElementById("speaker");
    speakerSelect.innerHTML = "";
    speakers[lang].forEach(speaker => {
        const option = document.createElement("option");
        option.value = speaker;
        option.textContent = speaker;
        speakerSelect.appendChild(option);
    });
}

function convertTextToSpeech() {
    const text = document.getElementById("textInput").value;
    const language = document.getElementById("language").value;
    const speaker = document.getElementById("speaker").value;
    const speed = document.getElementById("speed").value;
    const pitch = document.getElementById("pitch").value;

    const requestData = {
        text,
        speed: parseFloat(speed),
        pitch: parseFloat(pitch),
        format: "WAV",
        speaker
    };

    fetch("https://revapi.reverieinc.com/", {
        method: "POST",
        headers: {
            "REV-API-KEY": "your_api_key",
            "REV-APP-ID": "your_app_id",
            "REV-APPNAME": "tts",
            "speaker": speaker,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
    })
        .then(response => response.blob())
        .then(blob => {
            const audioUrl = URL.createObjectURL(blob);
            document.getElementById("audioPlayer").src = audioUrl;
        })
        .catch(error => console.error("Error:", error));
}

updateSpeakers();