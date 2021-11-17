import os
import json
import time
import traceback

from appwrite.client import Client
from appwrite.services.database import Database


def init_client():
    # Initialize the Appwrite client
    client = Client()
    client.set_endpoint(os.getenv("APPWRITE_ENDPOINT"))
    client.set_project(os.getenv("APPWRITE_FUNCTION_PROJECT_ID"))
    client.set_key(os.getenv("APPWRITE_API_KEY"))

    return client


def main():
    # payload = json.loads(os.getenv("APPWRITE_FUNCTION_EVENT_DATA"))
    """
    UPDATED_AT_KEY = "updatedAt"
    collectionId = payload["$collection"]
    documentId = payload["$id"]
    currentTimeStamp = time.time()

    if UPDATED_AT_KEY not in payload:
        return

    client = init_client()
    database = Database(client)

    database.update_document(
        collectionId,
        documentId,
        {UPDATED_AT_KEY: currentTimeStamp},
    )

    print("Updated the field updatedAt with current timestamp successfully.")
    """

    client = init_client()
    database = Database(client)
    PAYLOAD = os.environ.get("APPWRITE_FUNCTION_DATA")
    print("PAYLOAD: " + str(PAYLOAD))

    try:
        client_payload = json.loads(PAYLOAD)
        if client_payload["getAnnouncements"]:
            # print(client_payload["numberOfAnnouncements"])
            nbr_ancm = client_payload["numberOfAnnouncements"]
            # print(client_payload["untilTime"])
            timestamp = client_payload["timestamp"]
            after = client_payload["after"]
            # after = False
            # listCollection = database.list_collections()
            # print(listCollection)
            # for collection in listCollection["collections"]:
            #     if collection["name"] == "Announcements":
            #         print(collection["$id"])
            #         listDocuments = database.list_documents(
            #                 collection_id=collection["$id"],
            #                 order_field="created_at",
            #                 order_type="DESC",
            #                 filters= [f"created_at>={timestamp}"] if after else [f"created_at<={timestamp}"],
            #                 limit=nbr_ancm
            #             )
            #         for document in listDocuments["documents"]:
            #             print(document)
    except Exception as e:
        print(e)
        traceback.print_exc()
    # currentTimeStamp = time.time()
    # stdout = '''{"currentTimeStamp": "''' + str(currentTimeStamp) + '''"}'''


#     stdout = '''{
#     "Accept-Language": "en-US,en;q=0.8",
#     "Host": "headers.jsontest.com",
#     "Accept-Charset": "ISO-8859-1,utf-8;q=0.7,*;q=0.3",
#     "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
# }'''

# print(stdout)

if __name__ == "__main__":
    main()

"""
{
    "getAnnouncements": true,
    "numberOfAnnouncements": 3,
    "timestamp": 1637100904,
    "after": true
}
"""
