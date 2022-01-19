// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import appwriteApi from "./appwriteApi";

// const contract_address = "0x50DFb637980BC140617AB92FEC1924a4AAFb9E39";
// const abi = [{ "inputs":[],"stateMutability":"nonpayable","type":"constructor" },{ "inputs":[{ "internalType":"address payable","name":"_addressToAdd","type":"address" }],"name":"addToAdmins","outputs":[],"stateMutability":"nonpayable","type":"function" },{ "inputs":[{ "internalType":"uint256","name":"_dropHash","type":"uint256" }],"name":"buyNFT","outputs":[],"stateMutability":"payable","type":"function" },{ "inputs":[{ "internalType":"uint256","name":"_dropTime","type":"uint256" },{ "internalType":"string[]","name":"_uris","type":"string[]" },{ "internalType":"uint256","name":"_weiPrice","type":"uint256" },{ "internalType":"string","name":"_nftName","type":"string" },{ "internalType":"string","name":"_nftSymbol","type":"string" }],"name":"createDrop","outputs":[],"stateMutability":"nonpayable","type":"function" },{ "inputs":[{ "internalType":"uint256","name":"_dropHash","type":"uint256" }],"name":"drop","outputs":[],"stateMutability":"nonpayable","type":"function" },{ "inputs":[{ "internalType":"uint256","name":"_dropHash","type":"uint256" }],"name":"getDropTime","outputs":[{ "internalType":"uint256","name":"dropTime","type":"uint256" }],"stateMutability":"view","type":"function" },{ "inputs":[{ "internalType":"uint256","name":"_numberOfNFTs","type":"uint256" },{ "internalType":"uint256","name":"_dropHash","type":"uint256" }],"name":"joinDrop","outputs":[],"stateMutability":"nonpayable","type":"function" },{ "inputs":[{ "internalType":"address","name":"","type":"address" },{ "internalType":"uint256","name":"","type":"uint256" }],"name":"nftAssetsInformationOfUsers","outputs":[{ "internalType":"uint256","name":"","type":"uint256" }],"stateMutability":"view","type":"function" },{ "inputs":[],"name":"numberOfDrops","outputs":[{ "internalType":"uint256","name":"","type":"uint256" }],"stateMutability":"view","type":"function" },{ "inputs":[{ "internalType":"address payable","name":"_addressToRemove","type":"address" }],"name":"removeFromAdmins","outputs":[],"stateMutability":"nonpayable","type":"function" },{ "inputs":[],"name":"user","outputs":[{ "internalType":"address","name":"","type":"address" }],"stateMutability":"view","type":"function" }];
let api = {
	contract_address: null,
	abi: null,

	web3Instance: null,

	selectedAccount: null,

	getProvider: async () => {
		return detectEthereumProvider();
	},

	getContractAddress: async () => {
		if (api.contract_address != null)
			return api.contract_address;
		return appwriteApi.getDropContractAddress().then(addr => {
			api.contract_address = addr;
			return api.contract_address;
		});
	},

	getContractAbi: async () => {
		if (api.abi != null)
			return api.abi;
		return appwriteApi.getDropContractAbi().then(abi => {
			api.abi = abi;
			return api.abi;
		});
	},

	getWeb3: async () => {
		if (api.web3Instance) {
			return api.web3Instance;
		}
		let provider = await api.getProvider();
		if (typeof provider === "undefined") {
			return null;
		}
		const accounts = await provider.request({ method: "eth_requestAccounts" });
		api.selectedAccount = accounts[0];
		api.web3Instance = await new Web3(provider);

		window.ethereum.on("accountsChanged", (accounts) => {
			api.selectedAccount = accounts[0];
		});
		return api.web3Instance;
	},

	init: async () => {
		return api.getWeb3().then(() => {
			return api.selectedAccount;
		});
	},

	getSelectedAddress: async () => {
		if (!api.selectedAccount){
			await api.init();
		}
		return api.selectedAccount;
	},

	ethToWei: (ethAmount) =>  {
		return Web3.utils.toWei(ethAmount, "ether");
	},

	getBalanceOfSelectedAddress: () => {
		return api.getWeb3().then((web3) => {
			return web3.eth.getBalance(api.selectedAccount);
		});
	},

	getContract: async () => {
		let contractAddress = await api.getContractAddress();
		let contractAbi = await api.getContractAbi();
		return api.getWeb3().then((web3) => {
			return new web3.eth.Contract(contractAbi, contractAddress);
		});
	},

	getDropTime: async (nftHash) => {
		return api.getContract().then((c) => {
			return c.methods.getDropTime(nftHash).call();
		});
	},

	getMethods: async () => {
		return api.getContract().then((c) => Object.keys(c.methods));
	},

	createDrop: async (dropTime, uris, weiPrice, reservationTimeoutSeconds, nftName, nftSymbol, receiptCallback, errorCallback) => {
		return api.getContract().then((c) => {
			return c.methods.createDrop(dropTime, uris, weiPrice, reservationTimeoutSeconds, nftName, nftSymbol).send({ from: api.selectedAccount })
				.on("receipt", receiptCallback)
				.on("error", errorCallback);
		});
	},

	joinDrop: async (dropHash, numberOfNFTsToBuy, receiptCallback, errorCallback) => {
		return api.getContract().then((c) => {
			return c.methods.joinDrop(numberOfNFTsToBuy, dropHash).send({ from: api.selectedAccount })
				.on("receipt", receiptCallback)
				.on("error", errorCallback);
		});
	},

	dropDrop: async (dropHash, receiptCallback, errorCallback) => {
		return api.getContract().then((c) => {
			return c.methods.drop(dropHash).send({ from: api.selectedAccount })
				.on("receipt", receiptCallback)
				.on("error", errorCallback);
		});
	},

	// uint256 _price, uint256 _nftHash, uint256 _dropHash
	buyNFT: async (payableAmountInWei, price, nftHash, dropHash, receiptCallback, errorCallback) => {
		return api.getContract().then((c) => {
			return c.methods.buyNFT(price, nftHash, dropHash ).send({ from: api.selectedAccount, value: payableAmountInWei })
				.on("receipt", receiptCallback)
				.on("error", errorCallback);
		});
	},

	getNftIndexOfOwnedNft: async (index) => {
		return api.getContract().then((c) => {
			return c.methods.nftAssetsInformationOfUsers(api.selectedAccount, index).call();
		});
	}

};

export default api;