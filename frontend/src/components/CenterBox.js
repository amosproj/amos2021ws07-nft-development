// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2022 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>

import React from "react";
import Box from "@mui/material/Box";

/**
 * "Previous" arrow component.
 * @param row axis orthogonal to the center axis
 * @param column axis orthogonal to the center axis
 * @param sx custom style that has access to the theme
 * @param style style
 * @param children children
 * @returns {JSX.Element}
 */
export default function CenterBox({ row, column, sx, style, children, }) {
	let centerDirection = { justifyContent: "center", };
	if (row && !column)
		centerDirection = { flexDirection: "row", };
	if (column && !row)
		centerDirection = { flexDirection: "column", };

	return (<Box sx={sx} style={{ display: "flex", ...centerDirection, alignItems: "center", ...style, }}>
		{children}
	</Box>);
}
