// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import useChangeRoute from "../hooks/useChangeRoute";
import appwriteApi from "../api/appwriteApi";

/**
 * Wrapper component used to display general routes in the head of the page. The routes/buttons in the header are different
 * depending on if a user is logged in and if the user is an admin.
 * @param children components that should be shown below the header, i.e. the rest of the website
 * @param user user user object of the currently logged in admin
 * @returns {JSX.Element}
 */
export default function Header({ children, user }) {
	const changeRoute = useChangeRoute();
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
			<Box style={{ width: "100%" }} sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}>
							<MenuIcon />
						</IconButton>

						<Typography variant="h6" component="div" sx={{ mr: 2 }} onClick={() => changeRoute("/")} style={{ cursor: "pointer" }}>
							MAIN
						</Typography>
						<Typography variant="h6" component="div" sx={{ mr: 2, flexGrow: 1 }} onClick={() => changeRoute("/faqs")}  style={{ cursor: "pointer" }}>
							FAQS
						</Typography>
						{ user
							?
							<>
								{userIsAdmin && <Button color="inherit" component={Link} to="/admin">Admin</Button>}
								<Button color="inherit" component={Link} to="/wallets">Wallets</Button>
								<Button color="inherit" component={Link} to="/profile">Profile</Button>
							</>
							:
							<Button color="inherit" component={Link} to="/login">Login</Button>
						}
					</Toolbar>
				</AppBar>
			</Box>
			{children}
		</>
	);
}