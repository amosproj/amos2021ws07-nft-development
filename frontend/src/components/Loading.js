// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2022 Dominic Heil <d.heil@campus.tu-berlin.de>

import Grid from "@mui/material/Grid";
import React from "react";
import { CircularProgress } from "@mui/material";

/**
 * "Loading" uses MUI CircularProgress component.
 * @returns {JSX.Element}
 */
export default function Loading() {
	return (
		<Grid item style={{ width: "100%", marginTop: "20px" }}>
			<Grid container alignItems="center" justifyContent="center" direction="column">
				<Grid item >
					<CircularProgress color="inherit"/>
				</Grid>
			</Grid>
		</Grid>
	);
}