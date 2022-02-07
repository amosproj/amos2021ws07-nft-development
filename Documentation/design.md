# Design Documentation

## Overview

![Architecture](images/architecture.png?raw=true "Architecture")

## Features
The features of our webservice include: 
* create and schedule NFT drops
* mint NFTs after the drop
* allow users to buy and view NFTs
* direct interaction with the blockchain
* minted NFTs usable even without the webservice
* announcements

## Decentralization

To ensure, that the sold NFTs don't depend on our server deployment, 
we aimed for a design that allows users to 
fully utilize their tokens (whatever that means) even without our backend server. 
In order to achieve that, the images of the NFTs are 
stored in the 
[InterPlanetary File System](https://en.wikipedia.org/wiki/InterPlanetary_File_System). 
The Token themselves are store in the 
[Ethereum Blockchain](https://en.wikipedia.org/wiki/Ethereum). 
(In the standard configuration the 
[Kovan Testnet](https://eth.wiki/fundamentals/testnets) it used.)

## Scalability

Although all the important functionality is decentralized and highly resilient,
our service is built on docker containers and thus easily scalable,
to ensure smooth operations during times with high traffic (drops).

## Security
All important transactions happen directly on the blockchain, meaning 
that the ownership of the NFTs is tracked outside the webservice.
The only user data, that is stored in our backend are:
* mail addresses
* usernames 
* passwords (salted and hashed)
* group memberships (Partner, Admin)
