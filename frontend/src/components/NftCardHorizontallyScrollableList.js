// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import { useRef } from "react";
import { useContainerDimensions } from "../hooks/useContainerDimensions";
import HorizontalScrollbar from "./HorizontalScrollbar";
import NftCard from "./NftCard";
import * as React from "react";


export default function NftCardHorizontallyScrollableList({ cardData }) {
	const componentRef = useRef();
	const { height } = useContainerDimensions(componentRef);

	return <div style={{ width: "100%", maxHeight: "max-content" }}>
		<HorizontalScrollbar width="100%" height={height+"px"}>
			<div style={{ display: "table" }} ref={componentRef}>
				{cardData.map((elem, idx) =>
					<div key={idx} style={{ display: "table-cell", paddingRight: "16px" }}>
						<NftCard md imgUrl={elem.imgUrl} nftPageUrl="/nftDropList" price={elem.price} description={elem.description} title={elem.title} buttonText="See more ..."/>
					</div>
				)}
			</div>
		</HorizontalScrollbar>
	</div>;
}