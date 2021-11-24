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


/**
 * Page used to request a password reset as a user.
 * @param user should be, i.e. reflect that a user is not logged in
 * @returns {JSX.Element}
 */
export default function RequestPasswordResetPage({ user }) {
	const [resetWasRequested, setResetWasRequested] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const changeRoute = useChangeRoute();

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		appwriteApi.requestPasswordReset(data.get("email"))
			.then(() => setResetWasRequested(true))
			.catch(err => setErrorMessage(err.message));
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
				Request Password Reset
			</Typography>
			{resetWasRequested ?
				<Box sx={{ m: 4 }} >
					<Alert severity="info">
						You will receive an email shortly explaining how you can reset your password.
					</Alert>
				</Box>
				:
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<Typography>Enter your email and click the button below to request a password reset</Typography>
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
					<>
						{errorMessage !== "" && <Grid item xs={12}><Alert severity="error">{errorMessage}</Alert></Grid>}
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}>
							Request password reset
						</Button>
					</>
					<Grid container>
						<Grid item xs>
							<Link to="/login" >
								<Typography variant="body2" color="white" style={{ textDecorationLine: "underline" }}>
								Remember your password? Login
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
			}
		</CenterFlexBox>
	);
}