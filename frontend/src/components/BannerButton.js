// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>

import React from "react";
import { SignupButton } from "./SignupButton";
import { ProfileButton } from "./ProfileButton";

/**
 * Button in banner.
 * @param isLoggedIn state if user is logged in.
 * @returns {JSX.Element}
 */
export function BannerButton({ isLoggedIn }) {
	// according to mockup, the Banner's Button is slightly larger than the Header's
	const buttonStyle = { height: "54px", width: "192px", fontWeight: 700, fontSize: "17px", };

	const BannerButtonComponent = isLoggedIn ? ProfileButton : SignupButton;
	return <BannerButtonComponent style={buttonStyle} />;
}
