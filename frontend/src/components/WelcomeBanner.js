// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>

import React from "react";
import { Banner } from "./Banner";

/**
 * Displays a welcoming background image with a button.
 * @param user user object of the currently logged in account
 * @returns {JSX.Element}
 */

export default function WelcomeBanner({ user }) {
	const welcomeTitle = "Welcome to NFT The World!";
	const welcomeSubtitle = <>
		Breathtaking NFT shopping lounge.<br />
		Own your virtual map area from Nuremburg and Riga!
	</>;
	return <Banner user={user} title={welcomeTitle} subtitle={welcomeSubtitle} />;
}
