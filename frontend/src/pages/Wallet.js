// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 

import CenterFlexBox from "../components/CenterFlexBox";
import {
	Button,
	// Table,
	// TableBody,
	// TableCell,
	// TableContainer,
	// TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import appwriteApi from "../api/appwriteApi";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { useState } from "react";
// import { Window } from "@mui/icons-material";
import detectEthereumProvider from "@metamask/detect-provider";

// export default function ConnectWallets() {
// 	return;
// }

//https://docs.metamask.io/guide/rpc-api.html#table-of-contents

export default function Wallet({ user, setUser }) {
	const [walletData, setwalletData] = useState("");
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

	/* TODO: Get list of wallets from backend */
	// const test_data = [
	// 	{
	// 		walletName: "MetaMask"
	// 	},
	// 	{
	// 		walletName: "Coinbase"
	// 	},
	// 	{
	// 		walletName: "Fortmatic"
	// 	},
	// ];
	if (!walletData){
		setwalletData([]);
	}

	/* TODO: fetch walletData */

	/* Handle button connect to MetaMask */
	const handleAddMetaMask = async () => {
		console.log("Clicked!");
		const ethereum = await detectEthereumProvider();

		if (ethereum) {
			// From now on, this should always be true:
			// ethereum === window.ethereum
			const accounts = await ethereum.request({ method: "eth_requestAccounts" });
			const account = accounts[0];
			console.log("eth account: " + account);
		} else {
			console.log("Please install MetaMask!");
		}
	};

	return <CenterFlexBox>
		<Grid
			container
			spacing={2}
			alignItems="center"
			justifyContent="center"
			direction="column">
			<Grid item style={{ width: "100%" }}>
				{walletData.length == 0
					?
					<Button color="inherit" onClick={handleAddMetaMask}>App MetaMask wallet</Button>
					:
					<ul>
						{walletData.map((value, index) => {
							return <li key={index}>{value.walletName}</li>;
						})}
					</ul>
					
				}
			</Grid>
			<Grid item>
				<Button variant="outlined" style={{ color: "red" }} onClick={() => appwriteApi.deleteCurrentSession().then(() => setUser(null))}>Logout</Button>
			</Grid>
		</Grid>

	</CenterFlexBox>;
}