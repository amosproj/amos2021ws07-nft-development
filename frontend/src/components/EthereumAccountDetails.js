// SPDX-License-Identifier: MIT
// SDPX-FileCopyrightText: 2022 Que Le <b.le@tu-berlin.de>

import { useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Typography from "@mui/material/Typography";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow
} from "@mui/material";
import React, { useEffect } from "react";
import { EthereumAccountEntry } from "./EthereumAccountEntry";

/**
 * Component to display details about Ethereum wallet.
 * @param publicAddresses Ethereum addresses 
 * @param setErrorNoMetamaskMessage Error message displayed when no Metamask browser plugin is found.
 * @returns {JSX.Element}
 */
export function EthereumAccountDetails({ publicAddresses, setErrorNoMetamaskMessage }) {
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
			});
			setDetailData(details);
			return;
		}
		const length = publicAddresses.length;
		for (let i = 0; i < length; i++) {
			let pubAddress = publicAddresses[i];
			const balance = await provider.request({
				method: "eth_getBalance",
				params: [pubAddress, "latest"]
			}); // "Wei" balance in hex format, like 0x5a4e1804f198f1d99.
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
					return <EthereumAccountEntry key={key} data={value} />;
				})}
			</TableBody>
		</Table>
	</TableContainer>;
}
