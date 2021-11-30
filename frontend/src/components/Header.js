// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>
// SDPX-FileCopyrightText: 2021 Que Le <b.le@tu-berlin.de>

import React, { useEffect, useState } from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import NftLogo from "../assets/NFTTheWorldLogo.svg";
import appwriteApi from "../api/appwriteApi";
import RoundedEdgesButton from "./RoundedEdgesButton";

/**
 * Wrapper component used to display general routes in the head of the page. The routes/buttons in the header are different
 * depending on if a user is logged in and if the user is an admin.
 * @param children components that should be shown below the header, i.e. the rest of the website
 * @param user user user object of the currently logged in admin
 * @returns {JSX.Element}
 */
export default function Header({ children, user }) {
	const [userIsAdmin, setUserIsAdmin] = useState(false);
	useEffect(() => {
		if (user) {
			appwriteApi.userIsMemberOfTeam("Admins").then(isAdmin => setUserIsAdmin(isAdmin));
		} else {
			setUserIsAdmin(false);
		}
	}, [user]);

	return (
		<>
			<header>
				<Box style={{ width: "100%" }} sx={{ flexGrow: 1, paddingBottom: "15px" }}>
					<AppBar position="static" style={{ backgroundColor: "rgba(0,0,0,0)", boxShadow: "0 0 0 0" }}>
						<Toolbar style={{ overflowX: "none", display: "flex", justifyContent: "space-between" }}>
							<div style={{ display: "inherit" }}>
								<Link to="/" style={{ textDecoration: "none", display: "inherit", userSelect: "none" }}>
									<img src={NftLogo} alt="Logo" style={{ width: "63px", height: "63px", marginRight: "7px" }} />
									<Typography style={{ fontSize: "17px", fontFamily: "Josefin Sans", lineHeight: "96%", marginTop: "19px", opacity: "86%", color: "white", whiteSpace: "nowrap" }}>
										NFT<br/>the world!
									</Typography>
								</Link>
								<div style={{ marginTop: "29px", marginLeft: "14px", display: "inherit" }}>
									<div style={{ width: "15px", height: "0", transform: "rotate(270deg)", border: "1px solid #8d8d8d", color: "#8d8d8d", backgroundColor: "#8d8d8d", float: "left", marginRight: "14px", marginTop: "11px" }}/>
									<Link to="/faq"  style={{ textDecoration: "none", color: "white" }}>
										<Typography style={{ fontFamily: "Noto Sans", fontSize: "16px", fontStyle: "normal", fontWeight: "700", lineWeight: "22px", letterSpacing: "0em", textAlign: "left" }}>
											FAQ
										</Typography>
									</Link>
								</div>
							</div>
							<div style={{ display: "inherit" }}>
								<RoundedEdgesButton color="inherit" component={Link} to="/announcements">Announcements</RoundedEdgesButton>
							</div>
							<div style={{ display: "inherit", marginTop: "23px", fontFamily: "PT Sans !important" }}>
								{ user
									?
									<>
										{userIsAdmin && <RoundedEdgesButton color="inherit" component={Link} to="/user/admin" style={{ width: "80px" }}>Admin</RoundedEdgesButton>}
										<RoundedEdgesButton color="inherit" component={Link} to="/user/profile" style={{ width: "80px" }}>Profile</RoundedEdgesButton>
										<RoundedEdgesButton color="inherit" component={Link} to="/user/wallets">Wallets</RoundedEdgesButton>
									</>
									:
									<>
										<RoundedEdgesButton style={{ marginRight: "25px" }} component={Link} to="/login">Login</RoundedEdgesButton>
										<RoundedEdgesButton style={{ backgroundColor: "#009C19", width: "114px" }} component={Link} to="/signup">Sign Up</RoundedEdgesButton>
									</>
								}
							</div>
						</Toolbar>
					</AppBar>
				</Box>
			</header>
			{children}
		</>
	);
}