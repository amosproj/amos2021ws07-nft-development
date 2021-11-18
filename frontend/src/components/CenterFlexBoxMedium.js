// SPDX-License-Identifier: MIT
// SDPX-FileCopyrightText: 2021 Que Le <b.le@tu-berlin.de>

import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";


export default function CenterFlexBoxMedium({ children }) {
	return <Container component="main" maxWidth="md">
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