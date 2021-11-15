// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import {
	Alert,
	Box,
	Button,  List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography,
} from "@mui/material";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";

export default function UserTeamChange() {
	const [checked, setChecked] = useState([]);
	const [requestedUserData, setRequestedUserData] = useState(null);
	const [searchedUserEmail, setSearchedUserEmail] = useState("mail@mail.de");
	const [errorMessage, setErrorMessage] = useState("");
	const [text, setText] = useState("");

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const searchUser = (event) => {
		// FIXME: update to appwrite function once it is implemented
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		if (!requestedUserData){
			setSearchedUserEmail(data.get("email"));
			setRequestedUserData(
				{
					user: name,
					teams: [
						{ "$id":"618594f2f30a4","name":"admin","dateCreated":1636144370,"sum":1 },
						{ "$id":"6191549c46fd5","name":"Admins","dateCreated":1636914332,"sum":9 },
						{ "$id":"6191549c46fe1","name":"Users","dateCreated":1636911331,"sum":1 }
					]
				}
			);
			setErrorMessage("");
		} else {
			setRequestedUserData(null);
			setErrorMessage("No user with that email found.");
		}
	};

	const updateTeamsOfUser = (event) => {
		event.preventDefault();
		const teams = [];
		for (let i = 0; i < requestedUserData.teams.length; i++) {
			teams.push({ name: requestedUserData.teams[i].name, selected: checked.includes(i) });
		}
		const payload = { user: { email: searchedUserEmail }, teams: teams };
		setText(JSON.stringify(payload));
	};

	return <Grid
		container
		spacing={2}
		alignItems="center"
		justifyContent="center"
		direction="column">
		<Grid item style={{ width: "100%" }}>
			<Grid container justify="space-between" style={{ width: "100%" }}>
				<Typography variant="body1" align="left" gutterBottom>Search for a user by their email and edit their teams below.</Typography>
			</Grid>
			<Box component="form" onSubmit={searchUser} noValidate sx={{ mt: 1 }} >
				<TextField
					margin="normal"
					required
					fullWidth
					id="email"
					label="Email Address"
					name="email"
					autoFocus
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}>
					Search user
				</Button>
			</Box>
			{errorMessage !== "" && <Grid item xs={12}><Alert severity="error">{errorMessage}</Alert></Grid>}
			{
				requestedUserData
				&&
				<Box component="form" noValidate onSubmit={updateTeamsOfUser} sx={{ mt: 1 }} style={{ width: "100%" }}>
					<List
						sx={{ width: "100%", bgcolor: "background.paper" }}
						subheader={
							<ListSubheader component="div" id="nested-list-subheader">
								Edit teams of user with email {searchedUserEmail}
							</ListSubheader>
						}>
						{requestedUserData.teams.map((value, idx) => {
							const labelId = `checkbox-list-label-${value}`;
							return (
								<ListItem
									key={value.name}
									disablePadding>
									<ListItemButton role={undefined} onClick={handleToggle(idx)} dense>
										<ListItemIcon>
											<Checkbox
												edge="start"
												tabIndex={-1}
												checked={checked.indexOf(idx) !== -1}
												disableRipple
												inputProps={{ "aria-labelledby": labelId }}
											/>
										</ListItemIcon>
										<ListItemText id={labelId} primary={`${value.name}`} />
									</ListItemButton>
								</ListItem>
							);
						})}
					</List>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}>
						Update teams of user
					</Button>
					{text}
				</Box>
			}
		</Grid>
	</Grid>;
}