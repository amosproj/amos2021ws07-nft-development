// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import * as React from "react";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";

/**
 * General purpose center flex box component
 * @param children
 * @returns {JSX.Element}
 */
export default function CenterFlexBox({ children }) {
	return <Container maxWidth="xs">
		<Box
			sx={{
				marginTop: 14,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			{children}
		</Box>
	</Container>;
}