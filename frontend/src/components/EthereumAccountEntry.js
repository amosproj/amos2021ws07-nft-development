// SPDX-License-Identifier: MIT
// SDPX-FileCopyrightText: 2022 Que Le <b.le@tu-berlin.de>

const { utils } = require("ethers");
import {
	TableCell,
	TableRow
} from "@mui/material";
import React from "react";

/**
 * Component to display details about Ethereum wallet.
 * @param data Object contains the public address and balance of account.
 * @returns {JSX.Element}
 */
export function EthereumAccountEntry({ data }) {
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
