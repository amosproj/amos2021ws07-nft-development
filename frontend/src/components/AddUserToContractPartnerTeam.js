// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import {
	Box,
	Button,
} from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ParagraphTypography from "./ParagraphTypography";

/**
 * Component that can be used by admins to invite or remove users to a user team.
 * @param user user object of the currently logged in user/admin
 * @param userTeamName team name
 * @returns {JSX.Element}
 */
export default function AddUserToContractPartnerTeam({ teamToEdit }) {
	// const [metaMaskIsConnected, setMetaMaskIsConnected] = useState(false);

	const addUserToContractTeam = async (event) => {
		event.preventDefault();
		// const data = new FormData(event.currentTarget);
		// const email = data.get("addAddress");
	};

	return <>
		<Grid container spacing={2} alignItems="center" justifyContent="center" direction="column">
			<Grid item style={{ width: "100%" }}>
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