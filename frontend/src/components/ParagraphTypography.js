// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import { Typography } from "@mui/material";
import React from "react";

/**
 * Typography used for paragraphs and some headings. Customized with Noto Sans font. Builds up on MUI Typography.
 * @param props any props that are passed to the MUI Typography
 * @returns {JSX.Element}
 * @constructor
 */
export default function ParagraphTypography(props){
	return <Typography {...props} style={{ ...props.style, fontFamily: "Noto Sans" }}>
		{props.children}
	</Typography>;
}