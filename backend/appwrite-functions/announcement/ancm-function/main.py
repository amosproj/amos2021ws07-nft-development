import os
import json
import time
import traceback
import sys

from appwrite.client import Client
from appwrite.services.database import Database


def init_client():
    # Initialize the Appwrite client
    client = Client()
    client.set_endpoint(os.getenv("APPWRITE_ENDPOINT"))
    client.set_project(os.getenv("APPWRITE_FUNCTION_PROJECT_ID"))
    client.set_key(os.getenv("APPWRITE_API_KEY"))

    return client


def print_failure_message(message: str):
    print(json.dumps({"status": "failure", "message": message}))


def main():
    client = init_client()
    database = Database(client)
    PAYLOAD = os.environ.get("APPWRITE_FUNCTION_DATA")
    if not PAYLOAD:
        exit()

    try:
        client_payload = json.loads(PAYLOAD)
        if "action" not in client_payload:
            print_failure_message("'action' key not found in data object!")
            exit()
        # Get "Announcements" collection ID
        collection_id = -1
        listCollection = database.list_collections()
        for collection in listCollection["collections"]:
            if collection["name"] == "Announcements":
                collection_id = collection["$id"]
                break
        if collection_id == -1:
            print_failure_message("Internal error")
            # TODO: hide this information from client. Now we need it for debugging. May be log system?
            print("'Announcements' collection not found!", file=sys.stderr)
            exit()

        if client_payload["action"] == "getAnnouncements":
            # Extract data from payload
            nbr_ancm = client_payload["numberOfAnnouncements"]
            timestamp = client_payload["timestamp"]
            after = client_payload["after"]
            # Prepare payload to return to client
            return_payload = {
                "action": "getAnnouncements",
                "status": "success",
                "sum": -1,
                "announcements": [],
            }
            # # Get "Announcements" collection ID
            # listCollection = database.list_collections()
            # for collection in listCollection["collections"]:
            #     if collection["name"] == "Announcements":
            # Query data from collection
            listDocuments = database.list_documents(
                collection_id=collection_id,  # collection["$id"],
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
                        "title": document["title"],
                        "content": document["content"],
                    }
                )
            # There is no way to return JSON data back directly to client, so we transfer by using stdout.
            print(json.dumps(return_payload))
            exit()

        elif client_payload["action"] == "addAnnouncements":
            announcements = client_payload["announcements"]
            # listCollection = database.list_collections()
            # for collection in listCollection["collections"]:
            #     if collection["name"] == "Announcements":
            for ancm in announcements:
                createDocumentResult = database.create_document(
                    collection_id=collection_id,  # collection["$id"],
                    data={
                        "created_at": time.time(),
                        "updated_at": time.time(),
                        "title": ancm["title"],
                        "content": ancm["content"],
                    },
                )
            # Success message
            print(
                json.dumps(
                    {
                        "action": "addAnnouncements",
                        "status": "success",
                        "sum": len(announcements),
                    }
                )
            )
        elif client_payload["action"] == "updateAnnouncements":
            announcements = client_payload["announcements"]
            updated = []
            for anmc in announcements:
                created_at = anmc["created_at"]
                listDocuments = database.list_documents(
                    collection_id=collection_id,  # collection["$id"],
                    order_field="created_at",
                    filters=[f"created_at={created_at}"],
                    limit=1,
                )
                # Update the document
                if len(listDocuments["documents"]) == 1:
                    database.update_document(
                        collection_id=collection_id,
                        document_id=listDocuments["documents"][0]["$id"],
                        data={
                            "updated_at": time.time(),
                            "title": anmc["title"],
                            "content": anmc["content"],
                        },
                    )
                    updated.append(created_at)
            # Success message
            print(
                json.dumps(
                    {
                        "action": "updateAnnouncements",
                        "status": "success",
                        "sum": len(updated),
                        "updated": updated,
                    }
                )
            )

        elif client_payload["action"] == "removeAnnouncements":
            anmc_created_dates = client_payload["created_dates"]
            removed = []
            for anmc_date in anmc_created_dates:
                listDocuments = database.list_documents(
                    collection_id=collection_id,  # collection["$id"],
                    order_field="created_at",
                    filters=[f"created_at={anmc_date}"],
                    limit=1,
                )
                # Remove the document
                if len(listDocuments["documents"]) == 1:
                    database.delete_document(
                        collection_id=collection_id,
                        document_id=listDocuments["documents"][0]["$id"],
                    )
                    removed.append(anmc_date)
            # Success message
            print(
                json.dumps(
                    {
                        "action": "removeAnnouncements",
                        "status": "success",
                        "sum": len(removed),
                        "removed": removed,
                    }
                )
            )
    except Exception as e:
        traceback.print_exc()


if __name__ == "__main__":
    main()
