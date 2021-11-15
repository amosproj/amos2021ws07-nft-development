# NFT Development (AMOS WS 2021/22)

<a href="https://github.com/amosproj/amos-ss2021-is-project-linter">
  <p align="center">
    <img src="https://user-images.githubusercontent.com/58464184/142979963-59cbde55-f9dd-4e4e-a540-22f48a52859a.png" width="300"/>
  </p>
</a>

This project aims to create a reusable example application which generates valid NFTs and automatizes important steps in order to lower the usability hurdles and improve crucial adoption. As an open source project, the result can be used by others, also for small to medium sized companies, to easily create NFT solutions for their own marketing strategies, sales management or online campaigns for several non- or commercial purposes. A private secondary market mechanism can be supported for a deeper relationship of customers to the owning seller. In particular, we are creating a web service that can be used to buy and trade NFTs of Nürnberg and Riga on the Ethereum Kovan Testnet.



## License

This project is licensed under the MIT License. Please see the <a href="./LICENSE">LICENSE</a> file in the root directory for more information on the license.

# Get Ready To NFT the world! 

The Appwrite backend runs on multiple microservices isolated as docker containers.
First you need to get the appwrite containers via following command. Only needs to execute once when the containers are not available locally:

```
./upgrade install
```

It will ask you certain questions. The answer will not matter because we have our own configuration.  
For the API key, paste the key from the `openssl` file. You should choose `localhost` as name for both domains.

After being done, you can access the console in the browser with the URL `localhost`. You can signup, create a project there, set a platform (Web App).

If you want to control AppWrite with code rather than manually with the GUI, you can install the `appwrite` Web SDK with `npm install appwrite`.

# Updating

To deploy new configuration or environment variables, copy them from `developer/` or `production/` to `appwrite/`, e.g.

```
cp developer/* appwrite/
```

and you can update AppWrite with the new data on the fly with

```
./upgrade config
```

To get a new SSL certificate, do

```
./upgrade certificate
```

In order to upgrade AppWrite to the **next** version, hit

```
./upgrade appwrite
```

and if a service hangs, it could be helpful to restart the AppWrite with

```
./upgrade restart
```

All those keywords for `upgrade` can be arbitrarily combined in arbitrary order.
