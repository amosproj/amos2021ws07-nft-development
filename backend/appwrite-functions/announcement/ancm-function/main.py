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
    client = init_client()
    database = Database(client)
    PAYLOAD = os.environ.get("APPWRITE_FUNCTION_DATA")
    if not PAYLOAD:
        PAYLOAD = '{"getAnnouncements":true,"numberOfAnnouncements":3,"timestamp":1637100904,"after":true}'
    # print("PAYLOAD: " + str(PAYLOAD))

    try:
        client_payload = json.loads(PAYLOAD)
        if client_payload["getAnnouncements"]:
            # Extract data from payload
            nbr_ancm = client_payload["numberOfAnnouncements"]
            timestamp = client_payload["timestamp"]
            after = client_payload["after"]
            # Prepare payload to return to client
            return_payload = {"getAnnouncements": True, "sum": -1, "announcements": []}
            # Get "Announcements" collection ID
            listCollection = database.list_collections()
            for collection in listCollection["collections"]:
                if collection["name"] == "Announcements":
                    # Query data from collection
                    listDocuments = database.list_documents(
                        collection_id=collection["$id"],
                        order_field="created_at",
                        order_type="DESC",
                        filters=[f"created_at>={timestamp}"]
                        if after
                        else [f"created_at<={timestamp}"],
                        limit=nbr_ancm,
                    )
                    # Add data to payload
                    return_payload["sum"] = len(listDocuments["documents"])
                    for document in listDocuments["documents"]:
                        return_payload["announcements"].append(
                            {
                                "created_at": document["created_at"],
                                "updated_at": document["updated_at"],
                                "content": document["content"],
                            }
                        )
                    # There is no way to return JSON data back directly to client, so we transfer by using stdout.
                    print(json.dumps(return_payload))
                    exit()

        elif client_payload["addAnnouncements"]:
            announcements = client_payload["announcements"]
            listCollection = database.list_collections()
            for collection in listCollection["collections"]:
                if collection["name"] == "Announcements":
                    for ancm in announcements:
                        createDocumentResult = database.create_document(
                            collection_id=collection["$id"],
                            data={
                                "created_at": time.time(),
                                "updated_at": time.time(),
                                "content": ancm,
                            },
                        )
                    # Success message
                    print(
                        json.dumps(
                            {"addAnnouncements": True, "sum": len(announcements)}
                        )
                    )

    except Exception as e:
        traceback.print_exc()


if __name__ == "__main__":
    main()
