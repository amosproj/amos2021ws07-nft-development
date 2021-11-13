import os
import json
from appwrite.client import Client
from appwrite.services.database import Database

# provided by default
USER_ID = os.environ.get('APPWRITE_FUNCTION_USER_ID')
APPWRITE_PROJECT = os.environ.get('APPWRITE_FUNCTION_PROJECT_ID')

# provided by cloud function env vars
APPWRITE_ENDPOINT = os.environ.get('APPWRITE_ENDPOINT')
APPWRITE_API_KEY = os.environ.get('APPWRITE_API_KEY')
WALLETS_COLLECTION_ID = os.environ.get('WALLETS_COLLECTION_ID')

client = Client()
database = Database(client)

(client
    .set_endpoint(APPWRITE_ENDPOINT)
    .set_project(APPWRITE_PROJECT)
    .set_key(APPWRITE_API_KEY)
 )

dbResult = database.list_documents(WALLETS_COLLECTION_ID, ["userId=" + USER_ID])["documents"]
if len(dbResult) > 0:
    res = {
        "status": "success",
        "walletAddress": dbResult[0]["walletAddress"]
    }
    print(json.dumps(res))
else:
    res = {
        "status": "wallet address not set yet",
        "walletAddress": "undefined"
    }
    print(json.dumps(res))
