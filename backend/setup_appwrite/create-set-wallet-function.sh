#!/bin/sh
key=$(cat api-key.txt)
project=$(cat project-id.txt)
functionId=$(appwrite functions create \
        --name="set-wallet" \
        --execute="[*]" \
        --runtime="python-3.9" \
        --vars="{}" \
        --schedule="" \
        --timeout="1" | head -1 | cut -c7-20 )

echo "$functionId"


