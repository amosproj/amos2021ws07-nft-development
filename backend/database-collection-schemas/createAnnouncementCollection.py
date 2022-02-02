# SPDX-License-Identifier: MIT
# SDPX-FileCopyrightText: 2021 Que Le <b.le@tu-berlin.de>

import os

# import json
import argparse
import sys
from appwrite.client import Client
from appwrite.services.database import Database

"""
export APPWRITE_ENDPOINT=<http://localhost/v1>
export APPWRITE_PROJECT=<project_id>
export APPWRITE_API_KEY=<api_key>
"""

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
        "Announcements",  # Collection Name
        ["*"],  # Read permissions
        ["team:Admins"],  # Write permissions
        [
            {
                "label": "creator",
                "key": "creator",
                "type": "text",
                "required": True,
                "array": False,
            },
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
                "label": "title",
                "key": "title",
                "type": "text",
                "required": True,
                "array": False,
            },
            {
                "label": "content",
                "key": "content",
                "type": "text",
                "required": True,
                "array": False,
            },
            {
                "label": "imageID",
                "key": "imageID",
                "type": "numeric",
                "required": False,
                "array": False,
            },
        ],
    )
    print(createCollectionResult)
    print(createCollectionResult["$id"])
    with open("announcementCollectionID.txt", "w") as f:
        print(createCollectionResult["$id"], file=f)
except Exception as e:
    print(e)
    sys.exit(1)
# Create some fake data
data = [
    (
        1637100804,
        "A new Announcement!",
        "Today is a great day, a day of heroines and super power. While the world...",
        "robot",
    ),
    (
        1637100704,
        "Parappas Mega Barbecue Party",
        "Rapper Parappa schmeißt die Party des Jahrhunderts. Reichlich Nudeln, Burger und ulkige Showeinlagen ist noch untertrieben. Spitze Witze, würzige Fürze und schleimige Reime sollte man nicht verpassen lassen. Zur Kür ein Geschwür, äh. Rapper-Prepper und ein Rabbiat-Akkrobat sorgen für Spaß, privat. Keine Zeit so weit?? Ja bist du gescheit? Gefeiert wird bis's schneit. So der Eid. Komm einfach, etwas Besseres hast du nicht zu tun.",
        "robot",
    ),
    (
        1637100604,
        "Habe meinen Verstand verloren",
        "Kann mir irgendwer helfen suchen? Das muss am Amber Stow Square passiert sein.",
        "robot",
    ),
    (
        1637100504,
        "Watch out to catch a Gimbleby!",
        "It's time where the Gimbleby sprites start to awake from their sleep. Look out and if you are lucky you catch one and get granted one wish!",
        "robot",
    ),
    (
        1637100404,
        "Extreme Shopping Experience",
        "Be one of the first to visit Xalax Ulcon at Heyla Dultherton's store today and win a first class augmented reality tour, the ultimate shopping experience.",
        "robot",
    ),
    (1637100304, "Bella Balla", "Tam tam, tschuff, aba babba du", "robot"),
    (1637100204, "Message _2_04", "Content for Message _2_04", "robot"),
    (1637100104, "Message _1_04", "Content for Message _1_04", "robot"),
]

for d in data:
    try:
        createDocumentResult = database.create_document(
            collection_id=createCollectionResult["$id"],
            data={
                "creator": d[3],
                "created_at": d[0],
                "updated_at": d[0],
                "title": d[1],
                "content": d[2],
            },
        )
    except Exception as e:
        print(e)
        sys.exit(2)
sys.exit(0)
