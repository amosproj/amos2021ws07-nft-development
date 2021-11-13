import os
from appwrite.client import Client
from appwrite.services.database import Database

APPWRITE_ENDPOINT = os.environ.get('APPWRITE_ENDPOINT')
APPWRITE_PROJECT = os.environ.get('APPWRITE_PROJECT')
APPWRITE_API_KEY = os.environ.get('APPWRITE_API_KEY')


client = Client()
database = Database(client)

(client
    .set_endpoint(APPWRITE_ENDPOINT)
    .set_project(APPWRITE_PROJECT)
    .set_key(APPWRITE_API_KEY)
 )

createCollectionResult = database.create_collection('Wallets', [], [], [
    {
        "label": "User Id",
        "key": "userId",
        "type": "text",
        "required": True,
        "array": False
    },
    {
        "label": "Wallet Address",
        "key": "walletAddress",
        "type": "text",
        "required": True,
        "array": False
    }
    ])

print(createCollectionResult)
