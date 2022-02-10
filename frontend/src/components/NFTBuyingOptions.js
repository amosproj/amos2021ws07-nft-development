// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>

import React from "react";
import Image from "../components/Image";
import Margin from "../components/MarginNFTInfoPage";
import { textFont } from "../assets/jss/fontPalette";
import { ethereumIcon } from "../assets/jss/imagePalette";
import NFTInfoBuyingLabel from "./NFTInfoBuyingLabel";

/**
 * Buying options
 * @returns {JSX.Element}
 */
export default function NFTBuyingOptions() {
	const price = "N/A"; // TODO, no owner? then join price, owner resells? then resale price, else null

	const render = () => (<>
		<div style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start", }}>
			{nftInfoPrice}
			{/*{nftInfoAction} // TODO: here, functionality could be implemented to e.g. hide this NFT */}
		</div>

		<Margin height="38px" />
	</>);

	const hasPrice = !!price;
	const nftInfoPrice = hasPrice && (<div>
		<NFTInfoBuyingLabel text="Price:" />
		<Margin height="2px" />

		<div style={{ fontFamily: textFont, fontWeight: "700", fontSize: "33px", }}>
			<Image src={ethereumIcon} alt="ETH" height="0.8em" display="inline" />
			{price}
			<Margin width="31px" />
		</div>
	</div>);

	return render();
}
