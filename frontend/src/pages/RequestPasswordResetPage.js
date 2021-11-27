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
import useChangeRoute from "../hooks/useChangeRoute";
import { inputFieldStyle } from "../assets/jss/InputFieldJSS";
import RoundedEdgesButton from "../components/RoundedEdgesButton";
import ParagraphTypography from "../components/ParagraphTypography";
import { activeTextColor } from "../assets/jss/colorPalette";


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
			<ParagraphTypography component="h1" variant="h5" style={{ paddingBottom: "29px" }}>
				Request Password Reset
			</ParagraphTypography>
			{resetWasRequested ?
				<Box sx={{ m: 4 }} >
					<ParagraphTypography>You will receive an email shortly explaining how you can reset your password.</ParagraphTypography>
				</Box>
				:
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<ParagraphTypography>Enter your email and click the button below to request a password reset:</ParagraphTypography>
					<TextField
						sx = {{ ...inputFieldStyle, marginBottom: 0 }}
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					{errorMessage !== "" && <Grid item xs={12} style={{ paddingTop: "18px" }}><Alert severity="error">{errorMessage}</Alert></Grid>}
					<div style={{ overflowX: "none", display: "flex", paddingTop: "18px", paddingBottom: "18.5px" }}>
						<RoundedEdgesButton
							type="submit"
							fullWidth
							variant="contained"
							style={{ backgroundColor: activeTextColor, width: "250px", marginLeft: "auto" }} >
							Request password reset
						</RoundedEdgesButton>
					</div>
					<Divider style={{ backgroundColor: "rgba(255,255,255,0.2)" }}/>
					<Grid container style={{ alignItems: "center", height: "37px" }}>
						<Grid item style={{ marginLeft: "auto" }}>
							<Link to="/login" style={{ textDecorationLine: "none" }}>
								<ParagraphTypography variant="body2" color={activeTextColor} style={{ fontSize: "14px" }}>
									Remember your password? Sign in
								</ParagraphTypography>
							</Link>
						</Grid>
					</Grid>
				</Box>
			}
		</CenterFlexBox>
	);
}