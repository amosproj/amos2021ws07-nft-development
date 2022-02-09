// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021/2022 Dominic Heil <d.heil@campus.tu-berlin.de>

import { Typography } from "@mui/material";
import React from "react";
import { textFont } from "../assets/jss/fontPalette";

/**
 * Typography used for paragraphs and some headings. Customized with Noto Sans font. Builds up on MUI Typography.
 * @param props any props that are passed to the MUI Typography
 * @returns {JSX.Element}
 */
export default function ParagraphTypography(props){
	return <Typography {...props} style={{ fontFamily: textFont, ...props.style }}>
		{props.children}
	</Typography>;
}