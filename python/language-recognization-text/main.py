from reverie_sdk import ReverieClient

client = ReverieClient(
    api_key="MY_API_KEY",
    app_id="MY_APP_ID",
)

resp = client.nlu.lang_id_text(
    "भारत दक्षि ण एशि या मेंस्थि त भारतीय उपमहाद्वीप का सबसेबड़ा देश है",
)

print(resp)