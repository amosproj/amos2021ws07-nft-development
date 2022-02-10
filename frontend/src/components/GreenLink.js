// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>

import React from "react";
import { Link } from "react-router-dom";
import { activeTextColor } from "../assets/jss/colorPalette";
import ButtonLink from "./ButtonLink";

/**
 * Arranges these things of NFT specific information.
 * @param to URL value
 * @param text text for button
 * @param style style
 * @returns {JSX.Element}
 */
export default function GreenLink({ to, text, style = {} }) {
	return (
		<Link to={to} style={{ textDecoration: "none" }}>
			<ButtonLink style={{ color: activeTextColor, display: "inline", ...style }}>
				{text}
			</ButtonLink>
		</Link>
	);
}
