// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021/2022 Dominic Heil <d.heil@campus.tu-berlin.de>

import HeaderTypography from "./HeaderTypography";
import ParagraphTypography from "./ParagraphTypography";
import {
	Box,
	Collapse, TableCell,
	TableRow
} from "@mui/material";
import * as React from "react";
import {
	activeTextColor,
	faqDashedLineColor, textColor
} from "../assets/jss/colorPalette";
import { rightArrowGreenIcon, rightArrowWhiteIcon } from "../assets/jss/imagePalette";

/**
 * Row in FaQ table, contains content
 * @param strategy strategy
 * @param row content object
 * @returns {JSX.Element}
 */
export default function FaqQuestionRow({ strategy, row }) {
	return (
		<React.Fragment>
			<TableRow>
				<TableCell component="th" scope="row" onClick={strategy.toggleFaqRow} style={{ borderBottom: "none", paddingLeft: "0px", paddingBottom: "10px", paddingTop: "25px" }}>
					<HeaderTypography style={{ color: strategy.isOpened ? activeTextColor : textColor, cursor: "pointer", fontSize: "20px", fontWeight: "bold", userSelect: "none" }}>
						{row.title}&nbsp;
						<img src={strategy.isOpened ? rightArrowGreenIcon : rightArrowWhiteIcon} alt="->" />
					</HeaderTypography>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingTop: 0, borderBottom: `1px dashed ${faqDashedLineColor}`, paddingLeft: "0px" }} colSpan={6}>
					<Collapse in={strategy.isOpened} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 0, marginLeft: 0, paddingLeft: "0px", paddingBottom: "8px" }}>
							{row.text.map((paragraph, idx) => (
								<ParagraphTypography key={idx} style={{ color: textColor, lineHeight: "181%", paddingTop: "6px", paddingBottom: (idx < row.text.length - 1) ? "18px" : 0 }}>
									{paragraph}
								</ParagraphTypography>
							))}
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}
