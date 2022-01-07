// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import * as React from "react";
import NftCardFullWidth from "./NftCardFullWidth";
import VerticalSlider from "./VerticalSlider";


export default function NftCardVerticallyScrollableList({ cardData }) {
	return <div style={{ width: "100%" }}>
		<VerticalSlider>
			{cardData.map((elem, idx) =>
				<NftCardFullWidth key={idx} imgUrl={elem.imgUrl} nftPageUrl="/nftDropList" price={elem.price} description={elem.description} title={elem.title} buttonText="Learn More" nftTotalAvailability={elem.nftTotalAvailability} nftLeft={elem.nftLeft}/>
			)}
		</VerticalSlider>
	</div>;
}