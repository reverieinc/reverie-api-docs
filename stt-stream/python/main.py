import pyaudio, asyncio
from reverie_sdk import ReverieClient, AudioStream

client = ReverieClient(
    api_key="<YOUR-API-KEY>",
    app_id="<YOUR-APP-ID>",
)

stream = AudioStream()
pa = pyaudio.PyAudio()

def mic_callback(in_data, frame_count, time_info, status):
    try:
        asyncio.run(stream.add_chunk_async(in_data))
    except:
        return (None, pyaudio.paAbort)
    return (None, pyaudio.paContinue)

async def main():
    pa_stream = pa.open(
        rate=16000,
        channels=1,
        format=pyaudio.paInt16,
        frames_per_buffer=1024,
        input=True,
        stream_callback=mic_callback,
    )
    pa_stream.start_stream()

    print("listening... press ctrl+C to stop", flush=True)

    try:
        await client.asr.stt_stream_async(
            src_lang="en",
            bytes_or_stream=stream,
            callback=print,
        )
    except Exception as err:
        print(err)
    finally:
        pa_stream.stop_stream()
        pa_stream.close()


asyncio.run(main())

pa.terminate()