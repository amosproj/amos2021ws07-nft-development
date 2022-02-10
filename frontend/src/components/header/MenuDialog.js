// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>
// SDPX-FileCopyrightText: 2021 Que Le <b.le@tu-berlin.de>

import React from "react";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	Divider
} from "@mui/material";
import RoundedEdgesButton from "../RoundedEdgesButton";
import {
	backgroundColor,
	buttonWhiteBorderColor,
	semiTransparentDividerColor, signupButtonColor,
	textColor
} from "../../assets/jss/colorPalette";
import CloseIcon from "@mui/icons-material/Close";
import HeaderTypography from "../HeaderTypography";
import LinkActionButton from "../LinkActionButton";
import Grid from "@mui/material/Grid";
import { DialogTransition } from "./SmallHeader";

/**
 * "Previous" arrow component.
 * @param user user object
 * @param userIsAdmin state indicates admin status
 * @param open open state, for Dialog child component
 * @param toggleMenuDialog handler for click
 * @returns {JSX.Element}
 */
export function MenuDialog({ user, userIsAdmin, open, toggleMenuDialog }) {
	return <Dialog open={open} TransitionComponent={DialogTransition} keepMounted fullScreen>
		<div style={{ backgroundColor: backgroundColor, height: "100%", width: "100%" }}>
			<DialogTitle textAlign="right" style={{ paddingRight: "18px", paddingTop: "18px" }}><CloseIcon onClick={toggleMenuDialog} style={{ color: textColor }} /></DialogTitle>
			<DialogContent style={{ marginTop: "160px", textAlign: "center" }}>
				{user
					?
					<>
						{userIsAdmin && <Grid item><LinkActionButton to="/user/admin" onClick={toggleMenuDialog} style={{ backgroundColor: "transparent", width: "192px", height: "54px", fontSize: "17px", border: `1px solid ${buttonWhiteBorderColor}`, marginBottom: "26px" }} component={RoundedEdgesButton}>Admin</LinkActionButton></Grid>}
						<Grid item><LinkActionButton to="/user/myCollection" onClick={toggleMenuDialog} style={{ backgroundColor: "transparent", width: "192px", height: "54px", fontSize: "17px", border: `1px solid ${buttonWhiteBorderColor}`, marginBottom: "26px" }} component={RoundedEdgesButton}>My Collection</LinkActionButton></Grid>
						<Grid item><LinkActionButton to="/user/profile" onClick={toggleMenuDialog} component={RoundedEdgesButton} style={{ backgroundColor: "transparent", width: "192px", height: "54px", fontSize: "17px", border: `1px solid ${buttonWhiteBorderColor}` }}>Profile</LinkActionButton></Grid>
					</>
					:
					<>
						<Grid item><LinkActionButton onClick={toggleMenuDialog} style={{ backgroundColor: "transparent", width: "192px", height: "54px", fontSize: "17px", border: `1px solid ${buttonWhiteBorderColor}` }} component={RoundedEdgesButton} to="/login">Login</LinkActionButton></Grid>
						<Grid item><LinkActionButton onClick={toggleMenuDialog} style={{ backgroundColor: signupButtonColor, width: "192px", height: "54px", fontSize: "17px", marginTop: "26px" }} component={RoundedEdgesButton} to="/signup">Sign Up</LinkActionButton></Grid>
					</>}
				<Divider style={{ backgroundColor: semiTransparentDividerColor, height: "2px", marginLeft: "calc(50% - 17.5px)", marginRight: "calc(50% - 17.5px)", marginTop: "41px", marginBottom: "23px", textAlign: "center" }} />
				<LinkActionButton to="/faq" style={{ textDecoration: "none", color: textColor, width: "100px" }} onClick={toggleMenuDialog} component={RoundedEdgesButton}>
					<HeaderTypography style={{ fontSize: "24px" }}>
						FAQ
					</HeaderTypography>
				</LinkActionButton>
			</DialogContent>
		</div>
	</Dialog>;
}
