// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import React from "react";
import HeaderTypography from "../components/HeaderTypography";
import ParagraphTypography from "../components/ParagraphTypography";
import { Box } from "@mui/material";
import { secondaryTextColor } from "../assets/jss/colorPalette";

import ExampleNftImg21 from "../assets/img/nftExamples/image_part_021.png";
import ExampleNftImg22 from "../assets/img/nftExamples/image_part_022.png";
import ExampleNftImg23 from "../assets/img/nftExamples/image_part_023.png";
import ExampleNftImg24 from "../assets/img/nftExamples/image_part_024.png";
import ExampleNftImg37 from "../assets/img/nftExamples/image_part_037.png";
import ExampleNftImg38 from "../assets/img/nftExamples/image_part_038.png";
import ExampleNftImg39 from "../assets/img/nftExamples/image_part_039.png";
import ExampleNftImg40 from "../assets/img/nftExamples/image_part_040.png";
import ExampleNftImg41 from "../assets/img/nftExamples/image_part_041.png";
import ExampleNftImg42 from "../assets/img/nftExamples/image_part_042.png";
import NftCardList from "../components/NftCardList";

let dummyData = [
	{ title: "Nürnberg NFT 021", price: "1.0", nftPageUrl: "/drop", imgUrl: ExampleNftImg21, buttonText: "Join drop", description: "There is something cool about this text. When this text gets to long the text will be automatically cut off. My biggest secret is that I love cookies." },
	{ title: "Nürnberg NFT 021", price: "0.0001", nftPageUrl: "/drop", imgUrl: ExampleNftImg21, buttonText: "Join drop", description: "text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text " },
	{ title: "Nürnberg NFT 022", price: "0.0002", nftPageUrl: "/drop", imgUrl: ExampleNftImg22, buttonText: "Join drop", description: "This text can be descriptive." },
	{ title: "Nürnberg NFT 023", price: "0.0003", nftPageUrl: "/drop", imgUrl: ExampleNftImg23, buttonText: "Join drop", description: "This text is not descriptive." },
	{ title: "Nürnberg NFT 024", price: "0.002", nftPageUrl: "/drop", imgUrl: ExampleNftImg24, buttonText: "Join drop", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet." },
	{ title: "Nürnberg NFT 037", price: "0.01", nftPageUrl: "/drop", imgUrl: ExampleNftImg37, buttonText: "Join drop", description: "Descriptions are optional." },
	{ title: "Nürnberg NFT 038", price: "0.0001", nftPageUrl: "/drop", imgUrl: ExampleNftImg38, buttonText: "Join drop" },
	{ title: "Nürnberg NFT 039", price: "0.0001", nftPageUrl: "/drop", imgUrl: ExampleNftImg39, buttonText: "Join drop", description: "The previous NFT had no description." },
	{ title: "Nürnberg NFT 040", price: "0.0001", nftPageUrl: "/drop", imgUrl: ExampleNftImg40, buttonText: "Join drop" },
	{ title: "Nürnberg NFT 041", price: "0.0001", nftPageUrl: "/drop", imgUrl: ExampleNftImg41, buttonText: "Join drop" },
	{ title: "Nürnberg NFT 042", price: "0.0001", nftPageUrl: "/drop", imgUrl: ExampleNftImg42, buttonText: "Join drop" },
];

export default function NftDropPage() {

	let topPartOfPage = (
		<Box>
			<HeaderTypography style={{ fontSize: "36px", fontWeight: "bold" }}>NFT drop</HeaderTypography>
			<ParagraphTypography style={{ fontSize: "16px", color: secondaryTextColor, marginTop: "18px" }}>Here can be a short or long description if needed.</ParagraphTypography>
			<div style={{ marginTop: "80px" }}/>
		</Box>
	);

	return <NftCardList nftDataArray={dummyData} topChildren={topPartOfPage}/>;
}
