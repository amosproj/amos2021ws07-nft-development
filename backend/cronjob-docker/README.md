Things you have to do:

- create infura account and set up a free API key
- create etherscan account and set up a free API key
- configure .env file
- go to -> cd backend/cronjob-docker
- run: docker build -t blockchain-crawler .
- run: docker run --env-file .env -d -it blockchain-crawler
