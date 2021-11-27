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
import { Alert, Divider } from "@mui/material";
import { inputFieldStyle } from "../assets/jss/InputFieldJSS";
import RoundedEdgesButton from "../components/RoundedEdgesButton";
import ParagraphTypography from "../components/ParagraphTypography";
import { activeTextColor } from "../assets/jss/colorPalette";


/**
 * Page used to sign up a new user.
 * @returns {JSX.Element}
 */
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
					setErrorMessage(<ParagraphTypography>{err.message}. <Link to="/login" style={{ color: activeTextColor }}>Sign in</Link></ParagraphTypography>);
				} else {
					setErrorMessage(err.message);
				}
			});
	};

	return (
		<CenterFlexBox>
			<ParagraphTypography component="h1" variant="h5" style={{ paddingBottom: "29px" }}>
				Sign up to NFT The world!
			</ParagraphTypography>
			{
				registrationComplete
					?
					<ParagraphTypography>
						We sent you a confirmation email. Please confirm your registration!
					</ParagraphTypography>
					:
					<>
						<div style={{ marginRight: "auto", marginBottom: "-13px" }}>
							<ParagraphTypography variant="p" 	style={{ fontSize: "15px" }}>
								Required fields have an asterisk: *
							</ParagraphTypography>
						</div>
						<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										sx = {{ ...inputFieldStyle }}
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
										sx = {{ ...inputFieldStyle }}
										required
										fullWidth
										id="email"
										label="Email"
										name="email"
										autoComplete="email"
									/>
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
								{errorMessage !== "" && <Grid item xs={12}><Alert severity="error">{errorMessage}</Alert></Grid>}
							</Grid>
							<div style={{ overflowX: "none", display: "flex", paddingTop: "18px", paddingBottom: "18.5px" }}>
								<RoundedEdgesButton
									type="submit"
									fullWidth
									variant="contained"
									style={{ backgroundColor: activeTextColor, width: "132px", marginLeft: "auto" }} >
									Sign Up
								</RoundedEdgesButton>
							</div>
							<Divider style={{ backgroundColor: "rgba(255,255,255,0.2)" }}/>
							<Grid container style={{ alignItems: "center", height: "37px" }}>
								<Grid item style={{ marginLeft: "auto" }}>
									<Link to="/login" style={{ textDecorationLine: "none" }}>
										<ParagraphTypography variant="body2" color={activeTextColor} style={{ fontSize: "14px" }}>
											Already have an account?
										</ParagraphTypography>
									</Link>
								</Grid>
							</Grid>
						</Box>
					</>
			}
		</CenterFlexBox>
	);
}