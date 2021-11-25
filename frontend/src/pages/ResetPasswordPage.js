// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import * as React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import CenterFlexBox from "../components/CenterFlexBox";
import appwriteApi from "../api/appwriteApi";
import { useState } from "react";
import { Alert } from "@mui/material";
import useChangeRoute from "../hooks/useChangeRoute";
import ParagraphTypography from "../components/ParagraphTypography";
import { inputFieldStyle } from "../assets/jss/InputFieldJSS";
import HeaderButton from "../components/HeaderButton";

/**
 * Page used to reset the password of a user. The URL query params `userId` and `secret`
 * need to be specified in order to be able to change a users password.
 * @param user user object of the currently logged in user or null if not logged in
 * @returns {JSX.Element}
 */
export default function ResetPasswordPage({ user }) {
	const [passwordWasChanged, setPasswordWasChanged] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const changeRoute = useChangeRoute();

	const urlParams = new URLSearchParams(window.location.search);

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const userId = urlParams.get("userId");
		const secret = urlParams.get("secret");
		appwriteApi.resetPassword(userId, secret, data.get("password"), data.get("passwordAgain"))
			.then(() => setPasswordWasChanged(true))
			.catch(err => setErrorMessage(err.message));
	};

	let paramsMissing = !(urlParams.get("userId") !== "" && urlParams.get("secret") !== "");

	if (user) {
		changeRoute("/");
	}
	return (
		<CenterFlexBox>
			<ParagraphTypography component="h1" variant="h5" style={{ paddingBottom: "29px" }}>
				Password Reset
			</ParagraphTypography>
			{
				passwordWasChanged
					?
					<Box sx={{ mt: 1 }}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<ParagraphTypography>
									Your password was changed! <Link to="/login" style={{ textDecorationLine: "none", color:"#008425" }}>Login</Link>
								</ParagraphTypography>
							</Grid>
						</Grid>
					</Box>
					:
					<>
						{paramsMissing ?
							<Box sx={{ m: 4 }} >
								<ParagraphTypography component="p" variant="p">
									If you would like to reset your password, go to the <Link style={{ color:"white" }} to="/requestPasswordReset">password reset page</Link>.
								</ParagraphTypography>
							</Box>
							:
							<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
								<Grid container spacing={2}>

									<Grid item xs={12}>
										<ParagraphTypography variant="p" style={{ fontSize: "15px" }}>
											Enter a new password!
										</ParagraphTypography>
									</Grid>
									<Grid item xs={12}>
										<TextField
											sx = {{ ...inputFieldStyle, marginBottom: 0 }}
											required
											fullWidth
											name="password"
											label="Password"
											type="password"
											id="password"
											autoComplete="new-password"
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											sx = {{ ...inputFieldStyle, marginBottom: 0 }}
											required
											fullWidth
											name="passwordAgain"
											label="Repeat Password"
											type="password"
											id="password-repeat"
											autoComplete="new-password"
										/>
									</Grid>
									{errorMessage !== "" && <Grid item xs={12}><Alert severity="error">{errorMessage}</Alert></Grid>}
								</Grid>
								<div style={{ overflowX: "none", display: "flex", paddingTop: "18px", paddingBottom: "18.5px" }}>
									<HeaderButton
										type="submit"
										fullWidth
										variant="contained"
										style={{ backgroundColor: "#008425", width: "170px", marginLeft: "auto" }} >
										Change password
									</HeaderButton>
								</div>
							</Box>
						}
					</>
			}
		</CenterFlexBox>
	);
}