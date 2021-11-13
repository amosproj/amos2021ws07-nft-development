import os
import json
from appwrite.client import Client
from appwrite.services.database import Database

# provided by default
USER_ID = os.environ.get('APPWRITE_FUNCTION_USER_ID')
PAYLOAD = os.environ.get('APPWRITE_FUNCTION_DATA')
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

desiredWalletAddress = json.loads(PAYLOAD)["walletAddress"]

readResult = database.list_documents(WALLETS_COLLECTION_ID, ["userId=" + USER_ID])["documents"]

if len(readResult) > 0:
    writeResult = database.update_document(WALLETS_COLLECTION_ID, readResult[0]["$id"],
                                           {"walletAddress": desiredWalletAddress})
else:
    writeResult = database.create_document(WALLETS_COLLECTION_ID, {"userId": USER_ID, "walletAddress": desiredWalletAddress}, ["user:" + USER_ID])

res = {
    "status": "success",
    "dbResult": writeResult
}
print(json.dumps(res))
