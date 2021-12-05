// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>

import React, { useEffect, useState } from "react";
import HeaderTypography from "./HeaderTypography";
import ParagraphTypography from "./ParagraphTypography";
import { Link } from "react-router-dom";
//import appwriteApi from "../api/appwriteApi";
import RoundedEdgesButton from "./RoundedEdgesButton";
import { Grid } from "@mui/material"

import { textColor, signupButtonColor } from "../assets/jss/colorPalette";
import bannerImage from "../assets/img/banner.png"

const backgroundImageStyle = {
	backgroundImage: `url(${bannerImage})`,
	backgroundPosition: "center",
};

/**
 * Displays a welcoming background image with a button.
 * @param user user object of the currently logged in account
 * @returns {JSX.Element}
 */
export default function Banner({ children, title, user }) {
	const bannerTitle = <BannerTitle>{ title }</BannerTitle>;
	const bannerSubTitle = <BannerSubTitle>{ children }</BannerSubTitle>;
	const bannerButton = <BannerButton isLoggedIn={(user != null)} style={{ fontSize: 17, }}/>;
	const bannerContainerStyle = {
		height: 305,
		width: 1100,
		left: 164,
		top: 96,
		borderRadius: 15,
		padding: 40,
		textAlign: "center",
	};

	return (
		<div style={backgroundImageStyle}>
			<Grid container direction="column" alignItems="center" justifyContent="center" columnSpacing={28} style={bannerContainerStyle}>{
				[bannerTitle, bannerSubTitle, bannerButton].map((item,index) => (
					<Grid item key={index}>{item}</Grid>
				))
			}</Grid>
		</div>
	);
}
/*
export default function Banner({ children, title, user }) {
	const [isAdmin, setAdminStatus] = useState(false);
	const isLoggedIn = (user != null);

	const updateAdminStatus = async () => {
		setAdminStatus(false);
		if (isLoggedIn) {
			appwriteApi.userIsMemberOfTeam("Admins").then(setAdminStatus);
		}
	};
	useEffect(updateAdminStatus, [user]);

	return (
		<div style={backgroundImageStyle}>
			<Grid container {...bannerContainer}>
				<BannerTitle>{ title }</BannerTitle>
				<BannerSubTitle>{ children }</BannerSubTitle>
				<BannerButton isLoggedIn={isLoggedIn}/>
			</Grid>
		</div>
	);
}
*/

function BannerTitle({ style, children }) {
	return <HeaderTypography style={{ color: textColor, fontSize: 37, ...style }}>{ children }</HeaderTypography>
}

function BannerSubTitle({ style, children }) {
	return <ParagraphTypography style={{ color: textColor, fontSize: 22, ...style }}>{ children }</ParagraphTypography>
}

// according to mockup, the Banner's Button is slightly larger than the Header's
const bannerButtonStyle = {
	height: 54,
	width: 192,
	left: 624,
	top: 303,
	borderRadius: 27,
};

function BannerButton({ isLoggedIn }) {
	if (!isLoggedIn) {
		return <SignupButton style={bannerButtonStyle}/>;
	}
	return <ProfileButton style={bannerButtonStyle}/>;
}

function SignupButton(style) {
	return (
		<RoundedEdgesButton style={{ backgroundColor: signupButtonColor, ...style }} component={Link} to="/signup">
			Sign Up
		</RoundedEdgesButton>
	);
}

function ProfileButton({ style }) {
	return (
		<RoundedEdgesButton color="inherit" style={style} component={Link} to="/user/profile">
			Profile
		</RoundedEdgesButton>
	);
}