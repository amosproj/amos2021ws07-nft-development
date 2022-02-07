// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>
// SDPX-FileCopyrightText: 2021 Que Le <b.le@tu-berlin.de>

import React from "react";
import {
	Toolbar,
	Typography
} from "@mui/material";
import { Link } from "react-router-dom";
import RoundedEdgesButton from "../RoundedEdgesButton";
import { headerDividerColor, signupButtonColor, textColor } from "../../assets/jss/colorPalette";
import NftFullLogo from "../../assets/img/NFTTheWorldFullLogo.svg";
import { buttonFont, textFont } from "../../assets/jss/fontPalette";

/**
 * Header that is displayed on all large devices, in particular on all non mobile devices
 * @param userIsAdmin true if current user is an admin
 * @param user user user object of the currently logged in admin
 */
export default function LargeHeader({ userIsAdmin, user }) {
	return <Toolbar style={{ overflowX: "none", display: "flex", justifyContent: "space-between", paddingLeft: 0, paddingRight: 0 }}>
		<div style={{ display: "inherit" }}>
			<Link to="/" style={{ textDecoration: "none", display: "inherit", userSelect: "none" }}>
				<img src={NftFullLogo} alt="Logo" style={{ height: "36px", marginRight: "7px", marginTop: "13px" }} onDragStart={(e) => e.preventDefault()}/>
			</Link>
			<div style={{ marginTop: "29px", marginLeft: "14px", display: "inherit" }}>
				<div style={{ width: "15px", height: "0", transform: "rotate(270deg)", border: `1px solid ${headerDividerColor}`, color: headerDividerColor, backgroundColor: headerDividerColor, float: "left", marginRight: "14px", marginTop: "11px" }}/>
				<Link to="/faq"  style={{ textDecoration: "none", color: textColor }}>
					<Typography style={{ fontFamily: textFont, fontSize: "16px", fontStyle: "normal", fontWeight: "700", lineWeight: "22px", letterSpacing: "0em", textAlign: "left" }}>
						FAQ
					</Typography>
				</Link>
			</div>
		</div>
		<div style={{ display: "inherit", marginTop: "23px", fontFamily: `${buttonFont} !important` }}>
			{ user
				?
				<>
					{userIsAdmin && <RoundedEdgesButton color="inherit" component={Link} to="/user/admin" style={{ width: "80px" }}>Admin</RoundedEdgesButton>}
					<RoundedEdgesButton color="inherit" component={Link} to="/user/myCollection" style={{ width: "120px" }}>My Collection</RoundedEdgesButton>
					<RoundedEdgesButton color="inherit" component={Link} to="/user/profile" style={{ width: "80px" }}>Profile</RoundedEdgesButton>
				</>
				:
				<>
					<RoundedEdgesButton style={{ marginRight: "25px" }} component={Link} to="/login">Login</RoundedEdgesButton>
					<RoundedEdgesButton style={{ backgroundColor: signupButtonColor, width: "114px" }} component={Link} to="/signup">Sign Up</RoundedEdgesButton>
				</>
			}
		</div>
	</Toolbar>;
}

