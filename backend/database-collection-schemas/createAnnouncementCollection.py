# SPDX-License-Identifier: MIT
# SDPX-FileCopyrightText: 2021 Que Le <b.le@tu-berlin.de>

import os
import json

from appwrite.client import Client
from appwrite.services.database import Database

"""
export APPWRITE_ENDPOINT=<http://localhost/v1>
export APPWRITE_PROJECT=61b1e4655f32d
export APPWRITE_API_KEY=87baf2c5c9e6d328addc56750a6da62ebe6cd9b016ef8be185854f8fea8b51c14faa9b03c0652dbf4fefb17ff6cd0c97fd5b0e244ff80917907834398335dfb603fe8aa31ba6a3e5f094b2d0120e37ec5e1887ad647ef6a12c7b4147a3dd8487d9738a067de955f714fb634ab4dccd6ca8dc08e6927716d7dac29f4f6fb29aa0
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
        {
            "label": "Creator",
            "key": "creator",
            "type": "text",
            "required": True,
            "array": False,
        },
    ],
)
print(createCollectionResult)

# Create some fake data
data = [
    (1637100804, "Message _8_04", "Content for Message _8_04", "robot"),
    (1637100704, "Message _7_04", "Content for Message _7_04", "robot"),
    (1637100604, "Message _6_04", "Content for Message _6_04", "robot"),
    (1637100504, "Message _5_04", "Content for Message _5_04", "robot"),
    (1637100404, "Message _4_04", "Content for Message _4_04", "robot"),
    (1637100304, "Message _3_04", "Content for Message _3_04", "robot"),
    (1637100204, "Message _2_04", "Content for Message _2_04", "robot"),
    (1637100104, "Message _1_04", "Content for Message _1_04", "robot"),
]

for d in data:
    createDocumentResult = database.create_document(
        collection_id=createCollectionResult["$id"],
        data={
            "created_at": d[0],
            "updated_at": d[0],
            "title": d[1],
            "content": d[2],
            "creator": d[3],
        },
    )
