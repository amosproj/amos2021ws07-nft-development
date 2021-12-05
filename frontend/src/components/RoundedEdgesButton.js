// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import { Button } from "@mui/material";
import React from "react";

/**
 * This component implements a custom button with rounded edges. Builds up on the MUI Button.
 * @param props any props that will be passed to the MUI Button component that is customized.
 * @returns {JSX.Element}
 * @constructor
 */
export default function RoundedEdgesButton(props){
	return <>
		<Button
			{...props}
			style={{ borderRadius: "27px", height: "40px", textTransform: "none", ...props.style }}
			color="inherit"
		>
			<div style={{ fontFamily: "PT Sans" }}>
				{props.children}
			</div>
		</Button>
	</>;

}