// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>

import * as React from "react";

import WelcomeBanner from "../components/Banner";
import HeaderTypography from "../components/HeaderTypography";

import Grid from "@mui/material/Grid";

import AnnouncementPage from "./AnnouncementPage";

export default function LandingPage({ user }) {
	const DropsListPlaceholder = () => {
		const titleStyle = { fontSize: 20, fontWeight: 700, };

		return <div style={{ backgroundColor: "orange", height: "100px" }}>
			<HeaderTypography style={titleStyle}>Drops here!</HeaderTypography>
		</div>;
	};

	return (
		<Grid container direction="row" rowSpacing="50px" columnSpacing="50px">
			<Grid item xs={12} style={{ marginTop: "16px" }}>
				<WelcomeBanner user={user}/>
			</Grid>
			<Grid item xs={12} md={8}>
				<DropsListPlaceholder user={user}/>
			</Grid>
			<Grid item xs={12} md={4}>
				<AnnouncementPage user={user} isSidebar={true}/>
			</Grid>
		</Grid>
	);
}