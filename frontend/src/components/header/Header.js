// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>
// SDPX-FileCopyrightText: 2021 Que Le <b.le@tu-berlin.de>

import React, { useEffect, useState } from "react";
import { AppBar, Box } from "@mui/material";
import appwriteApi from "../../api/appwriteApi";
import { useMediaQuery } from "react-responsive";
import LargeHeader from "./LargeHeader";
import SmallHeader from "./SmallHeader";
import { adminTeamName } from "../../utils/config";

/**
 * Wrapper component used to display general routes in the head of the page. The routes/buttons in the header are different
 * depending on if a user is logged in and if the user is an admin.
 * @param children components that should be shown below the header, i.e. the rest of the website
 * @param user user user object of the currently logged in admin
 * @returns {JSX.Element}
 */
export default function Header({ children, user }) {
	const [userIsAdmin, setUserIsAdmin] = useState(false);
	const isLarge = useMediaQuery({ query: "(min-width: 600px)" });

	let HeaderComponent = isLarge ? LargeHeader : SmallHeader;

	useEffect(() => {
		if (user) {
			appwriteApi.userIsMemberOfTeam(adminTeamName).then(isAdmin => setUserIsAdmin(isAdmin));
		} else {
			setUserIsAdmin(false);
		}
	}, [user]);

	return (
		<>
			<header>
				<Box style={{ width: "100%" }} sx={{ flexGrow: 1, paddingBottom: "15px" }}>
					<AppBar position="static" style={{ backgroundColor: "rgba(0,0,0,0)", boxShadow: "0 0 0 0" }}>
						<HeaderComponent user={user} userIsAdmin={userIsAdmin}/>
					</AppBar>
				</Box>
			</header>
			<main>
				{children}
			</main>
		</>
	);
}
