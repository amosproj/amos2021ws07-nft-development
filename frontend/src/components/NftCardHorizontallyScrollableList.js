// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import * as React from "react";
import NftCardWide from "./NftCardWide";
import HorizontalSlider from "./HorizontalSlider";
import Grid from "@mui/material/Grid";
import ParagraphTypography from "./ParagraphTypography";

/**
 * A horizontal, scrollable list to displat NFT card.
 * @param cardData Array holds data for NFT cards
 * @returns {JSX.Element}
 */
export default function NftCardHorizontallyScrollableList({ cardData }) {
	return <div style={{ width: "100%", maxHeight: "max-content", minHeight: "476px" }}>
		{
			cardData.length === 0 &&
			<Grid container justifyContent="center" alignContent="center" style={{ paddingTop: "20px" }}>
				<ParagraphTypography>
					No drops in this category. Check out the other categories!
				</ParagraphTypography>
			</Grid>
		}
		<HorizontalSlider>
			{cardData.map((elem, idx) =>
				<NftCardWide key={idx} imgUrl={elem.imgUrl} dropId={elem.dropId} dropTime={elem.dropTime} nftPageUrl="/nftDropList" price={elem.priceEth} description={elem.description} title={elem.title} buttonText="Learn More" nftTotalAvailability={elem.nftTotalAvailability} nftLeft={elem.nftLeft}/>
			)}
		</HorizontalSlider>
	</div>;
}