// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import * as React from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import CenterFlexBox from "../components/CenterFlexBox";
import appwriteApi from "../api/appwriteApi";
import { useState } from "react";
import { Alert, Divider } from "@mui/material";
import useChangeRoute from "../hooks/useChangeRoute";
import { inputFieldStyle } from "../assets/jss/InputFieldJSS";
import HeaderButton from "../components/HeaderButton";
import ParagraphTypography from "../components/ParagraphTypography";

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
			<ParagraphTypography component="h1" variant="h5" style={{ paddingBottom: "29px" }}>
				Sign in to NFT The world!
			</ParagraphTypography>
			<div style={{ marginRight: "auto", marginBottom: "-13px" }}>
				<ParagraphTypography variant="p" style={{ fontSize: "15px" }}>
					Required fields have an asterisk: *
				</ParagraphTypography>
			</div>
			<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
				<TextField
					sx = {{ ...inputFieldStyle }}
					margin="normal"
					required
					fullWidth
					id="email"
					label="Email"
					name="email"
					autoComplete="email"
					autoFocus
				/>
				<TextField
					sx = {{ ...inputFieldStyle, marginBottom: 0 }}
					margin="normal"
					required
					fullWidth
					name="password"
					label="Password"
					type="password"
					id="password"
					autoComplete="current-password"
				/>
				{errorMessage !== "" && <Grid item xs={12} style={{ paddingTop: "24px" }}><Alert severity="error">{errorMessage}</Alert></Grid>}
				<div style={{ overflowX: "none", display: "flex", justifyContent: "space-between", paddingTop: "18px", paddingBottom: "18.5px" }}>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" size="medium" style={{ borderRadius: "4px" }} />}
						sx={{ "& .MuiSvgIcon-root": { fontSize: 21, borderRadius: "4px", color: "#FFFFFF99" } }}
						label={<ParagraphTypography style={{ fontSize: "15px" }}>Remember me</ParagraphTypography>}
					/>
					<HeaderButton
						type="submit"
						fullWidth
						variant="contained"
						style={{ backgroundColor: "#008425", width: "132px" }} >
						Sign In
					</HeaderButton>
				</div>
				<Divider style={{ backgroundColor: "rgba(255,255,255,0.2)" }}/>
				<Grid container style={{ alignItems: "center", height: "37px" }}>
					<Grid item xs>
						<Link to="/requestPasswordReset" style={{ textDecorationLine: "none" }}>
							<ParagraphTypography variant="body2" color="#008425" style={{ fontSize: "14px" }}>
								Forgot password?
							</ParagraphTypography>
						</Link>
					</Grid>
					<Grid item>
						<Link to="/signup" style={{ textDecorationLine: "none" }}>
							<ParagraphTypography variant="body2" color="#008425" style={{ fontSize: "14px" }}>
								Don&apos;t have an account?
							</ParagraphTypography>
						</Link>
					</Grid>
				</Grid>
			</Box>
		</CenterFlexBox>
	);
}