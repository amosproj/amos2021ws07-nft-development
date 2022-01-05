import os
import argparse
import sys
from appwrite.client import Client
from appwrite.services.database import Database

parser = argparse.ArgumentParser("\n--apikey, --endpoint, --projectid \n")

parser.add_argument(
    "--apikey",
    type=str,
    default=None,
    help="API key to access appwrite backend, you can instead "
    "also set the environment variable APPWRITE_API_KEY",
)
parser.add_argument(
    "--endpoint",
    type=str,
    default=None,
    help="URL of the appwrite endpoint, you can instead "
    "also set the environment variable APPWRITE_ENDPOINT",
)
parser.add_argument(
    "--projectid",
    type=str,
    default=None,
    help="Project ID of the targeted appwrite project, you can instead "
    "also set the environment variable APPWRITE_PROJECT",
)
args = parser.parse_args()

APPWRITE_ENDPOINT = (
    str(args.endpoint) if args.endpoint else os.environ.get("APPWRITE_ENDPOINT")
)
APPWRITE_PROJECT = (
    str(args.projectid) if args.projectid else os.environ.get("APPWRITE_PROJECT")
)
APPWRITE_API_KEY = (
    str(args.apikey) if args.apikey else os.environ.get("APPWRITE_API_KEY")
)

client = Client()
database = Database(client)

(
    client.set_endpoint(APPWRITE_ENDPOINT)
    .set_project(APPWRITE_PROJECT)
    .set_key(APPWRITE_API_KEY)
)

try:
    createCollectionResult = database.create_collection(
        "Wallets",
        ["role:member"],
        [],
        [
            {
                "label": "User Id",
                "key": "userId",
                "type": "text",
                "required": True,
                "array": False,
            },
            {
                "label": "Wallet Address",
                "key": "walletAddress",
                "type": "text",
                "required": True,
                "array": False,
            },
        ],
    )

    print(createCollectionResult)
except Exception as e:
    print(e)
    sys.exit(1)

sys.exit(0)
