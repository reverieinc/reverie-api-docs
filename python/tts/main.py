from reverie_sdk import ReverieClient

client = ReverieClient(
    api_key="MY_API_KEY",
    app_id="MY_APP_ID",
)

with open("./big_text.txt", encoding="utf-8") as f:
    text = f.read()

for resp_idx, resp in enumerate(
    client.tts.tts_streaming(
        text=text,
        speaker="en_male",
        max_words_per_chunk=5,
        fast_sentence_fragment=False,
    )
):
    print(f"{resp_idx:08d} {resp.duration:10.3f}")
    resp.save_audio(
        f".path/to/output/{resp_idx:08d}.wav",
        create_parents=True,
        overwrite_existing=True,
    )