// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2022 Christoph Ehm. <christoph.ehmendoerfer@campus.tu-berlin.de>
// SPDX-FileCopyrightText: 2021/2022 Dominic Heil <d.heil@campus.tu-berlin.de>
// SDPX-FileCopyrightText: 2022 Que Le <b.le@tu-berlin.de>

import React from "react";
import { Link } from "react-router-dom";
import { linkFont } from "../assets/jss/fontPalette";

/**
 * SimpleLink
 * @param to url
 * @param text text to display
 * @returns {JSX.Element}
 */
export default function SimpleLink({ to, text }) {
	return (
		<Link to={to} style={{ fontFamily: linkFont, textDecoration: "none", color: "inherit", display: "inline" }}>
			{text}
		</Link>
	);
}
