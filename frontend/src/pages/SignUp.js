// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import CenterFlexBox from "../components/CenterFlexBox";
import appwriteApi from "../api/appwriteApi";
import { useState } from "react";
import { Alert } from "@mui/material";

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

export default function SignUp() {
	const [registrationComplete, setRegistrationComplete] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		appwriteApi.createAccount(data.get("email"), data.get("password"), data.get("username"))
			.then(() => {
				return appwriteApi.createSession(data.get("email"), data.get("password"));
			})
			.then(() => {
				return appwriteApi.sendEmailConfirmation();
			})
			.then(() => {
				setRegistrationComplete(true);
			})
			.catch(err => {
				if (err.response.code === 409){
					setErrorMessage(<><Typography>{err.message} <Link to="/login">Login</Link></Typography></>);
				} else {
					setErrorMessage(err.message);
				}
			});
	};

	return (
		<CenterFlexBox>
			<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Sign up
			</Typography>
			{
				registrationComplete
					?
					<>
						We sent you a confirmation email. Please confirm your registration!
					</>
					:
					<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									autoComplete="username"
									name="username"
									required
									fullWidth
									id="username"
									label="Username"
									autoFocus
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
								/>
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
								<FormControlLabel
									control={<Checkbox value="allowExtraEmails" color="primary" />}
									label="I want to receive inspiration, marketing promotions and updates via email."
								/>
							</Grid>
							{errorMessage !== "" && <Grid item xs={12}><Alert severity="error">{errorMessage}</Alert></Grid>}
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link to="/login" >
									<Typography variant="body2" color="white" style={{ textDecorationLine: "underline" }}>
										Already have an account? Sign in
									</Typography>
								</Link>
							</Grid>
						</Grid>
					</Box>
			}
			<Copyright sx={{ mt: 5 }} />
		</CenterFlexBox>
	);
}