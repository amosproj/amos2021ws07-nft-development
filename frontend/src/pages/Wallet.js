// SPDX-License-Identifier: MIT
// SDPX-FileCopyrightText: 2021 Que Le <b.le@tu-berlin.de>

import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import appwriteApi from "../api/appwriteApi";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import CenterFlexBoxMedium from "../components/CenterFlexBoxMedium";
const { utils } = require( "ethers" );

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

	return <TableContainer  style={{ color: "white" }}>
		<Table>
			<TableBody>
				<TableRow>
					<TableCell style={{ color: "white", borderBottom: "none" }}>Account (Public Address)</TableCell>
					<TableCell style={{ color: "white", borderBottom: "none" }}>Balance (Eth)</TableCell>
				</TableRow>
				{detailData.map((value, key) => {
					return <AccountEntry key={key} data={value}/>;
				})}
			</TableBody>
		</Table>
	</TableContainer>;
}

export default function Wallet({ user, setUser }) {
	const [publicAddresses, setPublicAddresses] = useState("");
	const history = useHistory();

	const routeChange = (path) =>{
		history.push(path);
	};

	useEffect(() => {
		// Get current logged in user
		appwriteApi.getAccount()
			.then(user => { 
				setUser(user);
				// Get ETH address for this user
				appwriteApi.getOwnEthAddress(user.$id)
					.then(result => {
						// Set the address(es)
						for (let i=0; i<result.sum; i++) {
							if (publicAddresses) {
								setPublicAddresses(publicAddresses.push(result.documents[i].walletAddress));
							} else {
								setPublicAddresses([result.documents[i].walletAddress]);
							}
						}
					});
			});
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
			if (publicAddresses) {
				setPublicAddresses(publicAddresses.push(pubAddr));
			} else {
				setPublicAddresses([pubAddr]);
			}
		} else {
			console.log("Please install MetaMask!");
			return;
		}
	};

	return <CenterFlexBoxMedium style={{ maxWidth: "md" }}>
		<Grid
			container
			spacing={2}
			alignItems="center"
			justifyContent="center"
			direction="column">
			<Grid item style={{ width: "100%" }}>
				{!publicAddresses
					?
					<Button color="inherit" onClick={handleAddMetaMask}>Connect MetaMask wallet</Button>
					:
					<EthereumAccountDetails publicAddresses={publicAddresses}/>
				}
			</Grid>
		</Grid>
	</CenterFlexBoxMedium>;
}