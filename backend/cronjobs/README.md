This script allow you to fetch data from the blockchain and store them in the appwrite database. 
This script has to run as cron job to keep the database up to date.
Unfortunately, I wasn't able to deploy this cron job as appwrite cloud function due to some strange dependencies of the Web3 library...

Anyways, to run this cron job, you have to run the following commands:

    export WEB3_INFURA_PROJECT_ID=<YourProjectID>
    export WEB3_INFURA_API_SECRET=<YourProjectSecret>
    export ETHERSCAN_API_KEY=<YourEtherscanAPIKey>
    export FACTORY_CONTRACT_ADDRESS=<YourFactoryContractAddress>
    export MAIN_CONTRACT_ADDRESS=<YourMainContractAddress>
    export ETHEREUM_NET="kovan" or "mainnet" depending on your net
    export APPWRITE_ENDPOINT=<YourAppwriteEndpoint>
    export APPWRITE_FUNCTION_PROJECT_ID=<YourAppwriteProjectID>
    export APPWRITE_API_KEY=<YourAppwriteAPIKey>
    export DROP_COLLECTION_ID=<YourDropCollectionID>
    export ABI_COLLECTION_ID=<YourABICollectionID>

    sudo apt-get install cron
    crontab -e

Then you have to enter the following into the crontab:

    * * * * * python3 <path_to_git_repo>/backend/cronjobs/blockchain_crawler.py

Save and exit the file. Done! Now this job runs every minute.