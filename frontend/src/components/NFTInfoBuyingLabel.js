// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>

import React from "react";
import ParagraphTypography from "../components/ParagraphTypography";

/**
 * MUI ParagraphTypography container to display NFT buying label
 * @param text label
 * @param textColor textColor
 * @returns {JSX.Element}
 */

export default function NFTInfoBuyingLabel({ text, textColor }) {
	return (
		<ParagraphTypography style={{ fontWeight: "500", fontSize: "13px", color: textColor(0.57) }}>
			{text}
		</ParagraphTypography>
	);
}
