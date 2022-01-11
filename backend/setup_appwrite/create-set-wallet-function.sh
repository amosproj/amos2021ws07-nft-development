#!/bin/sh
key=$(cat backend/setup_appwrite/api-key.txt)
project=$(cat backend/setup_appwrite/project-id.txt)
functionId=$(appwrite functions create \
        --name="set-wallet" \
        --execute="[*]" \
        --runtime="python-3.9" \
        --vars="{'a':'b'}" \
        --schedule="" \
        --timeout="1" | head -1 | cut -c7-20 )

echo "$functionId"

echo "$functionId" > ./backend/setup_appwrite/set-wallet-function-id.txt
echo "$functionId"

tag=$(appwrite functions createTag \
    --functionId="$functionId" \
    --command="python main.py" \
    --code="./backend/appwrite-functions/set-wallet" | head -1 | cut -c7-100)

echo $tag
appwrite functions updateTag \
        --functionId="$functionId" \
        --tag="$tag"
