from reverie_sdk import ReverieClient

client = ReverieClient(
    api_key="MY_API_KEY",
    app_id="MY_APP_ID",
)

res = client.t13n.transliteration(
    data=[
        "Reverie Language Technologies is located in Bengaluru ",
        "The address is Jio Avana, Bellandur, Bengaluru -560102",
        "The website address is www.reverieinc.com.",
    ],
    src_lang="en",
    cnt_lang="en",
    tgt_lang="hi",
    noOfSuggestions=2,
)

print(res)