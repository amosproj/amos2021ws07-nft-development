// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021/2022 Dominic Heil <d.heil@campus.tu-berlin.de>

import { Typography } from "@mui/material";
import React from "react";
import { textColor } from "../assets/jss/colorPalette";
import { headerFont } from "../assets/jss/fontPalette";

/**
 * Typography used for headings. Customized with Noto Sans font. Builds up on MUI Typography.
 * @param props any props that are passed to the MUI Typography
 * @returns {JSX.Element}
 */
export default function HeaderTypography(props){
	return <Typography {...props} style={{ fontFamily: headerFont, color: textColor,  ...props.style }}>
		{props.children}
	</Typography>;
}