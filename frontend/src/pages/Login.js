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
 * Page used to login
 * @param user user object of the currently logged in user or null if not logged in
 * @param setUser function to set the user object
 * @returns {JSX.Element}
 */
export default function Login({ user, setUser }) {
	const [errorMessage, setErrorMessage] = useState("");
	const changeRoute = useChangeRoute();

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		appwriteApi.createSession(data.get("email"), data.get("password")).then(data => {
			setUser(data);
		}).then(() => {
			return appwriteApi.getAccount();
		}).then(res =>
			setUser(res)
		)
			.catch(err => {
				setErrorMessage(err.message);
			});
	};

	if (user) {
		changeRoute("/");
	}
	return (
		<CenterFlexBox>
			<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Login
			</Typography>
			<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
				<TextField
					margin="normal"
					required
					fullWidth
					id="email"
					label="Email Address"
					name="email"
					autoComplete="email"
					autoFocus
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					name="password"
					label="Password"
					type="password"
					id="password"
					autoComplete="current-password"
				/>
				<FormControlLabel
					control={<Checkbox value="remember" color="primary" />}
					label="Remember me"
				/>
				{errorMessage !== "" && <Grid item xs={12}><Alert severity="error">{errorMessage}</Alert></Grid>}
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}>
					Sign In
				</Button>
				<Grid container>
					<Grid item xs>
						<Link to="/requestPasswordReset" >
							<Typography variant="body2" color="white" style={{ textDecorationLine: "underline" }}>
								Forgot password?
							</Typography>
						</Link>
					</Grid>
					<Grid item>
						<Link to="/signup" >
							<Typography variant="body2" color="white" style={{ textDecorationLine: "underline" }}>
								Don&apos;t have an account? Sign Up
							</Typography>
						</Link>
					</Grid>
				</Grid>
			</Box>
			<Copyright sx={{ mt: 8, mb: 4 }} />
		</CenterFlexBox>
	);
}