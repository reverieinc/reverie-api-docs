import requests
import os

class SLIDApiClient:
    def __init__(self, api_key, app_id):
        """
        Initializes the SLID API client.

        Args:
            api_key (str): The API key provided by Reverie.
            app_id (str): The App ID provided by Reverie.
        """
        self.api_key = api_key
        self.app_id = app_id
        self.base_url = "https://revapi.reverieinc.com/upload"

    def identify_language(self, audio_file_path, audio_format=None):
        """
        Identifies the language spoken in the given audio file.

        Args:
            audio_file_path (str):  Path to the audio file.
            audio_format (str, optional): Format of the audio file. Defaults to None.

        Returns:
            dict: The JSON response from the API.
        """
        headers = {
            "REV-API-KEY": self.api_key,
            "REV-APP-ID": self.app_id,
            "REV-APPNAME": "slid",  
        }
        files = {"audio_file": open(audio_file_path, "rb")}
        data = {}

        if audio_format:
            headers["format"] = audio_format

        try:
            response = requests.post(self.base_url, headers=headers, files=files)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error: {e}")
            return None
        finally:
            files["audio_file"].close()

if __name__ == "__main__":
    api_key = "<YOUR-API-KEY>"
    app_id = "<YOUR-APP-ID>"

    client = SLIDApiClient(api_key, app_id)
    audio_file = "<PATH-TO-YOUR-FILE>"

    result = client.identify_language(audio_file)
    if result:
        print("Language Identification Result:")
        print(result)

    # Example usage with a specific audio format (e.g., mp3)
    # result_mp3 = client.identify_language(audio_file, audio_format="mp3")
    # if result_mp3:
    #     print("Language Identification Result (MP3):")
    #     print(result_mp3)