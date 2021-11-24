// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import { Button } from "@mui/material";
import React from "react";

export default function HeaderButton(props){
	return <Button
		{...props}
		style={{ ...props.style, borderRadius: "27px", height: "40px", textTransform: "none" }}
		color="inherit">
		<div style={{ fontFamily: "PT Sans" }}>
			{props.children}
		</div>
	</Button>;

}