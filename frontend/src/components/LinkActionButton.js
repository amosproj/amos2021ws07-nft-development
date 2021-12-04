// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

/**
 * This component implements a custom button with rounded edges. Builds up on the MUI Button.
 * @param props any props that will be passed to the MUI Button component that is customized.
 * @returns {JSX.Element}
 * @constructor
 */
export default function LinkActionButton({ onClick, style, to, children, component=Button }){
	let ButtonComponent = component;
	return <Link to={to} onClick={onClick} style={{ underline: "none", color: "transparent" }}>
		<ButtonComponent style={style} >
			{children}
		</ButtonComponent>
	</Link>;

}