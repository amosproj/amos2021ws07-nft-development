# SPDX-License-Identifier: MIT
# SPDX-FileCopyrightText: 2021 Felix Steinkohl <steinkohl@campus.tu-berlin.de>

import os
from appwrite.client import Client
from appwrite.services.database import Database


def init_client(
    project_id: str = os.getenv("APPWRITE_PROJECT"),
    endpoint: str = os.getenv("APPWRITE_ENDPOINT"),
    api_key: str = os.getenv("APPWRITE_API_KEY"),
) -> Client:
    """
    Initializes the appwrite client object.

    :param project_id: Project ID of the targeted appwrite project
    :type project_id: str
    :param endpoint: URL of the appwrite endpoint
    :type endpoint: str
    :param api_key: API key to access appwrite backend
    :type api_key: str
    :return: Initialized appwrite client object
    :rtype: Client
    """
    _client = Client()
    _client.set_endpoint(endpoint)
    _client.set_project(project_id)
    _client.set_key(api_key)
    return _client


def get_existing_collection_names(collection: Database) -> [str]:
    """
    Gets a list of names of existing collections.

    :param collection: Appwrite database object
    :type collection: Database
    :return: List of names of existing collections
    :rtype: [str]
    """
    return [x["name"] for x in collection.list_collections()["collections"]]


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(
        "\nThis script creates all necessary database collections.\n"
    )
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

    appwrite_api_key = (
        str(args.apikey) if args.apikey else os.getenv("APPWRITE_API_KEY")
    )
    appwrite_endpoint = (
        str(args.endpoint) if args.endpoint else os.getenv("APPWRITE_ENDPOINT")
    )
    appwrite_project_id = (
        str(args.projectid) if args.projectid else os.getenv("APPWRITE_PROJECT")
    )

    print(
        f"Appwrite endpoint: {appwrite_endpoint}\n"
        f"Appwrite project ID: {appwrite_project_id}\n"
        f"Appwrite API key: {appwrite_api_key}\n"
    )

    if None in [appwrite_api_key, appwrite_endpoint, appwrite_project_id]:
        print(
            "Appwrite API key, project id and endpoint url must be provided "
            "via command line arguments or environment variables"
        )
        exit()

    client = init_client(
        api_key=appwrite_api_key,
        endpoint=appwrite_endpoint,
        project_id=appwrite_project_id,
    )
    database = Database(client=client)
    existing_collections = get_existing_collection_names(database)
    print(f"Already existing collections: {existing_collections}")

    if "ABIs" not in existing_collections:
        print('Create "ABIs" Collection ...', end="")
        abi_res = database.create_collection(
            "ABIs",  # Collection Name
            ["*"],  # Read permissions
            ["team:Admins"],  # Write permissions
            [
                {
                    "label": "contract_name",
                    "key": "contract_name",
                    "type": "text",
                    "required": True,
                    "array": False,
                },
                {
                    "label": "contract_address",
                    "key": "contract_address",
                    "type": "text",
                    "required": True,
                    "array": False,
                },
                {
                    "label": "contract_abi",
                    "key": "contract_abi",
                    "type": "text",
                    "required": False,
                    "array": False,
                },
                {
                    "label": "description",
                    "key": "description",
                    "type": "text",
                    "required": False,
                    "array": False,
                },
            ],
        )
        print(" Done")

    if "Drops" not in existing_collections:
        print('Create "Drops" Collection ...', end="")
        drop_res = database.create_collection(
            "Drops",  # Collection Name
            ["*"],  # Read permissions
            ["team:Admins"],  # Write permissions
            [
                {
                    "label": "drop_contract",
                    "key": "drop_contract",
                    "type": "text",
                    "required": True,
                    "array": False,
                },
                {
                    "label": "drop_id",
                    "key": "drop_id",
                    "type": "numeric",
                    "required": True,
                    "array": False,
                },
                {
                    "label": "drop_time",
                    "key": "drop_time",
                    "type": "numeric",
                    "required": True,
                    "array": False,
                },
                {
                    "label": "drop_name",
                    "key": "drop_name",
                    "type": "text",
                    "required": False,
                    "array": False,
                },
                {
                    "label": "drop_symbol",
                    "key": "drop_symbol",
                    "type": "text",
                    "required": False,
                    "array": False,
                },
                {
                    "label": "drop_uris",
                    "key": "drop_uris",
                    "type": "text",
                    "required": False,
                    "array": False,
                },
                {
                    "label": "drop_size",
                    "key": "drop_size",
                    "type": "numeric",
                    "required": False,
                    "array": False,
                },
                {
                    "label": "drop_price",
                    "key": "drop_price",
                    "type": "numeric",
                    "required": False,
                    "array": False,
                },
                {
                    "label": "drop_creator",
                    "key": "drop_creator",
                    "type": "text",
                    "required": False,
                    "array": False,
                },
                {
                    "label": "drop_creator_name",
                    "key": "drop_creator_name",
                    "type": "text",
                    "required": False,
                    "array": False,
                },
                {
                    "label": "drop_reserved",
                    "key": "drop_reserved",
                    "type": "numeric",
                    "required": False,
                    "array": False,
                },
                {
                    "label": "last_updated",
                    "key": "last_updated",
                    "type": "numeric",
                    "required": False,
                    "array": False,
                },
            ],
        )
        print(" Done")

    if "Announcements" not in existing_collections:
        print('Create "Announcements" Collection ...', end="")
        ancm_res = database.create_collection(
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
        print(" Done")
