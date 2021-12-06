// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import React, { useRef, useState } from "react";
import HeaderTypography from "../components/HeaderTypography";
import ParagraphTypography from "../components/ParagraphTypography";
import GroupLargeIconSvg from "../assets/img/group-large-icon.svg";
import GroupSmallIconSvg from "../assets/img/group-small-icon.svg";
import {
	Divider,
} from "@mui/material";
import { activeTextColor, secondaryTextColor, textColor } from "../assets/jss/colorPalette";
import Grid from "@mui/material/Grid";

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
import NftCard from "../components/NftCard";
import { useContainerDimensions } from "../hooks/useContainerDimensions";

let dummyData = [
	{ title: "Nürnberg NFT 021", price: "0.0001", nftPageUrl: "/drop", imgUrl: ExampleNftImg21, buttonText: "Join drop" },
	{ title: "Nürnberg NFT 022", price: "0.0001", nftPageUrl: "/drop", imgUrl: ExampleNftImg22, buttonText: "Join drop" },
	{ title: "Nürnberg NFT 023", price: "0.0001", nftPageUrl: "/drop", imgUrl: ExampleNftImg23, buttonText: "Join drop" },
	{ title: "Nürnberg NFT 024", price: "0.0001", nftPageUrl: "/drop", imgUrl: ExampleNftImg24, buttonText: "Join drop" },
	{ title: "Nürnberg NFT 037", price: "0.0001", nftPageUrl: "/drop", imgUrl: ExampleNftImg37, buttonText: "Join drop" },
	{ title: "Nürnberg NFT 038", price: "0.0001", nftPageUrl: "/drop", imgUrl: ExampleNftImg38, buttonText: "Join drop" },
	{ title: "Nürnberg NFT 039", price: "0.0001", nftPageUrl: "/drop", imgUrl: ExampleNftImg39, buttonText: "Join drop" },
	{ title: "Nürnberg NFT 040", price: "0.0001", nftPageUrl: "/drop", imgUrl: ExampleNftImg40, buttonText: "Join drop" },
	{ title: "Nürnberg NFT 041", price: "0.0001", nftPageUrl: "/drop", imgUrl: ExampleNftImg41, buttonText: "Join drop" },
	{ title: "Nürnberg NFT 042", price: "0.0001", nftPageUrl: "/drop", imgUrl: ExampleNftImg42, buttonText: "Join drop" },
];

export default function NftDropPage() {
	const [selectedCategory, setSelectedCategory] = useState("newest");
	const [selectedGroupSize, setSelectedGroupSize] = useState("large");
	const componentRef = useRef();
	const { width } = useContainerDimensions(componentRef);

	let selectWidth;
	if (width >= 1160) {
		selectWidth = "1160px";
	} else if (width >= 920) {
		selectWidth = "920px";
	} else if (width >= 690) {
		selectWidth = "690px";
	} else if (width >= 460) {
		selectWidth = "460px";
	} else {
		selectWidth = width+"px";
	}
	console.log(width);
	// if (isLarge) {
	// 	width = "1325px";
	// } else if (isMedium) {
	// 	width = "1100px";
	// } else if (isSmall) {
	// 	width = "600px";
	// } else {
	// 	width = null;
	// }
	//width: selectWidth
	return <>
		<Grid container style={{ marginTop: 20, width: "100%" }} >
			<Grid item ref={componentRef} style={{ width: "100%" }}>
				<HeaderTypography style={{ fontSize: "36px", fontWeight: "bold" }}>NFT drop</HeaderTypography>
				<ParagraphTypography style={{ fontSize: "16px", color: secondaryTextColor, marginTop: "18px" }}>Here can be a short or long description if needed.</ParagraphTypography>
				<div style={{ marginTop: "80px" }}/>
				<div style={{ width: selectWidth, marginLeft: "auto", marginRight: "auto", display: "block" }}>
					<div style={{ position: "relative" }}>
						<div style={{ position: "absolute", right: 0 }} >
							<Grid container direction="row">
								<img src={GroupLargeIconSvg} alt="Large Icons" onClick={() => setSelectedGroupSize("large")} style={{ opacity: selectedGroupSize === "large"? "100%":"30%", cursor: "pointer", paddingRight: "9px" }}/>
								<img src={GroupSmallIconSvg} alt="Small Icons" onClick={() => setSelectedGroupSize("small")} style={{ opacity: selectedGroupSize === "small"? "100%":"30%", cursor: "pointer" }}/>
							</Grid>
						</div>
						<Grid container direction="row">
							<Grid item>
								<HeaderTypography
									onClick={() => setSelectedCategory("newest")}
									style={{ fontSize: "18px", borderBottom: selectedCategory === "newest" ? `3px solid ${activeTextColor}`:"none", paddingBottom: "11px", color: textColor, fontWeight: "bold", cursor: "pointer", opacity: selectedCategory === "newest" ? 1 : 0.7 }}
								>Newest</HeaderTypography>
							</Grid>
							<Grid item style={{ width: "38px" }}/>
							<Grid item>
								<HeaderTypography
									onClick={() => setSelectedCategory("cheapest")}
									style={{ fontSize: "18px", borderBottom: selectedCategory === "cheapest" ? `3px solid ${activeTextColor}`:"none", paddingBottom: "11px", color: textColor, fontWeight: "bold", cursor: "pointer", opacity: selectedCategory === "cheapest" ? 1 : 0.7 }}
								>Cheapest</HeaderTypography>
							</Grid>
						</Grid>

					</div>
					<Divider style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", width: "100%", height: "0.2px", marginBottom: "20px", marginTop: "-2px" }}/>
					<Grid item >
						<Grid container direction="row" justifyContent="space-between" spacing={1} style={{ "&:after":{ content: "", flex:"auto" } }}>
							{dummyData.map((elem, idx) =>
								<Grid item key={idx} style={{}}>
									<NftCard sm={selectedGroupSize==="small"} lg={selectedGroupSize==="large"} imgUrl={elem.imgUrl} nftPageUrl={elem.nftPageUrl} price={elem.price} description={elem.description} title={elem.title} buttonText={elem.buttonText} />
								</Grid>
							)}
						</Grid>
					</Grid>
				</div>
			</Grid>
		</Grid>
	</>;
}