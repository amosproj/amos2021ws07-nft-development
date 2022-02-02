// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>
// SDPX-FileCopyrightText: 2021 Que Le <b.le@tu-berlin.de>

import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	Divider,
	Slide,
	Toolbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import NftFullLogo from "../../assets/img/NFTTheWorldFullLogo.svg";
import RoundedEdgesButton from "../RoundedEdgesButton";
import { backgroundColor, textColor } from "../../assets/jss/colorPalette";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HeaderTypography from "../HeaderTypography";
import LinkActionButton from "../LinkActionButton";
import Grid from "@mui/material/Grid";

const DialogTransition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="down" ref={ref} {...props} >{props.children}</Slide>;
});

/**
 * Header that is displayed on mobile devices.
 * @param userIsAdmin true if current user is an admin
 * @param user user user object of the currently logged in admin
 */
export default function SmallHeader({ userIsAdmin, user }) {
	const [open, setOpen] = useState(false);

	const toggleMenuDialog = () => setOpen(prevOpen => !prevOpen);

	return <Toolbar style={{ overflowX: "none", display: "flex", justifyContent: "space-between", paddingRight: "6px", paddingLeft: "0px", paddingTop: "3px" }}>
		<div style={{ display: "inherit", paddingLeft: "4px" }}>
			<Link to="/" style={{ textDecoration: "none", display: "inherit", userSelect: "none" }}>
				<img src={NftFullLogo} alt="Logo" style={{ height: "27.55px", marginRight: "7px" }} onDragStart={(e) => e.preventDefault()}/>
			</Link>
		</div>
		<div style={{ display: "inherit", marginTop: "1px", fontFamily: "PT Sans !important" }}>
			{ user ?
				<>
					<RoundedEdgesButton color="inherit" component={Link} to="/user/profile" style={{ width: "80px", fontSize: "12px", height: "36px", }}>Profile</RoundedEdgesButton>
				</>
				:
				<>
					<RoundedEdgesButton style={{ backgroundColor: "#009C19", width: "99px", height: "36px", fontSize: "12px" }} component={Link} to="/signup">Sign Up</RoundedEdgesButton>
				</>
			}
			<MenuIcon style={{ marginTop: "7px", marginLeft: "20px", cursor: "pointer" }} onClick={toggleMenuDialog}/>
		</div>
		<MenuDialog userIsAdmin={userIsAdmin} user={user} open={open} toggleMenuDialog={toggleMenuDialog}/>
	</Toolbar>;
}


function MenuDialog({ user, userIsAdmin, open, toggleMenuDialog }) {
	return <Dialog open={open} TransitionComponent={DialogTransition} keepMounted fullScreen>
		<div style={{ backgroundColor: backgroundColor, height: "100%", width: "100%" }} >
			<DialogTitle textAlign="right" style={{ paddingRight: "18px", paddingTop: "18px" }}><CloseIcon onClick={toggleMenuDialog} style={{ color: textColor }}/></DialogTitle>
			<DialogContent style={{ marginTop: "160px", textAlign: "center" }} >
				{ user
					?
					<>
						{userIsAdmin &&<Grid item><LinkActionButton to="/user/admin" onClick={toggleMenuDialog} style={{ backgroundColor: "transparent", width: "192px", height: "54px", fontSize: "17px", border: "1px solid #FFFFFF", marginBottom: "26px" }} component={RoundedEdgesButton}>Admin</LinkActionButton></Grid>}
						<Grid item><LinkActionButton to="/user/myCollection" onClick={toggleMenuDialog} style={{ backgroundColor: "transparent", width: "192px", height: "54px", fontSize: "17px", border: "1px solid #FFFFFF", marginBottom: "26px" }} component={RoundedEdgesButton}>My Collection</LinkActionButton></Grid>
						<Grid item><LinkActionButton to="/user/profile" onClick={toggleMenuDialog} component={RoundedEdgesButton} style={{ backgroundColor: "transparent", width: "192px", height: "54px", fontSize: "17px", border: "1px solid #FFFFFF" }}>Profile</LinkActionButton></Grid>
					</>
					:
					<>
						<Grid item><LinkActionButton onClick={toggleMenuDialog} style={{ backgroundColor: "transparent", width: "192px", height: "54px", fontSize: "17px", border: "1px solid #FFFFFF" }} component={RoundedEdgesButton} to="/login">Login</LinkActionButton></Grid>
						<Grid item><LinkActionButton onClick={toggleMenuDialog} style={{ backgroundColor: "#009C19", width: "192px", height: "54px", fontSize: "17px", marginTop: "26px" }} component={RoundedEdgesButton} to="/signup">Sign Up</LinkActionButton></Grid>
					</>
				}
				<Divider style={{ backgroundColor: "rgba(255, 255, 255, 0.65)", height: "2px", marginLeft: "calc(50% - 17.5px)", marginRight: "calc(50% - 17.5px)", marginTop: "41px", marginBottom: "23px", textAlign: "center" }}/>
				<LinkActionButton to="/faq" style={{ textDecoration: "none", color: textColor, width: "100px" }} onClick={toggleMenuDialog} component={RoundedEdgesButton} >
					<HeaderTypography style={{ fontSize: "24px" }}>
						FAQ
					</HeaderTypography>
				</LinkActionButton>
			</DialogContent>
		</div>
	</Dialog>;
}

