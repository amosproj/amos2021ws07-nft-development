// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>

import React from "react";
import { useMediaQuery } from "react-responsive";
import { landingPageBannerImg } from "../assets/jss/imagePalette";
import { BannerTitle } from "./BannerTitle";
import { BannerSubTitle } from "./BannerSubTitle";
import { BannerButton } from "./BannerButton";

/**
 * Displays background banner with headline "title", text "subtitle" and login-dependent button.
 * @param user user object of the currently logged in account
 * @returns {JSX.Element}
 */
export default function Banner({ subtitle, title, user }) {
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
	const backgroundImageStyle = ({ padding: "44px", borderRadius: "15px", backgroundImage: `url(${landingPageBannerImg})`, backgroundSize: "cover", backgroundPosition: "center", alignItems: "center", justifyContent: "center", textAlign: "center", });
	const bannerItemStyle = ({ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" });
	return render();
}