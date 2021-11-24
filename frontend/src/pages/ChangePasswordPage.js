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
import CenterFlexBox from "../components/CenterFlexBox";
import appwriteApi from "../api/appwriteApi";
import { useState } from "react";
import { Alert } from "@mui/material";

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
			<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Change Password
			</Typography>
			<>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					{passwordWasChanged ?
						<Typography>
								Your password was changed!
						</Typography>
						:
						<>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<Typography>Enter your old and a new password!</Typography>
								</Grid>
								<Grid item xs={12}>
									<TextField
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
										required
										fullWidth
										name="newPassword"
										label="New Password"
										type="password"
										id="newPassword"
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
						</>
					}
				</Box>
			</>
		</CenterFlexBox>
	);
}