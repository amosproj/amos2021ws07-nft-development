// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2022 Christoph Ehm. <christoph.ehmendoerfer@campus.tu-berlin.de>
// SPDX-FileCopyrightText: 2021/2022 Dominic Heil <d.heil@campus.tu-berlin.de>
// SDPX-FileCopyrightText: 2022 Que Le <b.le@tu-berlin.de>

import React from "react";
import CodeTypography from "../components/CodeTypography";
import CenterBox from "../components/CenterBox";
import Margin from "../components/MarginNFTInfoPage";
import {
	nftInfoPageDropHashTextColor,
	nftInfoPageInfoCardBackgroundColor
} from "../assets/jss/colorPalette";
import GreenLink from "../components/GreenLink";
import ParagraphTypography from "../components/ParagraphTypography";
import CopyButton from "../components/CopyButton";
// import { textColor } from "./NFTInfoPage";

/**
 * represents a column with NFT image and associated NFT Drop information.
 * @param CollectionLink represents a link back to the NFT Collection page where this NFT was selected.
 * @param AuthorLink represents a link to the original creator account.
 * @param nftDropToken nftDropToken.
 * @param dropName dropName.
 * @returns
 */
export default function NFTInfoDropInfo({ CollectionLink, AuthorLink, nftDropToken, dropName, textColor }) {
	const nftDropText = <>This NFT is part of a drop that provides images of culture within the area of <GreenLink to="" text={dropName} style={{ fontSize: "16px" }} />.</>; // TODO
	const nftDropHashString = nftDropToken; // TODO

	const fourLinesStyle = { display: "-webkit-box", lineClamp: 4, WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" };
	const render = () => (
		<div style={{ paddingTop: "10px", paddingLeft: "16px", paddingBottom: "15px", paddingRight: "16px", borderRadius: "7px", background: nftInfoPageInfoCardBackgroundColor, }}>
			<ParagraphTypography style={{ color: textColor(0.83), fontWeight: "400", fontSize: "13px", }}>
				This item is part of drop <CollectionLink />.
			</ParagraphTypography>

			<Margin height="10px" />

			<ParagraphTypography style={{ fontWeight: "700", fontSize: "16px", }}>
				About Drop
			</ParagraphTypography>

			<Margin height="3px" />

			<ParagraphTypography style={{ color: textColor(0.5), fontSize: "13px", }}>
				Author: <AuthorLink />
			</ParagraphTypography>

			<Margin height="9px" />

			<ParagraphTypography style={{ color: textColor(0.9), fontSize: "15px", fontWeight: "500", ...fourLinesStyle }}>
				{nftDropText}
			</ParagraphTypography>

			<Margin height="0.9em" />

			<NFTDropHash />
		</div>
	);

	const NFTDropHash = () => {
		const dropHashBoxStyle = ({
			width: "calc(100% - 31px)",
			overflow: "hidden",
			textOverflow: "ellipsis",
			paddingLeft: "7px",
			paddingRight: "7px",
			paddingTop: "6px",
			paddingBottom: "6px",
			color: nftInfoPageDropHashTextColor,
			background: textColor(0.02),
			border: "1px dashed " + textColor(0.14),
			boxSizing: "border-box",
			borderRadius: "4px",
		});

		return (<>
			<ParagraphTypography style={{ color: textColor(0.5), fontWeight: "500", fontSize: "13px" }}>
				NFT token address:
			</ParagraphTypography>

			<Margin height="7px" />

			<CenterBox row style={{ justifyContent: "space-between", }}>
				<CodeTypography style={dropHashBoxStyle}>
					{nftDropHashString}
				</CodeTypography>

				<Margin width="13px" />

				<CopyButton copyContent={nftDropHashString} />
			</CenterBox>
		</>);
	};

	return render();
}
