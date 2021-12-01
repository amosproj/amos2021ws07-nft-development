// SPDX-License-Identifier: MIT
// SDPX-FileCopyrightText: 2021 Que Le <b.le@tu-berlin.de>


import appwriteApi from "../api/appwriteApi";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
const { utils } = require( "ethers" );
import { delayMsec } from "../utils/utils";

import Typography from "@mui/material/Typography";
import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";

function AccountEntry({ data }) {
	return 	<TableRow>
		<TableCell style={{ color: "white", borderBottom: "none" }}>
			{data.pubAddress}
		</TableCell>
		<TableCell style={{ color: "white", borderBottom: "none" }}>
			{utils.formatEther(data.balance)}
		</TableCell>
	</TableRow>;
}

function EthereumAccountDetails ({ publicAddresses }) {
	const [detailData, setDetailData] = useState([]);

	async function fetchAccountsDetails(publicAddresses) {
		// TODO: publicAddresses is still not loaded. 
		// Solve temporarily by waiting for 0.5 sec.
		await delayMsec(500);
		const provider = await detectEthereumProvider();
		if (!provider) {
			console.error("no ethereum provider");
			return;
		}
		let accountDetails = [];
		const length = publicAddresses.length;

		for (let i=0; i<length; i++) {
			let pubAddress = publicAddresses[i];
			const balance = await provider.request({ 
				method: "eth_getBalance", 
				params: [pubAddress, "latest"] 
			});	// "Wei" balance in hex format, like 0x5a4e1804f198f1d99.
			if (balance) {
				accountDetails.push({ 
					pubAddress: pubAddress,
					balance: balance
				});
			}
		}
		setDetailData(accountDetails);
	}

	useEffect(() => {
		fetchAccountsDetails(publicAddresses);
	}, []);

	return <TableContainer style={{ color: "white" }}>
		<Table>
			<TableBody>
				<TableRow>
					<TableCell style={{ color: "white", borderBottom: "none" }}>
						<Typography variant="subtitle1" gutterBottom component="div">
							Account (Public Address)
						</Typography>
					</TableCell>
					<TableCell style={{ color: "white", borderBottom: "none" }}>
						<Typography variant="subtitle1" gutterBottom component="div">
							Balance (Eth)
						</Typography>
					</TableCell>
				</TableRow>
				{detailData.map((value, key) => {
					return <AccountEntry key={key} data={value} />;
				})}
			</TableBody>
		</Table>
	</TableContainer>;
}

/**
 * Component to display and add Eth address from Wallet. Currently only Metamask is supported.
 * @param user user object of the currently logged in user/admin
 * @returns {JSX.Element}
 */
export default function Wallet({ user }) {
	const [loadedAddresses, setLoadedAddresses] = useState(false);
	const [publicAddresses, setPublicAddresses] = useState([]);
	const history = useHistory();

	const routeChange = (path) =>{
		history.push(path);
	};

	const getEthAddressesFromServer = () => {
		if (!loadedAddresses) {
			appwriteApi.getOwnEthAddress(user.$id)
				.then(result => {
					// Set the address(es)
					let currentPubAddr = publicAddresses;
					for (let i = 0; i < result.sum; i++) {
						currentPubAddr.push(result.documents[i].walletAddress);
					}
					setPublicAddresses(currentPubAddr);
					setLoadedAddresses(true);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};

	useEffect(() => {
		getEthAddressesFromServer();
	}, []);

	if (!user){
		routeChange("/");
		return <></>;
	}

	/* Handle button connect to MetaMask */
	const handleAddMetaMask = async () => {
		const ethereum = await detectEthereumProvider();
		// Ref: https://docs.metamask.io/guide/rpc-api.html#table-of-contents
		let pubAddr = 0;
		if (ethereum) {
			const accounts = await ethereum.request({ method: "eth_requestAccounts" });
			const account = accounts[0];
			pubAddr = account;
			// Set address on server side
			appwriteApi.setEthAddress(pubAddr);

			let currentPubAddr = publicAddresses;
			currentPubAddr.push(pubAddr);
			setPublicAddresses(currentPubAddr);
		} else {
			console.log("Please install MetaMask!");
			return;
		}
	};

	return <Grid item style={{ width: "100%" }}>
		{!publicAddresses
			?
			<Button variant="outlined" style={{ margin: 15 }} onClick={handleAddMetaMask}>Connect MetaMask wallet</Button>
			:
			<EthereumAccountDetails publicAddresses={publicAddresses} />
		}
	</Grid>;
}