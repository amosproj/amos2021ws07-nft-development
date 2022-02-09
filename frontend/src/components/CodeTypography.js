// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021/2022 Dominic Heil <d.heil@campus.tu-berlin.de>
// SPDX-FileCopyrightText: 2022 Christoph Ehm. <christoph.ehmendoerfer@campus.tu-berlin.de>

import { Typography } from "@mui/material";
import React from "react";
import { textColor } from "../assets/jss/colorPalette";
import { monoFont } from "../assets/jss/fontPalette";

/**
 * Typography used for (source) code and monospace texts. Builds up on MUI Typography.
 * @param props any props that are passed to the MUI Typography
 * @returns {JSX.Element}
 */
export default function CodeTypography(props){
	return <Typography {...props} style={{ fontFamily: `${monoFont}, monospace`, color: textColor,  ...props.style }}>
		{props.children}
	</Typography>;
}