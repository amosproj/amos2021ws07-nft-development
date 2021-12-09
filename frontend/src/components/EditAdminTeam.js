// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import {
	Box,
	Button, Divider,
	FormControlLabel,
	FormGroup,
} from "@mui/material";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import appwriteApi from "../api/appwriteApi";
import { isValidEmail } from "../utils/utils";
import ParagraphTypography from "./ParagraphTypography";
import ConditionalAlert from "./ConditionalAlert";

/**
 * Component that can be used by admins to invite or remove other admins.
 * @param user user object of the currently logged in user/admin
 * @returns {JSX.Element}
 */
export default function EditAdminTeam({ user }) {
	const [areYouSureChecked, setAreYouSureChecked] = useState(false);
	const [requestSentIfUserIsInAdminTeam, setRequestSentIfUserIsInAdminTeam] = useState(false);
	const [searchedUserEmail, setSearchedUserEmail] = useState("");
	const [searchedUserIsInAdminTeam, setSearchedUserIsInAdminTeam] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [errorBottomMessage, setErrorBottomMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState(null);

	const checkIfUserIsInAdminTeam = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const email = data.get("email");
		if (!isValidEmail(email)){
			setErrorMessage("You have not entered a valid email address!");
			return;
		}

		const userIsInTeam = await appwriteApi.checkIfUserIsInTeam(email, "Admins");
		setSearchedUserIsInAdminTeam(userIsInTeam);
		setSearchedUserEmail(email);
		setRequestSentIfUserIsInAdminTeam(true);
		setErrorMessage("");
		setErrorBottomMessage("");
		setSuccessMessage(null);
		setAreYouSureChecked(false);
	};

	const updateTeamsOfUser = async (event) => {
		event.preventDefault();
		if (searchedUserIsInAdminTeam) {
			if (user.email === searchedUserEmail){
				setErrorBottomMessage("You cannot remove yourself from the admins team.");
				setSuccessMessage(null);
			} else {
				appwriteApi.removeUserFromTeam("Admins", searchedUserEmail).then(() => {
					setErrorBottomMessage("");
					setSuccessMessage(<>User with email <b>{searchedUserEmail}</b> was successfully removed from the admin team.</>);
					setSearchedUserIsInAdminTeam(false);
				});
			}
		} else {
			appwriteApi.inviteUserToTeam("Admins", searchedUserEmail, ["owner"]).then(() => {
				setErrorBottomMessage("");
				setSuccessMessage(<>An invitation to the user with email <b>{searchedUserEmail}</b> was sent out. It might take a moment until the email is received.</>);
				setSearchedUserIsInAdminTeam(true);
			});
		}
		setAreYouSureChecked(false);
	};

	return <>
		<Grid container spacing={2} alignItems="center" justifyContent="center" direction="column">
			<Grid item style={{ width: "100%" }}>
				<Grid container justify="space-between" style={{ width: "100%" }}>
					<ParagraphTypography variant="body1" align="left" gutterBottom>
						Search for a user by their email and remove them from the admins team or send an invite to someone to join the admin teams.
					</ParagraphTypography>
				</Grid>
				<Box component="form" onSubmit={checkIfUserIsInAdminTeam} noValidate sx={{ mt: 1 }} >
					<TextField margin="normal" required fullWidth id="email" label="Email" name="email" autoFocus/>
					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
						Search user
					</Button>
				</Box>
				<ConditionalAlert severity="error" text={errorMessage} />

				{
					requestSentIfUserIsInAdminTeam
					&&
					<Box component="form" noValidate onSubmit={updateTeamsOfUser} sx={{ mt: 1 }} style={{ width: "100%" }}>
						<Divider sx={{ mb: 2 }} />
						<Grid container justify="space-between" style={{ width: "100%" }}>
							<>
								<ParagraphTypography variant="body1" align="left" gutterBottom sx={{ mb: 2 }} >
									{searchedUserIsInAdminTeam ? (
										<>The user with the email &quot;<b>{searchedUserEmail}</b>&quot; is <b>in</b> the admin team. Below, you can remove them from the admin team.</>
									) : (
										<>The user with the email &quot;<b>{searchedUserEmail}</b>&quot; is <b>not</b> in the admin team. You can invite them to the admin team below.</>
									)}
								</ParagraphTypography>
								<FormGroup>
									<FormControlLabel
										label={searchedUserIsInAdminTeam ? (
											<ParagraphTypography>Are you sure you want to <b>remove</b> this user from the admins team?</ParagraphTypography>
										) : (
											<ParagraphTypography>Are you sure you want to <b>invite</b> this user to the admins team?</ParagraphTypography>
										)}
										control={<Checkbox checked={areYouSureChecked} onChange={() => setAreYouSureChecked(prevState => !prevState)}/>}
									/>
								</FormGroup>
								<Button type="submit" disabled={!areYouSureChecked} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
									{ searchedUserIsInAdminTeam ? "Remove user from admin team" : "Send invite" }
								</Button>
								<ConditionalAlert severity="info" text={successMessage} conditionFunction={(inputElement)=> inputElement !== null}/>
								<ConditionalAlert severity="error" text={errorBottomMessage} />
							</>
						</Grid>
					</Box>
				}
			</Grid>
		</Grid>
	</>;
}