/*!
 * reverie-client
 * Copyright(c) 2025 Reverie Language Technologies
 * MIT Licensed
 */

'use strict'

function isEditable(element) {
    if (!element) return false;

    // Check if it's an input or textarea
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        return true;
    }

    // Check if contenteditable is set to true
    if (element.isContentEditable) {
        return true;
    }

    return false;
}


function voiceText(event, callback, element,lang){

    let stt_text = event.data;

    if(element){
        if(isEditable(element)){
            // Start voice recognition
            if (event.event === "FINAL_RESULT") {
                document.execCommand('insertText',false,stt_text);

            } else if (event.event === "PARTIAL_RESULTS") {
                if (["es-ES", "fr-FR", "ar-SA"].includes(lang)) {
                    document.execCommand('insertText',false,stt_text);
                }

            }
            
        }
    }
    if(!element || isEditable(element)){
        if(callback){
            let stt_event = {...event}
            callback({stt_event})
        }
    }
}

class ReverieClient {
    constructor(parameters) {
        this.apiKey = parameters.apiKey || 'REVERIE_API_KEY';
        this.appId = parameters.appId || 'REVERIE_APP_ID';
        this.baseUrl = parameters.baseUrl || 'https://revapi.reverieinc.com/';
        this.isListening = false;

        let script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/reverie-stt-sdk/dist/bundle.js';
        document.body.appendChild(script);

    }

