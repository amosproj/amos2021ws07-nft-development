// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import {
	Box,
	Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ParagraphTypography from "./ParagraphTypography";
import { ConnectWalletButton } from "../pages/Profile";
import ethereumContractApi from "../api/ethereumContractApi";
import ConditionalAlert from "./ConditionalAlert";

/**
 * Component that can be used by admins to invite or remove users to a user team.
 * @param user user object of the currently logged in user/admin
 * @param userTeamName team name
 * @returns {JSX.Element}
 */
export default function AddUserToContractPartnerTeam({ teamToEdit }) {
	const [metaMaskIsConnected, setMetaMaskIsConnected] = useState(false);
	const [connectedToMetaMaskMessage, setConnectedToMetaMaskMessage] = useState("");

	useEffect(() => {
		if (ethereumContractApi.selectedAccount !== null) {
			setMetaMaskIsConnected(true);
		}
	}, []);

	const addUserToContractTeam = async (event) => {
		event.preventDefault();
		// const data = new FormData(event.currentTarget);
		// const email = data.get("addAddress");
	};

	const connectMetaMask = () => ethereumContractApi.init().then(() => {
		setMetaMaskIsConnected(true);
		setConnectedToMetaMaskMessage("Successfully connected to MetaMask.");
	});

	if (!metaMaskIsConnected) {
		return (
			<Grid container spacing={2} alignItems="center" justifyContent="center" direction="column">
				<Grid item style={{ width: "100%" }}>
					<Grid container justify="space-between" style={{ width: "100%" }}>
						<ParagraphTypography variant="body1" align="left" gutterBottom>
							Connect to Metamask in order to add or remove ETH addresses to team {teamToEdit}.
						</ParagraphTypography>
					</Grid>
					<Grid item style={{ marginTop: "20px", marginBottom: "10px" }}>
						<Grid container alignItems="center" justifyContent="center">
							<ConnectWalletButton onClick={connectMetaMask}/>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		);
	}

	return <>
		<Grid container spacing={2} alignItems="center" justifyContent="center" direction="column">
			<Grid item style={{ width: "100%" }}>
				<Grid item  style={{ width: "100%", marginBottom: connectedToMetaMaskMessage === "" ? 0 : "15px" }}>
					<ConditionalAlert severity="info" text={connectedToMetaMaskMessage} />
				</Grid>
				<Grid container justify="space-between" style={{ width: "100%" }}>
					<ParagraphTypography variant="body1" align="left" gutterBottom>
						Add an ETH address to the {teamToEdit} in the main NFT contract. This will allow them to create a new drop.
						{ teamToEdit === "Admins" && "They will also be able to add more admins and partners." }
					</ParagraphTypography>
				</Grid>
				<Box component="form" onSubmit={addUserToContractTeam} noValidate sx={{ mt: 1 }} >
					<TextField margin="normal" required fullWidth id="addAddress" label="ETH address to add to contract partners" name="addAddress" autoFocus/>
					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
						Add user to contract&nbsp;<b>{teamToEdit}</b>&nbsp;team
					</Button>
				</Box>
			</Grid>
		</Grid>
	</>;
}