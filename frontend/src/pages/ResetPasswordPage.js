// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import CenterFlexBox from "../components/CenterFlexBox";
import appwriteApi from "../api/appwriteApi";
import { useState } from "react";
import { Alert } from "@mui/material";
import useChangeRoute from "../hooks/useChangeRoute";

function Copyright(props) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{"Copyright © "}
			<Link to="/">
				<span style={{ textDecorationLine: "underline", color: "white" }}>
					NFTTheWorld
				</span>
			</Link>{" "}
			{new Date().getFullYear()}
			.
		</Typography>
	);
}

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
			<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Password Reset
			</Typography>
			{
				passwordWasChanged
					?

					<Box sx={{ mt: 1 }}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								Your password was changed! <Link to="/login" style={{ color: "white" }}>Login</Link>
							</Grid>
						</Grid>
					</Box>
					:
					<>
						{paramsMissing ?
							<Box sx={{ m: 4 }} >
								<Typography component="p" variant="p">
								If you would like to reset your password, go to the <Link style={{ color:"white" }} to="/requestPasswordReset">password reset page</Link>.
								</Typography>
							</Box>
							:
							<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
								<Grid container spacing={2}>

									<Grid item xs={12}>
										<Typography>Enter a new password!</Typography>
									</Grid>
									<Grid item xs={12}>
										<TextField
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
								<Button
									type="submit"
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}>
					Change password
								</Button>
							</Box>
						}
					</>
			}
			<Copyright sx={{ mt: 8, mb: 4 }} />
		</CenterFlexBox>
	);
}