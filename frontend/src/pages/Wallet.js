// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 

import CenterFlexBox from "../components/CenterFlexBox";
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
// import { Window } from "@mui/icons-material";
import detectEthereumProvider from "@metamask/detect-provider";
// import { LocalConvenienceStoreOutlined } from "@mui/icons-material";

function AccountEntry({ data }) {
	return 	<TableRow>
		<TableCell style={{ color: "white", borderBottom: "none" }}>{data.pubAddres}</TableCell>
		<TableCell style={{ color: "white", borderBottom: "none" }}>{data.bl}</TableCell>
	</TableRow>;
}

function EthAccountsDetail({ publicAddresses }) {
	// let data = [];
	const [detailData, setDetailData] = useState("");

	setDetailData([
		{
			pubAddres: "0x5130C965b4e4F19DEB9c57883f44993D07C762E6",
			bl: "0x0B49c02"
		},
		{
			pubAddres: "0x0B49c02988A61839a23D3F61c9E002baE6EA1348",
			bl: "0x0B49"
		},
	]);

	useEffect(() => {
		async function fetchAccountsDetails(publicAddresses) {
			const ethereum = await detectEthereumProvider();
			if (!ethereum) {
				console.error("no ethereum");
				return;
			}
			let data = [];
			// This is the most bullshit thing I've seen. Can't use ForEach nor For...in!
			const length = publicAddresses.length;
			for (let i=0; i<length; i++) {
				let pA = publicAddresses[i];
				const bl = await ethereum.request({ method: "eth_getBalance", params: [pA, "latest"] });
				console.log("eth_getBalance: " + bl + " (" + parseInt(bl, 16) + " Ether)");
				if (bl) {
					console.log("bl=" + bl);
					data.push({ 
						pubAddres: pA,
						bl: bl
					});
				}
			}
			setDetailData(data);
			console.log({ detailData: detailData });
		}
		fetchAccountsDetails(publicAddresses);
	}, []);

	return <TableContainer  style={{ color: "white" }}>
		<Table>
			<TableBody>
				<TableRow>
					<TableCell style={{ color: "white", borderBottom: "none" }}>Account</TableCell>
					<TableCell style={{ color: "white", borderBottom: "none" }}>Balance</TableCell>
				</TableRow>
				{/* <AccountEntry key={123} data={detailData[0]}></AccountEntry> */}
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
	// ... fetching ...
	// if (!publicAddresses){
	// 	setPublicAddresses([
	// 		"0x5130C965b4e4F19DEB9c57883f44993D07C762E6",
	// 		"0x0B49c02988A61839a23D3F61c9E002baE6EA1348"
	// 	]);
	// }
	// let data = [];
	// const fetchDetails = async () => {
	// 	const ethereum = await detectEthereumProvider();
	// 	console.log({ publicAddresses: publicAddresses });
	// 	for (const pA in publicAddresses) {
	// 		const bl = await ethereum.request({ method: "eth_getBalance", params: [pA, "latest"] });
	// 		// console.log("eth_getBalance: " + bl + " (" + parseInt(bl, 16) + " Ether)");
	// 		console.log("bl=" + bl);
	// 		data.push({ 
	// 			pubAddres: pA,
	// 			bl: bl
	// 		});
	// 	}
	// };
	// fetchDetails();
	// data = [
	// 	{
	// 		pubAddres: "0x5130C965b4e4F19DEB9c57883f44993D07C762E6",
	// 		bl: "0x0B49c02"
	// 	},
	// 	{
	// 		pubAddres: "0x0B49c02988A61839a23D3F61c9E002baE6EA1348",
	// 		bl: "0x0B49"
	// 	},
	// ];

	/* Handle button connect to MetaMask */
	const handleAddMetaMask = async () => {
		const ethereum = await detectEthereumProvider();
		// Ref: https://docs.metamask.io/guide/rpc-api.html#table-of-contents
		let pubAddr = 0;
		if (ethereum) {
			const accounts = await ethereum.request({ method: "eth_requestAccounts" });
			const account = accounts[0];
			console.log("eth account: " + account);
			pubAddr = account;
			setPublicAddresses([pubAddr]);
		} else {
			console.log("Please install MetaMask!");
			return;
		}

		/* Some playground code 
		* A complete list of requests can be found here
		* https://eth.wiki/json-rpc/API
		*/
		// Get gas Price
		const gp = await ethereum.request({ method: "eth_gasPrice", params: [] });
		console.log("eth_gasPrice: " + gp + " (" + parseInt(gp, 16) + " Wei)");

		console.log("---------------------\nAccount: " + pubAddr);
		// Get balance
		const bl = await ethereum.request({ method: "eth_getBalance", params: [pubAddr, "latest"] });
		console.log("eth_getBalance: " + bl + " (" + parseInt(bl, 16) + " Ether)");
	};

	return <CenterFlexBox>
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

	</CenterFlexBox>;
}

/* <ul>
	{publicAddresses.map((value, index) => {
		return <li key={index}>{value.walletName}</li>;
	})}
</ul> */