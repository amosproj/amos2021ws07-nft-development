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
import { Link, useHistory } from "react-router-dom";
import CenterFlexBox from "../components/CenterFlexBox";
import appwriteApi from "../api/appwriteApi";

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


export default function Login({ user, setUser }) {
	const history = useHistory();

	const routeChange = (path) =>{
		history.push(path);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		appwriteApi.createSession(data.get("email"), data.get("password")).then(data => {
			setUser(data);
			console.log(data);
		});
	};

	if (user) {
		routeChange("/");
	}
	return (
		<CenterFlexBox>
			<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Sign in
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
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}>
					Sign In
				</Button>
				<Grid container>
					<Grid item xs>
						<Link to="#" >
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