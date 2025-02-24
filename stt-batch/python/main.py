from reverie_sdk import ReverieClient

client = ReverieClient(
    api_key="<YOUR API KEY>",
    app_id="<YOUR APP ID>",
)

resp = client.asr.stt_file(
    src_lang="en",
    data=open("./path/to/audio.wav", "rb").read(),
)
print(resp)