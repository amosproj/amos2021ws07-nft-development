// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2022 Christoph Ehm. <christoph.ehmendoerfer@campus.tu-berlin.de>
// SPDX-FileCopyrightText: 2021/2022 Dominic Heil <d.heil@campus.tu-berlin.de>
// SDPX-FileCopyrightText: 2022 Que Le <b.le@tu-berlin.de>

import React from "react";
import Margin from "../components/MarginNFTInfoPage";
import { textFont } from "../assets/jss/fontPalette";

/**
 * NFTAssociations.
 * OwnerLink may also be null or undefined
 * @param CollectionLink CollectionLink
 * @param OwnerLink OwnerLink
 * @returns {JSX.Element}
 */
export default function NFTAssociations({ 
	CollectionLink, OwnerLink = null, infoPropertyLabelStyle, infoPropertyLinkStyle, textColor
}) {
	const owner = !!OwnerLink && (<>
		<span style={infoPropertyLabelStyle}>
			Owner&nbsp;
		</span>
		<span style={infoPropertyLinkStyle}>
			<OwnerLink />
		</span>

		<Margin sx={{ display: { xs: "none", sm: "inline", } }} width="30px" />
		<Margin sx={{ display: { xs: "block", sm: "none", } }} height="4px" />
	</>);

	return (<>
		<div style={{ fontFamily: textFont, }}>
			{owner}
			<span style={infoPropertyLabelStyle}>
				Part of&nbsp;
			</span>
			<span style={infoPropertyLinkStyle}>
				<CollectionLink />
			</span>
		</div>
		<div style={{ marginTop: "27px", marginBottom: "23px", borderTop: "1px solid " + textColor(0.09) }} />
	</>);
}
