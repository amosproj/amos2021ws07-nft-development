import os
import json
import sys
import re
from appwrite.client import Client
from appwrite.services.database import Database

# provided by default
USER_ID = os.environ.get("APPWRITE_FUNCTION_USER_ID")
PAYLOAD = os.environ.get("APPWRITE_FUNCTION_DATA")
APPWRITE_PROJECT = os.environ.get("APPWRITE_FUNCTION_PROJECT_ID")

# provided by appwrite function env vars
APPWRITE_ENDPOINT = os.environ.get("APPWRITE_ENDPOINT")
APPWRITE_API_KEY = os.environ.get("APPWRITE_API_KEY")
WALLETS_COLLECTION_ID = os.environ.get("WALLETS_COLLECTION_ID")

# instantiate database connection
client = Client()
client.set_endpoint(APPWRITE_ENDPOINT)
client.set_project(APPWRITE_PROJECT)
client.set_key(APPWRITE_API_KEY)
database = Database(client)

# parse wallet address
desiredWalletAddress = json.loads(PAYLOAD)["walletAddress"]

# validate that it is an ethereum address
match = re.search("^(0x|0X)?[a-fA-F0-9]+$", desiredWalletAddress)
if match is None or len(desiredWalletAddress) != 42:
    res = {"status": "failure", "msg": "not a valid address"}
    print(json.dumps(res))
    sys.exit()

# query the database for a wallet address that is already associated with the user
readResult = database.list_documents(WALLETS_COLLECTION_ID, ["userId=" + USER_ID])[
    "documents"
]
if len(readResult) > 0:
    # there is already a corresponding document => update wallet address
    writeResult = database.update_document(
        WALLETS_COLLECTION_ID,
        readResult[0]["$id"],
        {"walletAddress": desiredWalletAddress},
    )
else:
    # there is no document yet => create document with userId, walletAddress and permission
    writeResult = database.create_document(
        WALLETS_COLLECTION_ID,
        {"userId": USER_ID, "walletAddress": desiredWalletAddress},
        ["user:" + USER_ID],
    )

# return that the operation was successful
res = {"status": "success"}
print(json.dumps(res))
