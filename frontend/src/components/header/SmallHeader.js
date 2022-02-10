// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>
// SDPX-FileCopyrightText: 2021 Que Le <b.le@tu-berlin.de>

import React, { useState } from "react";
import {
	Slide,
	Toolbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import RoundedEdgesButton from "../RoundedEdgesButton";
import { signupButtonColor } from "../../assets/jss/colorPalette";
import MenuIcon from "@mui/icons-material/Menu";
import { buttonFont } from "../../assets/jss/fontPalette";
import { fullWebsiteIcon } from "../../assets/jss/imagePalette";
import { MenuDialog } from "./MenuDialog";

export const DialogTransition = React.forwardRef(function Transition(props, ref) {
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
				<img src={fullWebsiteIcon} alt="Logo" style={{ height: "27.55px", marginRight: "7px" }} onDragStart={(e) => e.preventDefault()} />
			</Link>
		</div>
		<div style={{ display: "inherit", marginTop: "1px", fontFamily: `${buttonFont} !important` }}>
			{user ?
				<>
					<RoundedEdgesButton color="inherit" component={Link} to="/user/profile" style={{ width: "80px", fontSize: "12px", height: "36px", }}>Profile</RoundedEdgesButton>
				</>
				:
				<>
					<RoundedEdgesButton style={{ backgroundColor: signupButtonColor, width: "99px", height: "36px", fontSize: "12px" }} component={Link} to="/signup">Sign Up</RoundedEdgesButton>
				</>
			}
			<MenuIcon style={{ marginTop: "7px", marginLeft: "20px", cursor: "pointer" }} onClick={toggleMenuDialog} />
		</div>
		<MenuDialog userIsAdmin={userIsAdmin} user={user} open={open} toggleMenuDialog={toggleMenuDialog} />
	</Toolbar>;
}
