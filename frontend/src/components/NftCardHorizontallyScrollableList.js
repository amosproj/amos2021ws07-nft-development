// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import * as React from "react";
import NftCardWide from "./NftCardWide";
import HorizontalSlider from "./HorizontalSlider";


export default function NftCardHorizontallyScrollableList({ cardData }) {
	return <div style={{ width: "100%", maxHeight: "max-content" }}>
		<HorizontalSlider>
			{cardData.map((elem, idx) =>
				<NftCardWide key={idx} imgUrl={elem.imgUrl} nftPageUrl="/nftDropList" price={elem.price} description={elem.description} title={elem.title} buttonText="Learn More" nftTotalAvailability={elem.nftTotalAvailability} nftLeft={elem.nftLeft}/>
			)}
		</HorizontalSlider>
	</div>;
}