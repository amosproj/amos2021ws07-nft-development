import os
import json

from appwrite.client import Client
from appwrite.services.database import Database

""" 
export APPWRITE_ENDPOINT=http://localhost/v1
export APPWRITE_PROJECT=618a936863851
export APPWRITE_API_KEY=51e5d586ba1ffa8e3b5c00147e0f788344bd49a2a67dff85b6dee5d3c44f46435e824fc4c2738334b3a22a3673c13db53109acab2d5defb59f3c8e6b51433f82ac1fdb69a3aac09d29fdfb13af3105f67791626c2c6316a9d04e150e0c7c6947a45b13f7f5c107e48552053ba74f31b3b8a65b9c3862cb9cae0095b33c66b2ed
"""
APPWRITE_ENDPOINT = os.environ.get("APPWRITE_ENDPOINT")
APPWRITE_PROJECT = os.environ.get("APPWRITE_PROJECT")
APPWRITE_API_KEY = os.environ.get("APPWRITE_API_KEY")


client = Client()
database = Database(client)

(
    client.set_endpoint(APPWRITE_ENDPOINT)
    .set_project(APPWRITE_PROJECT)
    .set_key(APPWRITE_API_KEY)
)
PAYLOAD = """
{
    "getAnnouncements": true,
    "numberOfAnnouncements": 3,
    "timestamp": 1637100904,
    "after": false
}
"""
client_payload = json.loads(PAYLOAD)
if (client_payload["getAnnouncements"]):
    # print(client_payload["numberOfAnnouncements"])
    nbr_ancm = client_payload["numberOfAnnouncements"]
    # print(client_payload["untilTime"])
    timestamp = client_payload["timestamp"]
    after = client_payload["after"]
    # after = False
    listCollection = database.list_collections()
    for collection in listCollection["collections"]:
        if collection["name"] == "Announcements":
            print(collection["$id"])
            listDocuments = database.list_documents(
                    collection_id=collection["$id"],
                    order_field="created_at",
                    order_type="DESC",
                    filters= ["created_at>=1637100404"] if after else ["created_at<=1637100404"],
                    limit=20
                )
            for document in listDocuments["documents"]:
                print(document)



exit()
# Cleanup
listCollection = database.list_collections()
for collection in listCollection["collections"]:
    result = database.delete_collection(collection_id=collection["$id"])
# exit()

createCollectionResult = database.create_collection(
    "Announcements",    # Collection Name
    ["*"],              # Read permissions
    ["role:team"],      # Write permissions
    [   
        {
            "label": "created_at",
            "key": "created_at",
            "type": "numeric",
            "required": True,
            "array": False,
        },
        {
            "label": "updated_at",
            "key": "updated_at",
            "type": "numeric",
            "required": False,
            "array": False,
        },
        {
            "label": "content",
            "key": "content",
            "type": "text",
            "required": True,
            "array": False,
        },
    ],
)

print(createCollectionResult)

data = [
    (1637100804, "Message _8_04"),
    (1637100704, "Message _7_04"),
    (1637100604, "Message _6_04"),
    (1637100504, "Message _5_04"),
    (1637100404, "Message _4_04"),
    (1637100304, "Message _3_04"),
    (1637100204, "Message _2_04"),
    (1637100104, "Message _1_04"),
]

for d in data:
    createDocumentResult = database.create_document(
        collection_id=createCollectionResult["$id"],
        data={
            "created_at": d[0],
            "updated_at": d[0],
            "content": d[1]
        }
    )