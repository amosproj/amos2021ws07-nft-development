// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import appwriteApi from "./appwriteApi";

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
	}

};

export default api;