// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2022 Christoph Ehm. <christoph.ehmendoerfer@campus.tu-berlin.de>
// SPDX-FileCopyrightText: 2021/2022 Dominic Heil <d.heil@campus.tu-berlin.de>
// SDPX-FileCopyrightText: 2022 Que Le <b.le@tu-berlin.de>

import React from "react";
import Image from "../components/Image";
import Margin from "../components/MarginNFTInfoPage";
import exampleImage from "../assets/img/nftExamples/image_part_021.png";

/**
 * Container for NFT info image
 * @param imgUrl link to the image
 * @returns
 */
export default function NFTInfoImage({ imgUrl = exampleImage }) {
	return (<div>
		<div style={{ marginLeft: "8px", width: "calc(100% - 16px)", }}>
			<Image src={imgUrl} borderRadius="3px" width="100%" />
		</div>
		<Margin height="27px" />
	</div>);
}
