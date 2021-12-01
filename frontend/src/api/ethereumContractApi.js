// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import Web3 from "web3";

const contract_address = "0xA8C4e9a4B7F6d5A818b5f2d6D7FB6d202D542646";
const abi = [{ "inputs":[{ "internalType":"uint256","name":"","type":"uint256" },{ "internalType":"uint256","name":"","type":"uint256" }],"name":"availableNFTs","outputs":[{ "internalType":"uint256","name":"","type":"uint256" }],"stateMutability":"view","type":"function" },{ "inputs":[{ "internalType":"uint256","name":"","type":"uint256" }],"name":"availableNFTsCount","outputs":[{ "internalType":"uint256","name":"","type":"uint256" }],"stateMutability":"view","type":"function" },{ "inputs":[{ "internalType":"uint256","name":"_price","type":"uint256" },{ "internalType":"uint256","name":"_nftHash","type":"uint256" },{ "internalType":"uint256","name":"_dropHash","type":"uint256" }],"name":"buyNFT","outputs":[],"stateMutability":"payable","type":"function" },{ "inputs":[{ "internalType":"uint256","name":"_dropTime","type":"uint256" },{ "internalType":"uint256","name":"_numberOfNFTS","type":"uint256" }],"name":"createDrop","outputs":[],"stateMutability":"nonpayable","type":"function" },{ "inputs":[{ "internalType":"uint256","name":"_dropHash","type":"uint256" }],"name":"drop","outputs":[],"stateMutability":"nonpayable","type":"function" },{ "inputs":[{ "internalType":"uint256","name":"","type":"uint256" }],"name":"dropHashes","outputs":[{ "internalType":"uint256","name":"","type":"uint256" }],"stateMutability":"view","type":"function" },{ "inputs":[{ "internalType":"uint256","name":"_dropHash","type":"uint256" }],"name":"getDropTime","outputs":[{ "internalType":"uint256","name":"dropTime","type":"uint256" }],"stateMutability":"view","type":"function" },{ "inputs":[{ "internalType":"uint256","name":"_numberOfNFTs","type":"uint256" },{ "internalType":"uint256","name":"_dropHash","type":"uint256" }],"name":"joinDrop","outputs":[],"stateMutability":"nonpayable","type":"function" },{ "inputs":[{ "internalType":"uint256","name":"","type":"uint256" },{ "internalType":"uint256","name":"","type":"uint256" }],"name":"joinedUsers","outputs":[{ "internalType":"address","name":"","type":"address" }],"stateMutability":"view","type":"function" },{ "inputs":[{ "internalType":"uint256","name":"","type":"uint256" }],"name":"maxNumberOfNFTsToBuy","outputs":[{ "internalType":"uint256","name":"","type":"uint256" }],"stateMutability":"view","type":"function" },{ "inputs":[{ "internalType":"address","name":"","type":"address" },{ "internalType":"uint256","name":"","type":"uint256" }],"name":"nftAssetsInformationOfUsers","outputs":[{ "internalType":"uint256","name":"","type":"uint256" }],"stateMutability":"view","type":"function" },{ "inputs":[{ "internalType":"uint256","name":"","type":"uint256" },{ "internalType":"uint256","name":"","type":"uint256" }],"name":"nftOwnerships","outputs":[{ "internalType":"address","name":"owner","type":"address" },{ "internalType":"uint256","name":"nftId","type":"uint256" },{ "internalType":"uint256","name":"dropId","type":"uint256" },{ "internalType":"uint256","name":"dropTime","type":"uint256" },{ "internalType":"address","name":"reservedFor","type":"address" }],"stateMutability":"view","type":"function" },{ "inputs":[{ "internalType":"address","name":"","type":"address" },{ "internalType":"uint256","name":"","type":"uint256" }],"name":"nftReservationInformationOfUsers","outputs":[{ "internalType":"uint256","name":"","type":"uint256" }],"stateMutability":"view","type":"function" },{ "inputs":[{ "internalType":"address","name":"","type":"address" }],"name":"nftReservations","outputs":[{ "internalType":"uint256","name":"","type":"uint256" }],"stateMutability":"view","type":"function" },{ "inputs":[{ "internalType":"uint256","name":"","type":"uint256" }],"name":"reservedNFTsCount","outputs":[{ "internalType":"uint256","name":"","type":"uint256" }],"stateMutability":"view","type":"function" },{ "inputs":[],"name":"user","outputs":[{ "internalType":"address","name":"","type":"address" }],"stateMutability":"view","type":"function" }];

let api = {
	web3Instance: null,

	selectedAccount: null,

	getProvider: () => {
		return window.ethereum;
	},

	getWeb3: async () => {
		if (api.web3Instance) {
			return api.web3Instance;
		}
		let provider = api.getProvider();
		if (typeof provider !== "undefined") {
			const accounts = await provider.request({ method: "eth_requestAccounts" });
			api.selectedAccount = accounts[0];
			api.web3Instance = await new Web3(provider);

			window.ethereum.on("accountsChanged", (accounts) => {
				api.selectedAccount = accounts[0];
			});
			return api.web3Instance;
		} else {
			return null;
		}
	},

	init: async () => {
		api.getWeb3().then(() => {
			console.log(api.selectedAccount);
		});
	},

	getSelectedAddress: async () => {
		if (!api.selectedAccount){
			await api.init();
		}
		return api.selectedAccount;
	},

	getBalanceOfSelectedAddress: () => {
		return api.getWeb3().then((web3) => {
			return web3.eth.getBalance(api.selectedAccount);
		});
	},

	getContract: async (abi, address) => {
		return api.getWeb3().then((web3) => {
			return new web3.eth.Contract(abi, address);
		});
	},

	getDropTime: async (nftHash) => {
		return api.getContract(abi, contract_address).then((c) => {
			return c.methods.getDropTime(nftHash).call();
		});
	},

	getMethods: async () => {
		return api.getContract(abi, contract_address).then((c) => Object.keys(c.methods));
	},

	createDrop: async (dropTime, numberOfNFTs, receiptCallback, errorCallback) => {
		return api.getContract(abi, contract_address).then((c) => {
			return c.methods.createDrop(dropTime, numberOfNFTs).send({ from: api.selectedAccount })
				.on("receipt", receiptCallback)
				.on("error", errorCallback);
		});
	},

	joinDrop: async (dropHash, numberOfNFTsToBuy, receiptCallback, errorCallback) => {
		return api.getContract(abi, contract_address).then((c) => {
			return c.methods.joinDrop(numberOfNFTsToBuy, dropHash).send({ from: api.selectedAccount })
				.on("receipt", receiptCallback)
				.on("error", errorCallback);
		});
	},

	dropDrop: async (dropHash, receiptCallback, errorCallback) => {
		return api.getContract(abi, contract_address).then((c) => {
			return c.methods.drop(dropHash).send({ from: api.selectedAccount })
				.on("receipt", receiptCallback)
				.on("error", errorCallback);
		});
	},

	// uint256 _price, uint256 _nftHash, uint256 _dropHash
	buyNFT: async (payableAmountInWei, price, nftHash, dropHash, receiptCallback, errorCallback) => {
		return api.getContract(abi, contract_address).then((c) => {
			return c.methods.buyNFT(price, nftHash, dropHash ).send({ from: api.selectedAccount, value: payableAmountInWei })
				.on("receipt", receiptCallback)
				.on("error", errorCallback);
		});
	},

	getNftIndexOfOwnedNft: async (index) => {
		return api.getContract(abi, contract_address).then((c) => {
			return c.methods.nftAssetsInformationOfUsers(api.selectedAccount, index).call();
		});
	}

};

export default api;