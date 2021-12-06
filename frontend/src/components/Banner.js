// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>

import React from "react";
import HeaderTypography from "./HeaderTypography";
import ParagraphTypography from "./ParagraphTypography";
import { Link } from "react-router-dom";
import RoundedEdgesButton from "./RoundedEdgesButton";

import { textColor, activeTextColor } from "../assets/jss/colorPalette";
import bannerImage from "../assets/img/banner.png";

export default function WelcomeBanner({ user }) {
	const welcomeTitle = "Welcome to NFT The World!";
	const welcomeSubtitle = <>
		Breathtaking NFT shopping lounge.<br/>
		Own your virtual map area from Nuremburg and Riga!
	</>;
	return <Banner user={user} title={welcomeTitle}>{ welcomeSubtitle }</Banner>;
}

/**
 * Displays a welcoming background image with a button.
 * @param user user object of the currently logged in account
 * @returns {JSX.Element}
 */
export function Banner({ children, title, user }) {
	const bannerTitle = <BannerTitle>{ title }</BannerTitle>;
	const subTitle = <BannerSubTitle>{ children }</BannerSubTitle>;
	const button = <BannerButton isLoggedIn={(user != null)} style={{ fontSize: "17px", }}/>;

	const containerStyle = ({
		
	});
	const backgroundImageStyle = ({
		padding: "44px",
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center",
	
		borderRadius: "15px",
		backgroundImage: `url(${bannerImage})`,
		backgroundPosition: "center",
		backgroundSize: "cover",
	});

	const BannerItem = ({ children, style }) => {
		return <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", ...style }}>{
			children
		}</div>;
	};

	return (
		<div style={containerStyle}>
			<div style={backgroundImageStyle}>
				<BannerItem style={{ marginBottom: "11px" }}>{ bannerTitle }</BannerItem>
				<BannerItem style={{ height: "66px", marginBottom: "32px" }}>{ subTitle }</BannerItem>
				<BannerItem style={{ }}>{ button }</BannerItem>
			</div>
		</div>
	);
}

const bannerStyle = ({ color: textColor });

function BannerTitle({ style, children }) {
	//const smallStyle = { ...bannerStyle, fontSize: 30, fontWeight: 550, bottomMargin: "5px", ...style };
	const mediumStyle = { ...bannerStyle, fontSize: 37, fontWeight: 700, ...style };

	return <HeaderTypography style={mediumStyle}>{ children }</HeaderTypography>;
}

function BannerSubTitle({ style, children }) {
	//const smallStyle = { ...bannerStyle, fontSize: 19, fontWeight: 400, ...style };
	const mediumStyle = { ...bannerStyle, fontSize: 22, fontWeight: 500, ...style };

	return <ParagraphTypography style={mediumStyle}>{ children }</ParagraphTypography>;
}

// according to mockup, the Banner's Button is slightly larger than the Header's
function BannerButton({ isLoggedIn, style }) {
	const buttonStyle = { height: "54px", width: "192px", fontWeight: 700, ...style };

	if (!isLoggedIn) {
		return <SignupButton style={buttonStyle}/>;
	}
	return <ProfileButton style={buttonStyle}/>;
}

function SignupButton({ style }) {
	const backgroundColor = activeTextColor;
	return (
		<RoundedEdgesButton style={{ backgroundColor, ...style }} component={Link} to="/signup">
			Sign Up
		</RoundedEdgesButton>
	);
}

function ProfileButton({ style }) {
	const backgroundColor = "#000000";
	const color = textColor;
	return (
		<RoundedEdgesButton color="inherit" style={{ backgroundColor, color, ...style }} component={Link} to="/user/profile">
			Profile
		</RoundedEdgesButton>
	);
}