// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021/2022 Dominic Heil <d.heil@campus.tu-berlin.de>

import React from "react";
import { linkFont } from "../assets/jss/fontPalette";

/**
 * Typography used for headings. Customized with Noto Sans font. Builds up on MUI Typography.
 * @param props any props that are passed to the MUI Typography
 * @returns {JSX.Element}
 */
export default function ButtonLink(props){
	return <span {...props} style={{ fontFamily: linkFont,  ...props.style }}>
		{props.children}
	</span>;
}