// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>

import React from "react";
import { Link } from "react-router-dom";
import RoundedEdgesButton from "./RoundedEdgesButton";
import { textColor } from "../assets/jss/colorPalette";

/**
 * Button in profile area.
 * @param style style
 * @returns {JSX.Element}
 */
export function ProfileButton({ style }) {
	const profileButtonStyle = { backgroundColor: "black", color: textColor, ...style };
	return (
		<RoundedEdgesButton color="inherit" style={profileButtonStyle} component={Link} to="/user/profile">
			Profile
		</RoundedEdgesButton>
	);
}
