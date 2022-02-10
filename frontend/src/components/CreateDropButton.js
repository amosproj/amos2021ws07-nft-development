// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>
// SPDX-FileCopyrightText: 2022 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>

import React from "react";
import { buttonWhiteBorderColor } from "../assets/jss/colorPalette";
import CenterBox from "../components/CenterBox";
import RoundedEdgesButton from "../components/RoundedEdgesButton";
import { Link } from "react-router-dom";

/**
 * "Create Drop" button.
 * @returns {JSX.Element}
 */
export default function CreateDropButton() {
	const createDropButtonStyle = { backgroundColor: "transparent", width: "192px", height: "47px", fontSize: "14px", border: `1px solid ${buttonWhiteBorderColor}`, color: buttonWhiteBorderColor };
	return (<CenterBox>
		<RoundedEdgesButton component={Link} to="/createNewDrop" style={createDropButtonStyle}>
			Create new drop
		</RoundedEdgesButton>
	</CenterBox>);
}