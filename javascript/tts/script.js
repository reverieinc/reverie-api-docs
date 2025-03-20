import ReverieClient from "@reverieit/reverie-client";

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

const reverieClient = new ReverieClient({
    apiKey: "<YOUR-API-KEY>",
    appId: "<YOUR-APP-ID>",
});


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

async function convertTextToSpeech() {
    const text = document.getElementById("textInput").value;
    const language = document.getElementById("language").value;
    const speaker = document.getElementById("speaker").value;
    const speed = document.getElementById("speed").value;
    const pitch = document.getElementById("pitch").value;

    try {
        const audioBlob = await reverieClient.text_to_speech({
            text: text,
            speaker: speaker,
            speed: speed,
            pitch: pitch,
        });

        const audioUrl = URL.createObjectURL(audioBlob);
        document.getElementById("audioPlayer").src = audioUrl;
    } catch (error) {
        console.error("Error:", error);
    }
}

updateSpeakers();

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("generateSpeech").addEventListener("click", convertTextToSpeech);
    let languageSelect = document.getElementById("language");

    languageSelect.addEventListener("change", function () {
        updateSpeakers(languageSelect.value);
    });
});