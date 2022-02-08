// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2022 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>
import React from "react";
import Box from "@mui/material/Box";
import { textColor } from "../assets/jss/colorPalette";

/** specify the axis "row" or "column" which is orthogonal to the center axis */
export const CenterBox = ({ row, column, sx, style, children, ...props }) => {
	let centerDirection = { justifyContent: "center", };
	if (row && !column)
		centerDirection = { flexDirection: "row", };
	if (column && !row)
		centerDirection = { flexDirection: "column", };

	return (<Box sx={sx} style={{ display: "flex", ...centerDirection, alignItems: "center", ...style, }} {...props}>
		{children}
	</Box>);
};

export const Image = ({ src, alt, onClick, ...style }) => (
	<img {...{ src, alt, onClick, style }} onDragStart={(e) => e.preventDefault()} unselectable="on" />
);

/**
 * Creates empty Space and allows for a solid separator line in between.
 * @param height CSS marginTop units. If width and borderMargin are used,
 *     this will determine the vertical length of the border instead.
 * @param width CSS marginLeft units. If set, the margin will behave like an HTML "span".
 * @param borderMargin CSS marginRight units if width is used otherwise marginBottom units.
 *     If set, 1px solid border is drawn between both margins.
 * @returns {JSX.Element}
 */
export function Margin({ width, height, borderMargin, sx, ...style }) {
	let horizontalSpace = {};
	let verticalSpace = {};
	let borderSpace = {};

	const usesVerticalBorder = width && borderMargin;
	if (width)
		horizontalSpace = { display: "inline", marginLeft: width };

	if (height && !usesVerticalBorder)
		verticalSpace = { marginTop: height };

	if (borderMargin) {
		let borderProperties = `1px solid ${textColor}`;
		if (usesVerticalBorder)
			borderSpace = { borderLeft: borderProperties, opacity: 0.09, marginRight: borderMargin, height, };
		else
			borderSpace = { borderTop: borderProperties, opacity: 0.09, marginBottom: borderMargin };
	}

	return <Box {...{ sx }} style={{ ...horizontalSpace, ...verticalSpace, ...borderSpace, ...style, }}/>;
}

