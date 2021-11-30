// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import CenterFlexBox from "../components/CenterFlexBox";
import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
} from "@mui/material";
import React from "react";
import appwriteApi from "../api/appwriteApi";
import Grid from "@mui/material/Grid";
import useChangeRoute from "../hooks/useChangeRoute";
import { textColor } from "../assets/jss/colorPalette";

/**
 * Page used to display profile of a user. Contains general information such as username, email,
 * if their email was verified, a possibility to change the users password and a possibility to logout.
 * @param user user object of the currently logged in user
 * @param setUser function to set the user object
 * @returns {JSX.Element}
 */
export default function Profile({ user, setUser }) {
	const changeRoute = useChangeRoute();

	return <CenterFlexBox>
		<Grid
			container
			spacing={2}
			alignItems="center"
			justifyContent="center"
			direction="column"
		>
			<Grid item style={{ width: "100%" }}>
				<TableContainer >
					<Table>
						<TableBody>
							<TableRow>
								<TableCell style={{ color: textColor, borderBottom: "none" }}>Name</TableCell>
								<TableCell style={{ color: textColor, borderBottom: "none" }}>{user.name}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ color: textColor, borderBottom: "none" }}>Email</TableCell>
								<TableCell style={{ color: textColor, borderBottom: "none" }}>{user.email}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ color: textColor, borderBottom: "none" }}>Email verified?</TableCell>
								<TableCell style={{ color: textColor, borderBottom: "none" }}>{user.emailVerification ? "Yes" : <>No <span style={{ textDecorationLine: "underline", cursor: "pointer" }} onClick={() => appwriteApi.sendEmailConfirmation()}>Resent email verification</span></>}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ color: textColor, borderBottom: "none" }}>Password</TableCell>
								<TableCell style={{ color: textColor, borderBottom: "none" }}><Button variant="outlined" onClick={() => changeRoute("/user/changePassword")}>Change password</Button></TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
			<Grid item>
				<Button
					variant="outlined" style={{ color: "red" }} onClick={() => appwriteApi.deleteCurrentSession().then(() => {
						setUser(null);
						changeRoute("/");
					})}
				>Logout</Button>
			</Grid>
		</Grid>

	</CenterFlexBox>;
}