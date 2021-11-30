// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import * as React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CenterFlexBox from "../components/CenterFlexBox";
import appwriteApi from "../api/appwriteApi";
import { useState } from "react";
import { inputFieldStyle } from "../assets/jss/InputFieldJSS";
import RoundedEdgesButton from "../components/RoundedEdgesButton";
import ParagraphTypography from "../components/ParagraphTypography";
import { activeTextColor } from "../assets/jss/colorPalette";
import ConditionalAlert from "../components/ConditionalAlert";

/**
 * Page used for changing the password of a user.
 * @returns {JSX.Element}
 */
export default function ChangePasswordPage() {
	const [passwordWasChanged, setPasswordWasChanged] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		appwriteApi.changePassword(data.get("oldPassword"), data.get("newPassword"))
			.then(() => setPasswordWasChanged(true))
			.catch(err => setErrorMessage(err.message));
	};

	return (
		<CenterFlexBox>
			<ParagraphTypography component="h1" variant="h5" style={{ paddingBottom: "29px" }}>
				Password Change
			</ParagraphTypography>
			<>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					{passwordWasChanged ?
						<ParagraphTypography>
								Your password was changed!
						</ParagraphTypography>
						:
						<>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<ParagraphTypography>Enter your old and a new password.</ParagraphTypography>
								</Grid>
								<Grid item xs={12}>
									<TextField
										sx = {{ ...inputFieldStyle }}
										required
										fullWidth
										name="oldPassword"
										label="Old Password"
										type="password"
										id="oldPassword"
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										sx = {{ ...inputFieldStyle, marginBottom: 0 }}
										required
										fullWidth
										name="newPassword"
										label="New Password"
										type="password"
										id="newPassword"
										autoComplete="new-password"
									/>
								</Grid>
								<ConditionalAlert severity="error" text={errorMessage}/>
							</Grid>

							<div style={{ overflowX: "none", display: "flex", paddingTop: "18px", paddingBottom: "18.5px" }}>
								<RoundedEdgesButton
									type="submit"
									fullWidth
									variant="contained"
									style={{ backgroundColor: activeTextColor, width: "170px", marginLeft: "auto" }}
								>
									Change password
								</RoundedEdgesButton>
							</div>
						</>
					}
				</Box>
			</>
		</CenterFlexBox>
	);
}