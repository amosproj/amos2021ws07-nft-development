This script allows you to register users in appwrite projects, add them to teams with certain roles.
You just have to load a csv or excel file in the layout of the provided template.
API key, endpoint and project ID also have to be specified via environment variables or arguments.

       python3 main.py [-h] [--apikey APIKEY] [--endpoint ENDPOINT] [--projectid PROJECTID] file

positional arguments:

    file                   Path of file containing the user data

optional arguments:
  
    -h, --help             show this help message and exit
    --apikey APIKEY        API key to access appwrite backend, you can instead also set the environment variable APPWRITE_API_KEY
    --endpoint ENDPOINT    URL of the appwrite endpoint, you can instead also set the environment variable APPWRITE_ENDPOINT
    --projectid PROJECTID  Project ID of the targeted appwrite project, you can instead also set the environment variable APPWRITE_PROJECT_ID
