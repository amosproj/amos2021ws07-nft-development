from appwrite.client import Client
from appwrite.services.users import Users
from appwrite.exception import AppwriteException

# replace by environment variable
PROJECT_ID = "testtesttest"
API_KEY = "testtesttesttesttesttesttesttesttest"
API_ENDPOINT = "https://[HOSTNAME_OR_IP]/v1"


def main_func():
    client = Client()

    (
        client.set_endpoint(API_ENDPOINT)  # Your API Endpoint
        .set_project(PROJECT_ID)  # Your project ID
        .set_key(API_KEY)  # Your secret API key
        .set_self_signed()  # Use only on dev mode with a self-signed SSL cert
    )

    users = Users(client)
    try:
        result = users.create("email@example.com", "password")
        print(result)
    except AppwriteException as e:
        print(e.message)


if __name__ == "__main__":
    main_func()
