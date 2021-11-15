#!/bin/bash
# source: https://appwrite.io/docs/upgrade

getVersion() {
	return $(docker ps | grep appwrite/appwrite)
}

if [ -n $(echo "$*" | grep -i '\binstall\b|\bappwrite\b') ]; then

	docker run -it --rm \
	    --volume /var/run/docker.sock:/var/run/docker.sock \
	    --volume "$(pwd)"/appwrite:/usr/src/code/appwrite:rw \
	    --entrypoint="install" \
	    appwrite/appwrite:0.11.0

fi

if [ -n $(echo "$*" | grep -i '\bappwrite\b') ]; then
	## backups data (what? where?)
	# TODO

	## runs migration tool
	workdir=$(pwd)
	cd appwrite/
	docker-compose exec appwrite migrate
	cd $workdir
fi

if [ -n $(echo "$*" | grep -i '\bconfig\b|\bcertificates\?\b') ]; then
	docker-compose up -d
fi

if [ -n $(echo "$*" | grep -i '\brestart\b') ]; then
	docker-compose restart appwrite   # development
	#docker-compose restart nfttheworld   # production
fi
