// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021/2022 Dominic Heil <d.heil@campus.tu-berlin.de>
// SPDX-FileCopyrightText: 2022 Christoph Ehm. <christoph.ehmendoerfer@campus.tu-berlin.de>

import React from "react";
import NftCard from "../components/NftCard";
import { GroupSizes, defaultGroupSize } from "./NftCardStructuredList";

/**
 * Container to hold NftCard component
 * @param selectedNFTCardData state point to selecting card data
 * @param selectedGroupSize state size of group
 * @returns {JSX.Element}
 */
export function NFTCardViewContent({ selectedNFTCardData, selectedGroupSize }) {
	const groupSize = GroupSizes[selectedGroupSize] ?? GroupSizes[defaultGroupSize];
	const cardViewContainerStyle = {
		display: "grid",
		gridTemplateColumns: `repeat(auto-fit, minmax(${groupSize.gridColumnsMinMax}, max-content))`,
		gridGap: "8px",
		justifyContent: "center",
		padding: "initial",
	};

	return (<div style={cardViewContainerStyle}>
		{selectedNFTCardData.map((elem, idx) => <div key={idx}>
			<NftCard size={groupSize.cardSize} imgUrl={elem.imgUrl} nftPageUrl={elem.nftPageUrl} price={elem.priceEth} description={elem.description} title={elem.title} buttonText={elem.buttonText} />
		</div>
		)}
	</div>);
}
