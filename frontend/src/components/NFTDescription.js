// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>

import React from "react";
import { textFont } from "../assets/jss/fontPalette";
import HeaderTypography from "./HeaderTypography";
import Margin from "./MarginNFTInfoPage";
import GreenLink from "./GreenLink";

/**
 * Description for Drop
 * @param dropName dropName
 * @returns {JSX.Element}
 */
export default function NFTDescription({ dropName = "" }) {
	const nftDescriptionContent = (<>
		This NFT is part of a drop that provides images of culture within the area of <GreenLink to="" text={dropName} style={{ fontSize: "19px" }} />.
	</>); // TODO, maybe use the Drop description for now

	return (<>
		<HeaderTypography style={{ fontWeight: "700", fontSize: "24px", }}>
			Description
		</HeaderTypography>

		<Margin height="20px" />

		<div style={{ fontFamily: textFont, fontWeight: "500", fontSize: "18px", }}>
			{nftDescriptionContent}
		</div>

		<Margin height="36px" />
	</>);
}
