// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import React from "react";
import ParagraphTypography from "../components/ParagraphTypography";
import { Link } from "react-router-dom";
import CenterFlexBox from "../components/CenterFlexBox";
import { activeTextColor } from "../assets/jss/colorPalette";

/**
 * Wrapper component that only displays its children if the user is a logged in user, otherwise wrapped components
 * will not be shown.
 * @param user user object of the currently logged in user or null if not logged in
 * @param children wrapped components that should only be shown logged in users
 * @returns {JSX.Element}
 */
export default function UserArea({ user, children }) {

	if (!user){
		return <CenterFlexBox>
			<ParagraphTypography>
				You are trying to access a user restricted area. Please <Link to="/login" style={{ textDecorationLine: "none", color: activeTextColor }}>login</Link>.
			</ParagraphTypography>
		</CenterFlexBox>;
	}

	return <>
		{children}
	</>;
}