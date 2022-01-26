// SPDX-License-Identifier: MIT
// SDPX-FileCopyrightText: 2021 Que Le <b.le@tu-berlin.de>


import appwriteApi from "../api/appwriteApi";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
const { utils } = require( "ethers" );

import Typography from "@mui/material/Typography";
import {
	Container,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import ConditionalAlert from "./ConditionalAlert";

import { CenterBox, } from "./common";

function AccountEntry({ data }) {
	let balance = "-.-";
	// data.balance can have NaN value if no Metamask or other Wallet installed
	if (!isNaN(data.balance)) {
		balance = utils.formatEther(data.balance);
	}
	
	return <TableRow>
		<TableCell style={{ color: "white", borderBottom: "none" }}>
			{data.pubAddress}
		</TableCell>
		<TableCell style={{ color: "white", borderBottom: "none" }}>
			{balance}
		</TableCell>
	</TableRow>;
}

function EthereumAccountDetails ({ publicAddresses, setErrorNoMetamaskMessage }) {
	const [detailData, setDetailData] = useState([]);

	async function fetchAccountsDetails(publicAddresses) {
		const provider = await detectEthereumProvider();
		let details = [];
		if (!provider) {
			setErrorNoMetamaskMessage("Couldn't get data from Ethereum Provider. Please install MetaMask!");
			console.error("no ethereum provider");
			// Display only ETH address from backend
			publicAddresses.map(pubAddress => {
				details.push({ "pubAddress": pubAddress, "balance": NaN });
			}) ;
			setDetailData(details);
			return;
		}
		const length = publicAddresses.length;
		for (let i=0; i<length; i++) {
			let pubAddress = publicAddresses[i];
			const balance = await provider.request({ 
				method: "eth_getBalance", 
				params: [pubAddress, "latest"] 
			});	// "Wei" balance in hex format, like 0x5a4e1804f198f1d99.
			if (balance) {
				details.push({ 
					pubAddress: pubAddress,
					balance: balance
				});
			}
		}
		setDetailData(details);
	}

	useEffect(() => {
		fetchAccountsDetails(publicAddresses);
	}, [publicAddresses]);

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
 * @param ConnectWalletButton JSX component which accepts an onClick and style property.
 * @returns {JSX.Element}
 */
export default function Wallet({ user, ConnectWalletButton }) {
	const [isAddressesLoaded, setIsAddressesLoaded] = useState(false);
	const [publicAddresses, setPublicAddresses] = useState([]);
	const [errorNoMetamaskMessage, setErrorNoMetamaskMessage] = useState("");

	const history = useHistory();

	const routeChange = (path) =>{
		history.push(path);
	};

	const getEthAddressesFromServer = () => {
		if (!isAddressesLoaded) {
			appwriteApi.getOwnEthAddress(user.$id)
				.then(result => {
					// Set the address(es)
					let currentPubAddr = publicAddresses;
					for (let i = 0; i < result.sum; i++) {
						currentPubAddr.push(result.documents[i].walletAddress);
					}
					setPublicAddresses(currentPubAddr);
					setIsAddressesLoaded(true);
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

	const handleAddMetaMask = async () => {
		const ethereum = await detectEthereumProvider();
		// Ref: https://docs.metamask.io/guide/rpc-api.html#table-of-contents
		if (ethereum === null) {
			setErrorNoMetamaskMessage("Please install MetaMask!");
			console.log("Please install MetaMask!");
			return;
		}
		const accounts = await ethereum.request({ method: "eth_requestAccounts" });
		const newPublicAddress  = accounts[0];
		// Set address on server side
		appwriteApi.setEthAddress(newPublicAddress);
		setPublicAddresses(publicAddresses => [...publicAddresses, newPublicAddress]);
	};

	return <Grid item style={{ width: "100%" }}>
		{publicAddresses.length==0
			?
			<CenterBox>
				<ConnectWalletButton onClick={handleAddMetaMask} />
			</CenterBox>
			:
			<EthereumAccountDetails publicAddresses={publicAddresses} setErrorNoMetamaskMessage={setErrorNoMetamaskMessage} />
		}
		<Container style={{ margin: 15 }}>
			<ConditionalAlert severity="error" text={errorNoMetamaskMessage} />
		</Container>
	</Grid>;
}