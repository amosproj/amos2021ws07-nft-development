// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>

import React from "react";
import { useMediaQuery } from "react-responsive";

import HeaderTypography from "./HeaderTypography";
import ParagraphTypography from "./ParagraphTypography";
import { Link } from "react-router-dom";
import RoundedEdgesButton from "./RoundedEdgesButton";

import { textColor, activeTextColor } from "../assets/jss/colorPalette";
import bannerImage from "../assets/img/banner.png";

/**
 * Displays a welcoming background image with a button.
 * @param user user object of the currently logged in account
 * @returns {JSX.Element}
 */
export default function WelcomeBanner({ user }) {
	const welcomeTitle = "Welcome to NFT The World!";
	const welcomeSubtitle = <>
		Breathtaking NFT shopping lounge.<br/>
		Own your virtual map area from Nuremburg and Riga!
	</>;
	return <Banner user={user} title={welcomeTitle} subtitle={ welcomeSubtitle }/>;
}

/**
 * Displays background banner with headline "title", text "subtitle" and login-dependent button.
 * @param user user object of the currently logged in account
 * @returns {JSX.Element}
 */
export function Banner({ subtitle, title, user }) {
	const render=() => (
		<div style={containerStyle}>
			<div style={backgroundImageStyle}>
				<div style={{ ...bannerItemStyle, marginBottom: "11px" }}>{ bannerTitle }</div>
				<div style={{ ...bannerItemStyle, height: "66px", marginBottom: "32px" }}>{ bannerSubtitle }</div>
				<div style={{ ...bannerItemStyle, }}>{ button }</div>
			</div>
		</div>
	);

	const largeSizeThreshold = 700;
	const isLarge = useMediaQuery({ query: `(min-width: ${largeSizeThreshold}px)` });

	const bannerTitle = <BannerTitle isLarge={isLarge}>{ title }</BannerTitle>;
	const bannerSubtitle = <BannerSubTitle isLarge={isLarge}>{ subtitle }</BannerSubTitle>;
	const button = <BannerButton isLoggedIn={(user != null)} isLarge={isLarge}/>;

	const containerStyle = ({ minHeight: "305px", });
	const backgroundImageStyle = ({ padding: "44px", borderRadius: "15px", backgroundImage: `url(${bannerImage})`, backgroundSize: "cover", backgroundPosition: "center", alignItems: "center", justifyContent: "center", textAlign: "center", });
	const bannerItemStyle = ({ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" });
	return render();
}

const bannerStyle = ({ color: textColor });

function BannerTitle({ isLarge, children }) {
	const smallStyle = { ...bannerStyle, fontSize: 30, fontWeight: 550, bottomMargin: "5px" };
	const largeStyle = { ...bannerStyle, fontSize: 37, fontWeight: 700 };
	const style = isLarge? largeStyle : smallStyle;

	return <HeaderTypography style={style}>{ children }</HeaderTypography>;
}

function BannerSubTitle({ isLarge, children }) {
	const smallStyle = { ...bannerStyle, fontSize: 19, fontWeight: 400 };
	const largeStyle = { ...bannerStyle, fontSize: 22, fontWeight: 500 };
	const style = isLarge? largeStyle : smallStyle;

	return <ParagraphTypography style={style}>{ children }</ParagraphTypography>;
}

// according to mockup, the Banner's Button is slightly larger than the Header's
function BannerButton({ isLoggedIn }) {
	const buttonStyle = { height: "54px", width: "192px", fontWeight: 700, fontSize: "17px", };

	const BannerButtonComponent =  isLoggedIn? ProfileButton : SignupButton;
	return <BannerButtonComponent style={buttonStyle}/>;
}

function SignupButton({ style }) {
	const signupButtonStyle = { backgroundColor: activeTextColor, ...style };
	return (
		<RoundedEdgesButton style={signupButtonStyle} component={Link} to="/signup">
			Sign Up
		</RoundedEdgesButton>
	);
}

function ProfileButton({ style }) {
	const profileButtonStyle = { backgroundColor: "black", color: textColor, ...style };
	return (
		<RoundedEdgesButton color="inherit" style={profileButtonStyle} component={Link} to="/user/profile">
			Profile
		</RoundedEdgesButton>
	);
}