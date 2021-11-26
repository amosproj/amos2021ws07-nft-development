#!/bin/sh
key=$(cat api-key.txt)
project=$(cat project-id.txt)
echo "$key"
echo "$project"
appwrite client setEndpoint --endpoint="http://localhost/v1"
appwrite client setProject --project="$project"
appwrite client setKey --key="$key"
appwrite client setSelfSigned --value=true
appwrite client setLocale --locale="en-US"
