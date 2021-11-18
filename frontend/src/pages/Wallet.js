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

function AccountEntry({ data }) {
	return 	<TableRow>
		<TableCell style={{ color: "white", borderBottom: "none" }}>{data.pubAddres}</TableCell>
		<TableCell style={{ color: "white", borderBottom: "none" }}>{parseInt(data.bl, 16)}</TableCell>
	</TableRow>;
}

function EthAccountsDetail({ publicAddresses }) {
	const [detailData, setDetailData] = useState([]);

	useEffect(() => {
		async function fetchAccountsDetails(publicAddresses) {
			const ethereum = await detectEthereumProvider();
			if (!ethereum) {
				console.error("no ethereum");
				return;
			}
			let data = [];
			const length = publicAddresses.length;
			for (let i=0; i<length; i++) {
				let pA = publicAddresses[i];
				const balance = await ethereum.request({ method: "eth_getBalance", params: [pA, "latest"] });
				if (balance) {
					data.push({ 
						pubAddres: pA,
						balance: balance
					});
				}
			}
			setDetailData(data);
		}
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
					return <AccountEntry key={key} data={value}></AccountEntry>;
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
		appwriteApi.getAccount()
			.then(res => setUser(res));
	}, []);

	if (!user){
		routeChange("/");
		return <></>;
	}

	/* TODO: Fetch public address for this user from backend */

	/* Handle button connect to MetaMask */
	const handleAddMetaMask = async () => {
		const ethereum = await detectEthereumProvider();
		// Ref: https://docs.metamask.io/guide/rpc-api.html#table-of-contents
		let pubAddr = 0;
		if (ethereum) {
			const accounts = await ethereum.request({ method: "eth_requestAccounts" });
			const account = accounts[0];
			pubAddr = account;
			if (publicAddresses) {
				setPublicAddresses(publicAddresses.push(pubAddr));
			} else {
				setPublicAddresses([pubAddr]);
			}
		} else {
			console.log("Please install MetaMask!");
			return;
		}

		/* Some playground code 
		* A complete list of requests can be found here
		* https://eth.wiki/json-rpc/API
		*/
		// // Get gas Price
		// const gp = await ethereum.request({ method: "eth_gasPrice", params: [] });
		// console.log("eth_gasPrice: " + gp + " (" + parseInt(gp, 16) + " Wei)");

		// console.log("---------------------\nAccount: " + pubAddr);
		// // Get balance
		// const bl = await ethereum.request({ method: "eth_getBalance", params: [pubAddr, "latest"] });
		// console.log("eth_getBalance: " + bl + " (" + parseInt(bl, 16) + " Ether)");
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
					<EthAccountsDetail publicAddresses={publicAddresses}></EthAccountsDetail>
				}
			</Grid>
		</Grid>
	</CenterFlexBoxMedium>;
}