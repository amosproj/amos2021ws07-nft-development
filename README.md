# NFT Development (AMOS WS 2021/22)

<a href="https://github.com/amosproj/amos-ss2021-is-project-linter">
  <p align="center">
    <img src="https://user-images.githubusercontent.com/58464184/142979963-59cbde55-f9dd-4e4e-a540-22f48a52859a.png" width="300"/>
  </p>
</a>

This project aims to create a reusable example application which generates valid NFTs and automatizes important steps in order to lower the usability hurdles and improve crucial adoption.  

As an open source project, the result can be used by others, also for small to medium sized companies, to easily create NFT solutions for their own marketing strategies, sales management or online campaigns for several non- or commercial purposes.  

A private secondary market mechanism can be supported for a deeper relationship of customers to the owning seller.  

In particular, we are creating a web service that can be used to buy and trade NFTs of Nürnberg and Riga on the Ethereum Kovan Testnet.


## License

This project is licensed under the MIT License. Please see the <a href="./LICENSE">LICENSE</a> file in the root directory for more information on the license.


## Get Ready To NFT the world! 

The Appwrite backend runs on multiple microservices isolated as docker containers.  

This command will install and run Appwrite.  

```{bash}
sudo docker run -it --rm \
	--volume /var/run/docker.sock:/var/run/docker.sock \
	--volume "$(pwd)"/appwrite:/usr/src/code/appwrite:rw \
	--entrypoint="install" \
	appwrite/appwrite:0.11.0
```

It will ask you certain questions. The answer will not matter because we have our own configuration.  
For the API key, paste the key from the `openssl` file. You should choose `localhost` as name for both domains.  

You can start the appwrite containers via following command.  

```{bash}
sudo docker-compose start appwrite
```

After being done, you can access the console in the browser with the URL `localhost`. You can signup, create a project there, set a platform (Web App).

If you want to control AppWrite with code rather than manually with the GUI, you can install the `appwrite` command line interface:

```
curl -sL https://appwrite.io/cli/install.sh | sudo bash
```

## Update

After the environment variables or `docker-compose.yml` was updated, the application can be updated with

```{bash}
sudo docker-compose up -d
```
