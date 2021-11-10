// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";
export default function Header({ children, user }) {
	const history = useHistory();

	const routeChange = (path) =>{
		history.push(path);
	};

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

						<Typography variant="h6" component="div" sx={{ mr: 2 }} onClick={() => routeChange("/")} style={{ cursor: "pointer" }}>
							MAIN
						</Typography>
						<Typography variant="h6" component="div" sx={{ mr: 2, flexGrow: 1 }} onClick={() => routeChange("/faqs")}  style={{ cursor: "pointer" }}>
							FAQS
						</Typography>
						<Button color="inherit" component={Link} to="/wallets">Wallets</Button>
						{ user
							?
							<Button color="inherit" component={Link} to="/profile">Profile</Button>
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