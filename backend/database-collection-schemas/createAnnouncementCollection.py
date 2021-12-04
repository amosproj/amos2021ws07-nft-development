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
APPWRITE_ENDPOINT = "http://localhost:81/v1"
APPWRITE_PROJECT = "618583cbf0506"
APPWRITE_API_KEY = "f9c23feb7e5e70217a40516490d6ed3572c863f27716e183dbbc37d7d10dfb928434acea06a05637bfb7f294652336cb08789866e57ce41f81856bf15bd3c8f0dc646f32ab7fb04f6b437850941d0f9beefd3aa95097f06c6a5cd6e567594a1fc023d529b217ac33cb266124de2647a6bd0666acef34ca8eba4332e56f64a13a"


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
