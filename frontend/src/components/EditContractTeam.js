// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ParagraphTypography from "./ParagraphTypography";
import { ConnectWalletButton } from "../pages/Profile";
import ethereumContractApi from "../api/ethereumContractApi";
import ConditionalAlert from "./ConditionalAlert";

const ContractTeamChangeOperation = Object.freeze({ "add": "add", "remove": "remove", });
const ContractTeams = Object.freeze({ "Admins": "Admins", "Partner": "Partner", });

/**
 * Component that can be used by admins to invite or remove users to a contract team.
 * @returns {JSX.Element}
 */
export default function EditContractTeam() {
	const [metaMaskIsConnected, setMetaMaskIsConnected] = useState(false);
	const [connectedToMetaMaskMessage, setConnectedToMetaMaskMessage] = useState("");
	const [blockchainResponse, setBlockchainResponse] = useState("");

	const [selectedAction, setSelectedAction] = React.useState(ContractTeamChangeOperation.add);
	const [teamToEdit, setTeamToEdit] = React.useState(ContractTeams.Partner);

	let ethAddressInputLabel = "ETH address to " + (selectedAction === ContractTeamChangeOperation.add ? "add to":"remove from") + " team " + teamToEdit;

	const handleActionChange = (event) => {
		setSelectedAction(event.target.value);
	};

	const handleTeamChange = (event) => {
		setTeamToEdit(event.target.value);
	};

	useEffect(() => {
		if (ethereumContractApi.selectedAccount !== null) {
			setMetaMaskIsConnected(true);
		}
	}, []);

	const addUserToContractTeam = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const addAddress = data.get("addAddress");

		let contractAddFunction = null;
		if (teamToEdit === ContractTeams.Admins) {
			if (selectedAction === ContractTeamChangeOperation.add) {
				contractAddFunction = ethereumContractApi.addToAdmins;
			} else if (selectedAction === ContractTeamChangeOperation.remove) {
				contractAddFunction = ethereumContractApi.removeFromAdmins;
			}
		} else if (teamToEdit === ContractTeams.Partner) {
			if (selectedAction === ContractTeamChangeOperation.add) {
				contractAddFunction = ethereumContractApi.addToPartners;
			} else if (selectedAction === ContractTeamChangeOperation.remove) {
				contractAddFunction = ethereumContractApi.removeFromPartners;
			}
		}
		if (contractAddFunction === null) {
			// nothing valid selected
			return;
		}

		contractAddFunction(addAddress,
			() => setBlockchainResponse("Successfully sent the " + selectedAction + " request to the blockchain."),
			() => setBlockchainResponse("There was an error while trying to send the request to the blockchain!"));

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
						Select a team, select if you want to add or remove an address, and enter an address!
					</ParagraphTypography>
				</Grid>

				<FormControl fullWidth style={{ marginTop: "10px" }}>
					<InputLabel id="demo-simple-select-label">Team to edit</InputLabel>
					<Select value={teamToEdit} label="Team to edit" onChange={handleTeamChange}>
						<MenuItem value={ContractTeams.Partner}>Partner</MenuItem>
						<MenuItem value={ContractTeams.Admins}>Admins</MenuItem>
					</Select>
				</FormControl>
				<FormControl fullWidth style={{ marginTop: "20px" }}>
					<InputLabel id="demo-simple-select-label">Action to perform</InputLabel>
					<Select value={selectedAction} label="Action to perform" onChange={handleActionChange}>
						<MenuItem value={ContractTeamChangeOperation.add}>Add</MenuItem>
						<MenuItem value={ContractTeamChangeOperation.remove}>Remove</MenuItem>
					</Select>
				</FormControl>

				{teamToEdit === ContractTeams.Admins && selectedAction === ContractTeamChangeOperation.add &&
					<Grid container justify="space-between" style={{ width: "100%", marginTop: "10px" }}>
						<ParagraphTypography variant="body1" align="left" gutterBottom>
							<b>Note:</b> Other admins are able to add or remove other admins!
						</ParagraphTypography>
					</Grid>
				}
				<Box component="form" onSubmit={addUserToContractTeam} noValidate sx={{ mt: 1 }} >
					<TextField margin="normal" required fullWidth id="addAddress" label={ethAddressInputLabel} name="addAddress" autoFocus/>

					<Grid item  style={{ width: "100%", marginTop: blockchainResponse === "" ? 0 : "8px" }}>
						<ConditionalAlert severity="info" text={blockchainResponse} />
					</Grid>
					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
						Add user to contract&nbsp;<b>{teamToEdit}</b>&nbsp;team
					</Button>
				</Box>
			</Grid>
		</Grid>
	</>;
}