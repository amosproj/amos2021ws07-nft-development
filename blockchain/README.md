## Testing

[Testing with Remix](https://docs.google.com/document/d/1CYdOn0eiUXAyF83s0Fz78pUXdbAVu6cv977ivMEDXYU/edit?usp=sharing)

## Deploying Kovan-Net

[Deploy to kovan](https://medium.com/nerd-for-tech/deploy-your-smart-contracts-to-a-public-testnet-7f9aef3f6039)
* after final step, copy address of smart contract
* Search https://kovan.etherscan.io/ for address to see smart contract is on-chain

## Folder structure

* contracts/: Directory for Solidity contracts
* migrations/: Directory for scriptable deployment files
* test/: Directory for test files for testing your application and contracts

## Files 

* truffle-config.js: Truffle configuration file for setting network information and other project-related settings.

* contracts/Migrations.sol: Manages and updates the status of the deployed smart contract. This file comes with every Truffle project, and is **usually not edited**.

* contracts/HelloWorld.sol: Smart contract that lets you send test-Ether to an address in order to become the owner of a test-NFT id 

* migrations/1_initial_migration.js: Migration (deployment) script for the Migrations contract found in the Migrations.sol file.

* migrations/2_hello_world.js: Migration script for the HelloWorld contract. (Migration scripts are run in order, so the file beginning with 2 will be run after the file beginning with 1.)




