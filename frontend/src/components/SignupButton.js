// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>

import React from "react";
import { Link } from "react-router-dom";
import RoundedEdgesButton from "./RoundedEdgesButton";
import { activeTextColor } from "../assets/jss/colorPalette";

/**
 * Sign up button, which uses RoundedEdgesButton.
 * @param style style
 * @returns {JSX.Element}
 */
export function SignupButton({ style }) {
	const signupButtonStyle = { backgroundColor: activeTextColor, ...style };
	return (
		<RoundedEdgesButton style={signupButtonStyle} component={Link} to="/signup">
			Sign Up
		</RoundedEdgesButton>
	);
}
