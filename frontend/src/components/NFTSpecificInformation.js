// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>

import React from "react";
import Box from "@mui/material/Box";
import { textFont } from "../assets/jss/fontPalette";
import CodeTypography from "./CodeTypography";
import CenterBox from "./CenterBox";
import Margin from "./MarginNFTInfoPage";
import ParagraphTypography from "./ParagraphTypography";
// import { textColor, infoPropertyLabelStyle } from "./NFTInfoPage";
import CopyButton from "./CopyButton";

/**
 * Arranges these things of NFT specific information.
 * @param varietyName String, hides variety label if null/undefined
 * @param mintDate Date or String, hides mint date if null/undefined
 * @param tokenID String
 * @returns {JSX.Element}
 */
export default function NFTSpecificInformation({ tokenID, varietyName = null, mintDate = null, textColor, infoPropertyLabelStyle }) {
	const nftTokenIDStyle = { fontSize: "12px", color: textColor(0.5), };
	const render = () => (<div>
		<Box sx={{ flexDirection: { xs: "column", md: "row", }, alignItems: { md: "baseline", }, }} style={{ display: "flex", }}>
			<ParagraphTypography style={{ display: "inline", ...nftTokenIDStyle }}>
				NFT Token ID:&ensp;
			</ParagraphTypography>

			<Margin sx={{ display: { xs: "block", md: "none", } }} height="0.5em" />

			<CenterBox row style={nftTokenIDStyle}>
				<span style={{ maxWidth: "calc(100% - 31px)", overflow: "hidden", textOverflow: "ellipsis", }}>
					{tokenIDField}
				</span>

				<Margin width="13px" />

				<CopyButton copyContent={tokenID} />
			</CenterBox>
		</Box>

		<Margin height="8px" borderMargin="19px" />

		<div style={{ fontFamily: textFont, }}>
			{varietyInfo}

			{mintDateInfo}

			{!hasVariety && !isMinted &&
				<Margin sx={{ display: { xs: "block", md: "none" } }} height="20px" />}
		</div>
	</div>);

	const tokenIDField = (
		<CodeTypography style={{ color: "inherit", display: "inline", fontSize: "13px", fontWeight: "500", padding: "4px", background: textColor(0.02), borderRadius: "4px" }}>
			{tokenID}
		</CodeTypography>
	);


	const varietyColor = "#00528D"; // TODO, for example take bits from varietyName hash
	const VarietyLabel = () => (
		<span style={{ fontSize: "13px", fontWeight: "500", padding: "3px", borderRadius: "3px", background: varietyColor, foreground: textColor(), }}>
			{varietyName}
		</span>
	);
	const hasVariety = !!varietyName;
	const varietyInfo = hasVariety && (<>
		<span style={infoPropertyLabelStyle}>
			Variety&ensp;<VarietyLabel />
		</span>

		<Margin sx={{ display: { xs: "none", md: "inline" } }} width="17px" />
		<Margin sx={{ display: { xs: "block", md: "none" } }} height="4px" />
	</>);


	const MintDateString = () => (
		<span style={{ fontWeight: "500", fontSize: "inherit" }}>
			{mintDate.toDateString?.().substring(4) ?? mintDate}
		</span>
	);
	const isMinted = !!mintDate;
	const mintDateInfo = isMinted && (
		<span style={infoPropertyLabelStyle}>
			Minted&nbsp;<MintDateString />
		</span>
	);

	return render();
}
