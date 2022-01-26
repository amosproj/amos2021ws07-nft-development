// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import appwriteApi from "./appwriteApi";

let api = {
	contract_address: "0xa4871CD3E9264D216f3cEBCE9e1186C6Ea29A218",
	abi: [{ "inputs":[],"stateMutability":"nonpayable","type":"constructor" },{ "inputs":[{ "internalType":"address payable","name":"_addressToAdd","type":"address" }],"name":"addToAdmins","outputs":[],"stateMutability":"nonpayable","type":"function" },{ "inputs":[{ "internalType":"address payable","name":"_addressToAdd","type":"address" }],"name":"addToPartners","outputs":[],"stateMutability":"nonpayable","type":"function" },{ "inputs":[{ "internalType":"uint256","name":"_dropHash","type":"uint256" }],"name":"buyNFT","outputs":[],"stateMutability":"payable","type":"function" },{ "inputs":[{ "internalType":"uint256","name":"_dropTime","type":"uint256" },{ "internalType":"string[]","name":"_uris","type":"string[]" },{ "internalType":"uint256","name":"_weiPrice","type":"uint256" },{ "internalType":"uint256","name":"_reservationTimeoutSeconds","type":"uint256" },{ "internalType":"string","name":"_nftName","type":"string" },{ "internalType":"string","name":"_nftSymbol","type":"string" }],"name":"createDrop","outputs":[],"stateMutability":"nonpayable","type":"function" },{ "inputs":[{ "internalType":"uint256","name":"","type":"uint256" }],"name":"dropData","outputs":[{ "internalType":"address","name":"creator","type":"address" },{ "internalType":"string","name":"nftSymbol","type":"string" },{ "internalType":"string","name":"nftName","type":"string" },{ "internalType":"uint256","name":"numberOfURIs","type":"uint256" },{ "internalType":"uint256","name":"reservedCount","type":"uint256" },{ "internalType":"uint256","name":"pricePerNFT","type":"uint256" },{ "internalType":"uint256","name":"dropTime","type":"uint256" }],"stateMutability":"view","type":"function" },{ "inputs":[{ "internalType":"uint256","name":"_dropHash","type":"uint256" }],"name":"getAllURIs","outputs":[{ "internalType":"string[]","name":"allURIs","type":"string[]" }],"stateMutability":"view","type":"function" },{ "inputs":[{ "internalType":"address","name":"_userAddress","type":"address" }],"name":"getMintedContractAddresses","outputs":[{ "internalType":"address[]","name":"allContractAdresses","type":"address[]" }],"stateMutability":"view","type":"function" },{ "inputs":[{ "internalType":"uint256","name":"_dropHash","type":"uint256" }],"name":"getNotBoughtNFTs","outputs":[{ "internalType":"string[]","name":"notBought","type":"string[]" }],"stateMutability":"view","type":"function" },{ "inputs":[{ "internalType":"uint256","name":"_numberOfNFTs","type":"uint256" },{ "internalType":"uint256","name":"_dropHash","type":"uint256" }],"name":"joinDrop","outputs":[],"stateMutability":"nonpayable","type":"function" },{ "inputs":[{ "internalType":"address","name":"","type":"address" },{ "internalType":"uint256","name":"","type":"uint256" }],"name":"mintedNFTContracts","outputs":[{ "internalType":"address","name":"","type":"address" }],"stateMutability":"view","type":"function" },{ "inputs":[],"name":"numberOfDrops","outputs":[{ "internalType":"uint256","name":"","type":"uint256" }],"stateMutability":"view","type":"function" },{ "inputs":[{ "internalType":"address payable","name":"_addressToRemove","type":"address" }],"name":"removeFromAdmins","outputs":[],"stateMutability":"nonpayable","type":"function" },{ "inputs":[{ "internalType":"address payable","name":"_addressToRemove","type":"address" }],"name":"removeFromPartners","outputs":[],"stateMutability":"nonpayable","type":"function" },{ "inputs":[{ "internalType":"uint256","name":"_dropHash","type":"uint256" }],"name":"revertTimedoutReservations","outputs":[{ "internalType":"uint256","name":"","type":"uint256" }],"stateMutability":"nonpayable","type":"function" },{ "inputs":[{ "internalType":"address","name":"_address","type":"address" }],"name":"setFactoryInterface","outputs":[],"stateMutability":"nonpayable","type":"function" }],
	erc721abi: null,

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

	getErc721Abi: async () => {
		if (api.erc721abi != null)
			return api.erc721abi;
		return appwriteApi.getERC721Abi().then(abi => {
			api.erc721abi = abi;
			return api.erc721abi;
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

	weiToEth: (weiAmount) =>  {
		console.log(Web3.utils.fromWei(`${weiAmount}`, "ether"));
		return Web3.utils.fromWei(`${weiAmount}`, "ether");
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

	buyNFT: async (payableAmountInWei, dropHash, receiptCallback, errorCallback) => {
		return api.getContract().then((c) => {
			return c.methods.buyNFT(dropHash).send({ from: api.selectedAccount, value: payableAmountInWei })
				.on("receipt", receiptCallback)
				.on("error", errorCallback);
		});
	},

	addToAdmins: async (addressToAddedAsAdmins, receiptCallback, errorCallback) => {
		return api.getContract().then((c) => {
			return c.methods.addToAdmins(addressToAddedAsAdmins).send({ from: api.selectedAccount })
				.on("receipt", receiptCallback)
				.on("error", errorCallback);
		});
	},

	addToPartners: async (addressToAddedAsPartner, receiptCallback, errorCallback) => {
		return api.getContract().then((c) => {
			return c.methods.addToPartners(addressToAddedAsPartner).send({ from: api.selectedAccount })
				.on("receipt", receiptCallback)
				.on("error", errorCallback);
		});
	},


	removeFromAdmins: async (addressToRemoveFromAdmins, receiptCallback, errorCallback) => {
		return api.getContract().then((c) => {
			return c.methods.removeFromAdmins(addressToRemoveFromAdmins).send({ from: api.selectedAccount })
				.on("receipt", receiptCallback)
				.on("error", errorCallback);
		});
	},

	removeFromPartners: async (addressToRemoveFromPartners, receiptCallback, errorCallback) => {
		return api.getContract().then((c) => {
			return c.methods.addToPartners(addressToRemoveFromPartners).send({ from: api.selectedAccount })
				.on("receipt", receiptCallback)
				.on("error", errorCallback);
		});
	},

	getNftIndexOfOwnedNft: async (index) => {
		return api.getContract().then((c) => {
			return c.methods.nftAssetsInformationOfUsers(api.selectedAccount, index).call();
		});
	},

	getNftsOfConnectedAddress: async () => {
		return api.getContract().then((c) => {
			return c.methods.getMintedContractAddresses(api.selectedAccount).call().then(userNftContracts => {
				console.log(userNftContracts);
				return userNftContracts;
			});
		});
	},

	getUriOfNft: async (address) => {
		return api.getErc721Abi().then((abi) => {
			return api.getWeb3().then((web3) => {
				let c = new web3.eth.Contract(abi, address);
				return c.methods.tokenURI("1").call().then(res => {
					return res;
				}).catch(() => {
					return "google.de";
				});
			});
		});
	},

	getNameOfNft: async (address) => {
		return api.getErc721Abi().then((abi) => {
			return api.getWeb3().then((web3) => {
				let c = new web3.eth.Contract(abi, address);
				return c.methods.name().call().then(res => {
					return res;
				});
			});
		});
	},

	getOwnerOfNft: async (nftTokenAddress) => {
		return api.getErc721Abi().then((abi) => {
			return api.getWeb3().then((web3) => {
				let c = new web3.eth.Contract(abi, nftTokenAddress);
				return c.methods.ownerOf("1").call().then(res => {
					return res;
				});
			});
		});
	},

};

export default api;