    async transliterate({ text, src_lang, tgt_lang, domain = 1 }) {
        try {
            if (!src_lang) {
                throw new Error('Source language is required');
                return null;
            }
            if (!tgt_lang) {
                throw new Error('Target language is required');
                return null;
            }
            if (!text) {
                throw new Error('Text to transliterate is required');
                return null;
            }
            let resp = await fetch(this.baseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "REV-API-KEY": this.apiKey,
                    "REV-APP-ID": this.appId,
                    "src_lang": src_lang,
                    "tgt_lang": tgt_lang,
                    "domain": domain,
                    "cnt_lang": "en",
                    "REV-APPNAME": "transliteration",
                },
                body: JSON.stringify({
                    data: [text],
                    isBulk: false,
                    ignoreTaggedEntities: false
                })
            });
            resp = await resp.json();
            if (resp && resp.responseList && resp.responseList.length > 0) {
                return resp.responseList[0].outString[0];

            }
            else {
                throw new Error("Failed to transliterate text");
                return null;
            }
        }
        catch (error) {
            return error.message;

        }


    }

    async analyze_text({ text, src_lang, tgt_lang, translation_domain, moderation_types }) {
        try {
            if (!src_lang) {
                throw new Error('Content language is required');
            }
            if (!text) {
                throw new Error('Text is required for text analysis');
            }


            const url = `${this.baseUrl}api/v2/text-analyse?translate=true&summary=true&sentiment=false&detect_entities=true&content_safety=true&pii_redaction=true`;

            const headers = {
                'Content-Type': 'application/json',
                'REV-API-KEY': this.apiKey,
                'REV-APP-ID': this.appId,
                'REV-APPNAME': 'text-analysis'
            };

            const data = {
                "text": text,
                "language": src_lang,
                "pii_redaction": {
                    "redact_pii_sub": "entity_name",
                    "redact_pii_types": []
                },
                "summary": {
                    "summary_model": "gemma2:2b",
                    "summary_type": "gist"
                },
                "entity_recognition": {
                    "entity_types": []
                },
                "sentiment": {
                    "level": "whole"
                },
                "content_moderation": {
                    "moderation_types": moderation_types || [
                        "hate_speech",
                        "profanity"
                    ]
                }
            };

            if (tgt_lang) {
                data["traslation"] = {
                    "target_language": tgt_lang,
                    "translation_domain": translation_domain || "generic"
                }
            }

            let response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            })
            response = await response.json();
            if (response && response.results) {
                return response.results;
            }
            else {
                throw new Error("Failed to analyze text");
            }

        } catch (error) {
            return error.message;

        }
    }

    async identify_language_by_text({text}) {
        try {
            if (!text) {
                throw new Error('Text to identify is required');
            }
            if(text.length > 512){
                throw new Error('Text exceeds maximum length of 512 characters');
            }
            let resp = await fetch(this.baseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "REV-API-KEY": this.apiKey,
                    "REV-APP-ID": this.appId,
                    "REV-APPNAME": "lang_id_text",
                },
                body: JSON.stringify({
                    "text": text,
                    "max_length": Math.pow(2,Math.floor(Math.sqrt(text.length))+1)
                })
            });
            resp = await resp.json();
            if (resp) {
                return resp;

            }
            else {
                throw new Error("Failed to detect text");
            }
        }
        catch (error) {
            return error.message;

        }


    }

    async translate({ text, src_lang, tgt_lang, domain }) {
        try {
            if (!src_lang) {
                throw new Error('Source language is required');
                return null;
            }
            if (!tgt_lang) {
                throw new Error('Target language is required');
                return null;
            }
            if (!text) {
                throw new Error('Text to translate is required');
                return null;
            }
            let resp = await fetch(this.baseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "REV-API-KEY": this.apiKey,
                    "REV-APP-ID": this.appId,
                    "src_lang": src_lang,
                    "tgt_lang": tgt_lang,
                    'domain': domain || 'generic',
                    'REV-APPNAME': 'localization',
                    'REV-APPVERSION': '3.0'
                },
                body: JSON.stringify({
                    data: [text],
                    "nmtMask": true,
                    "nmtMaskTerms": {},
                    "enableNmt": true,
                    "enableLookup": true
                })
            });
            resp = await resp.json();
            if (resp && resp.responseList && resp.responseList.length > 0) {
                return resp.responseList[0].outString;

            }
            else {
                throw new Error("Failed to translate text");
                return null;
            }
        }
        catch (error) {
            return error.message;

        }


    }

    async stt_batch({ audioFile, src_lang, domain }) {
        try {
            if (!src_lang) {
                throw new Error('Source language is required');
                return null;
            }
            if (!audioFile) {
                throw new Error('File to transcribe is required');
            }

            const formData = new FormData();
            formData.append("audio_file", audioFile);

            let resp = await fetch("https://revapi.reverieinc.com/", {
                method: "POST",
                headers: {
                    "src_lang": src_lang,
                    "domain": domain || "generic",
                    "REV-APPNAME": "stt_file",
                    "REV-API-KEY": this.apiKey,
                    "REV-APP-ID": this.appId,

                },
                body: formData
            });

            resp = await resp.json();
            if (resp && resp.transcription) {
                return resp.transcription;

            }
            else {
                throw new Error("Failed to transcribe text");
            }
        }
        catch (error) {
            return error.message;

        }


    }

    async text_to_speech({ text, speaker, speed, pitch, format = 'WAV' }) {
        try {
            if (!speaker) {
                throw new Error('Speaker is required for TTS');
            }
            if (!text) {
                throw new Error('Text is required for TTS');
            }
            if (!['WAV', 'MP3'].includes(format)) {
                throw new Error('Invalid audio format. Supported formats are wav and mp3');
            }
            const requestData = {
                text,
                speed: parseFloat(speed),
                pitch: parseFloat(pitch),
                format: "WAV",
                speaker
            };

            let resp = await fetch(this.baseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "REV-API-KEY": this.apiKey,
                    "REV-APP-ID": this.appId,
                    "REV-APPNAME": "tts",
                    "speaker": this.speaker,
                },
                body: JSON.stringify(requestData)
            });
            let blob = await resp.blob();
            if (resp) {
                return blob;

            }
            else {
                throw new Error("Failed to do tts for the text");
            }
        }
        catch (error) {
            return error;

        }


    }

    async init_stt({src_lang,domain,silence,continuous,logging,timeout,callback,element}){
        if(!src_lang){
            throw new Error('Source language is required for STT');
        }
        if(!callback && !element){
            throw new Error('Callback or element is required for STT');
        }
        if(callback && typeof callback!== 'function'){
            throw new Error('Callback must be a function');
        }
        if(element && typeof element!== 'object'){
            throw new Error('Element must be a DOM element');
        }
        if(domain && typeof domain!=='string'){
            throw new Error('Domain must be a string');
        }
        if(silence && typeof silence!=='number'){
            throw new Error('Silence must be a number');
        }
        if(continuous && typeof continuous!=='boolean'){
            throw new Error('Continuous must be a boolean');
        }
        if(logging && typeof logging!=='boolean'){
            throw new Error('Logging must be a boolean');
        }
        if(timeout && typeof timeout!=='number'){
            throw new Error('Timeout must be a number');
        }

        try {
            await window.stt_stream.initSTT({
                apikey: this.apiKey,
                appId: this.appId,
                language: src_lang,
                domain: domain || "generic",
                silence: silence || 1,
                continuous: continuous || 1,
                logging: logging && logging === false? false:true,
                timeout: timeout || 180,
                eventHandler: (event) => voiceText(event,callback, element,src_lang),
                errorHandler: (error) => console.error('Error:', error),
            });
            
            console.log('STT Streaming initialized successfully');
        } catch (error) {
            console.error('STT Initialization failed:', error);
        }

    }

    async start_stt(){
        await window.stt_stream.startSTT();
        this.isListening = true;
    }

    async stop_stt(){
        await window.stt_stream.stopSTT();
        this.isListening = false;
    }

    async toggle_stt(){
        if(this.isListening){
            await this.stop_stt();
        } else {
            await this.start_stt();
        }
    }

}

module.exports = ReverieClient