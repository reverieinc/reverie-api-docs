from reverie_sdk import ReverieClient

client = ReverieClient(
    api_key="MY_API_KEY",
    app_id="MY_APP_ID",
)

#For Single Response

resp = client.nmt.localization(
    data=[
        "Reverie Language Technologies was established in 2009.",
        "The company head office is located in Bangalore.",
    ],
    domain=1,
    src_lang="en",
    tgt_lang=["hi"],
    nmtMask=True,
    nmtMaskTerms=["Reverie Language Technologies"],
    nmtParam=True,
    dbLookupParam=True,
    segmentationParam=False,
)

print(resp)

#For Multiple Responses

respMultiple = client.nmt.localization(
    data=[
        "Reverie Language Technologies was established in 2009.",
        "The company head office is located in Bangalore.",
    ],
    domain=1,
    src_lang="en",
    tgt_lang=["hi", "or", "mr"],
    nmtMask=True,
    nmtMaskTerms=["Reverie Language Technologies"],
    nmtParam=True,
    dbLookupParam=True,
    segmentationParam=False,
)

print(respMultiple)