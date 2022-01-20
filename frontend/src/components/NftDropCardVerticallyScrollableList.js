// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import * as React from "react";
import NftCardFullWidth from "./NftCardFullWidth";
import VerticalSlider from "./VerticalSlider";
import Grid from "@mui/material/Grid";
import ParagraphTypography from "./ParagraphTypography";


export default function NftCardVerticallyScrollableList({ cardData }) {
	return <div style={{ width: "100%", minHeight: "561px" }}>
		{
			cardData.length === 0 &&
			<Grid container justifyContent="center" alignContent="center" style={{ paddingTop: "20px" }}>
				<ParagraphTypography>
					No drops in this category. Check out the other categories!
				</ParagraphTypography>
			</Grid>
		}
		<VerticalSlider>
			{cardData.map((elem, idx) =>
				<NftCardFullWidth key={idx} imgUrl={elem.imgUrl} dropTime={elem.dropTime} dropId={elem.dropId} nftPageUrl="/nftDropList" price={elem.priceEth} description={elem.description} title={elem.title} buttonText="Learn More" nftTotalAvailability={elem.nftTotalAvailability} nftLeft={elem.nftLeft}/>
			)}
		</VerticalSlider>
	</div>;
}