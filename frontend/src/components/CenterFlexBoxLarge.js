// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";

/**
 * General purpose center flex box component
 * @param children
 * @returns {JSX.Element}
 */
export default function CenterFlexBoxLarge({ children }) {
	return <Container component="main" maxWidth="lg">
		<CssBaseline />
		<Box
			sx={{
				marginTop: 8,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}>
			{children}
		</Box>
	</Container>;
}