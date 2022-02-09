// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021/2022 Dominic Heil <d.heil@campus.tu-berlin.de>

import { Table, TableBody, TableContainer } from "@mui/material";
import * as React from "react";
import { activeTextColor, textColor } from "../assets/jss/colorPalette";
import ButtonLinkTypography from "../components/ButtonLinkTypography";
import FaqQuestionRow from "./FaqQuestionRow";

/**
 * Table contains FAQ components
 * @param faqData data for FaQ
 * @returns {JSX.Element}
 */
export default function FaqTable({ faqData }) {
	const [openedId, setOpenedId] = React.useState(0);
	const maxOpenedId = (1 << faqData.length) - 1;
	const isFullyExtended = (openedId === maxOpenedId);

	const ExpansionStrategy = {
		SINGLE: function (id) {
			this.toggleFaqRow = () => setOpenedId((this.isOpened ? 0 : 1) << id);
			this.isOpened = !!((openedId >> id) & 1);
		},

		MULTIPLE: function (id) {
			this.toggleFaqRow = () => setOpenedId(openedId ^ (1 << id));
			this.isOpened = !!((openedId >> id) & 1);
		},
	};
	const defaultStrategy = "SINGLE";
	const otherStrategy = "MULTIPLE";
	const [strategyId, setStrategyId] = React.useState(defaultStrategy);
	let Strategy = ExpansionStrategy[strategyId];

	return (<>
		<div style={{ display: "flex", }}>
			<ButtonLinkTypography onClick={() => setOpenedId(isFullyExtended ? 0 : maxOpenedId)} style={{ cursor: "pointer", color: isFullyExtended ? activeTextColor : textColor, }}>
				{isFullyExtended ? "hide all" : "show all"}
			</ButtonLinkTypography>
			&nbsp;&nbsp;|&nbsp;&nbsp;
			<ButtonLinkTypography onClick={() => setStrategyId(strategyId === otherStrategy ? defaultStrategy : otherStrategy)} style={{ cursor: "pointer", color: strategyId === otherStrategy ? activeTextColor : textColor }}>
				multi mode
			</ButtonLinkTypography>
		</div>
		<TableContainer>
			<Table aria-label="collapsible table">
				<TableBody>
					{faqData.map((row, index) => (
						<FaqQuestionRow key={row.title.replace(" ", "_")} strategy={new Strategy(index)} row={row} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	</>
	);
}
