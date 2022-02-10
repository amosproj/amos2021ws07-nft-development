// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2022 Christoph Ehm. <christoph.ehmendoerfer@campus.tu-berlin.de>
// SPDX-FileCopyrightText: 2021/2022 Dominic Heil <d.heil@campus.tu-berlin.de>
// SDPX-FileCopyrightText: 2022 Que Le <b.le@tu-berlin.de>

import React from "react";
import Image from "../components/Image";
import Margin from "../components/MarginNFTInfoPage";
import { headerFont } from "../assets/jss/fontPalette";
import { leftAngleIcon } from "../assets/jss/imagePalette";

/**
 * BackLink, used at the top of the page.
 * @param Link ?
 * @param style style
 * @returns {JSX.Element}
 */
export default function BackLink({ Link, style }) {
	return (
		<div style={style}>
			<Link>
				<div style={{ fontFamily: headerFont, fontWeight: "500", fontSize: "12px", display: "flex", alignItems: "center" }}>
					<Image src={leftAngleIcon} alt="<" height="1em" />
					<Margin width="9px" />
					<span style={{ marginTop: "-0.1em", }}>
						Back to my collection
					</span>
				</div>
			</Link>
		</div>
	);
}
