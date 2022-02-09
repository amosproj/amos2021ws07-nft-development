// SPDX-License-Identifier: MIT
// SDPX-FileCopyrightText: 2021 Que Le <b.le@tu-berlin.de>

import { useState } from "react";

import {
	Container,
} from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid";
import ConditionalAlert from "./ConditionalAlert";

import { CenterBox, } from "./Common";
import ethereumContractApi from "../api/ethereumContractApi";
import { EthereumAccountDetails } from "./EthereumAccountDetails";

/**
 * Component to display and add Eth address from Wallet. Currently only Metamask is supported.
 * @param user user object of the currently logged in user/admin
 * @param ConnectWalletButton JSX component which accepts an onClick and style property.
 * @returns {JSX.Element}
 */
export default function Wallet({ ConnectWalletButton }) {
	const [publicAddresses, setPublicAddresses] = useState([]);
	const [errorNoMetamaskMessage, setErrorNoMetamaskMessage] = useState("");

	const handleAddMetaMask = async () => {
		ethereumContractApi.init().then((newPublicAddress) => {
			// appwriteApi.setEthAddress(newPublicAddress);
			setPublicAddresses(publicAddresses => [...publicAddresses, newPublicAddress]);
		}).catch(() => {
			setErrorNoMetamaskMessage("Please install MetaMask!");
			console.log("Please install MetaMask!");
		});
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