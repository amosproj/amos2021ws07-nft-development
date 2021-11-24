# SPDX-License-Identifier: MIT
# SDPX-FileCopyrightText: 2021 Que Le <b.le@tu-berlin.de>

import os
import json

from appwrite.client import Client
from appwrite.services.database import Database

"""
export APPWRITE_ENDPOINT=<http://localhost/v1>
export APPWRITE_PROJECT=<project_id>
export APPWRITE_API_KEY=<api_key>
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



createCollectionResult = database.create_collection(
    "Announcements",  # Collection Name
    ["*"],  # Read permissions
    ["team:Admins"],  # Write permissions
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
    ],
)
print(createCollectionResult)

# Create some fake data
data = [
    (1637100804, "Message _8_04", "Content for Message _8_04"),
    (1637100704, "Message _7_04", "Content for Message _7_04"),
    (1637100604, "Message _6_04", "Content for Message _6_04"),
    (1637100504, "Message _5_04", "Content for Message _5_04"),
    (1637100404, "Message _4_04", "Content for Message _4_04"),
    (1637100304, "Message _3_04", "Content for Message _3_04"),
    (1637100204, "Message _2_04", "Content for Message _2_04"),
    (1637100104, "Message _1_04", "Content for Message _1_04"),
]

for d in data:
    createDocumentResult = database.create_document(
        collection_id=createCollectionResult["$id"],
        data={"created_at": d[0], "updated_at": d[0], "title": d[1], "content": d[2]},
    )
