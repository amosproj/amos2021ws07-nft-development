// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2022 Christoph Ehm. <christoph.ehmendoerfer@campus.tu-berlin.de>
// SPDX-FileCopyrightText: 2021/2022 Dominic Heil <d.heil@campus.tu-berlin.de>
// SDPX-FileCopyrightText: 2022 Que Le <b.le@tu-berlin.de>

import React from "react";
import NFTBuyingOptions from "../components/NFTBuyingOptions";
import NFTSpecificInformation from "../components/NFTSpecificInformation";
import NFTDescription from "../components/NFTDescription";
import NFTAssociations from "../components/NFTAssociations";

/**
 * Represents a column of NFT specific information like owner, related NFT Drop, description, price...
 * @param CollectionLink JSX Component representing the Link back to the collection page
 *     where this NFT was selected.
 * @param OwnerLink JSX component representing the owner link.
 *     If <pre>null</pre> or <pre>undefined</pre>, it will omit the owner.
 * @param nftName nftName
 * @param infoPropertyLabelStyle infoPropertyLabelStyle
 * @param infoPropertyLinkStyle infoPropertyLinkStyle
 * @param textColor textColor
 * @returns {JSX.Element}
 */
export default function NFTInfoDetailColumn({ CollectionLink, OwnerLink, nftName, infoPropertyLabelStyle, infoPropertyLinkStyle, textColor }) {
	const varietyName = null; // TODO
	const mintDate = null; // TODO
	const tokenID = "1"; // TODO

	return (<>
		{/* <NFTAssociations {...{ CollectionLink, OwnerLink }}/> */}
		<NFTAssociations
			CollectionLink={CollectionLink} OwnerLink={OwnerLink} textColor={textColor}
			infoPropertyLabelStyle={infoPropertyLabelStyle}
			infoPropertyLinkStyle={infoPropertyLinkStyle}
		/>
		<NFTBuyingOptions />
		<NFTDescription dropName={nftName} />
		{/* <NFTSpecificInformation {...{ varietyName, mintDate, tokenID }} /> */}
		<NFTSpecificInformation
			tokenID={tokenID} varietyName={varietyName} mintDate={mintDate}
			textColor={textColor} infoPropertyLabelStyle={infoPropertyLabelStyle}
		/>
	</>);
}
