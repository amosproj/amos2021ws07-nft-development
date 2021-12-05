// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import React, { useState } from "react";
import HeaderTypography from "../components/HeaderTypography";
import ParagraphTypography from "../components/ParagraphTypography";
import GroupLargeIconSvg from "../assets/img/group-large-icon.svg";
import GroupSmallIconSvg from "../assets/img/group-small-icon.svg";
import {
	Divider,
} from "@mui/material";
import { activeTextColor, secondaryTextColor, textColor } from "../assets/jss/colorPalette";
import Grid from "@mui/material/Grid";

export default function NftDropPage() {
	const [selectedCategory, setSelectedCategory] = useState("newest");
	const [selectedGroupSize, setSelectedGroupSize] = useState("large");

	return <>
		<Grid container spacing={2} style={{ marginTop: 20 }}>
			<Grid item xs={12} >
				<HeaderTypography style={{ fontSize: "36px", fontWeight: "bold" }}>NFT drop</HeaderTypography>
				<ParagraphTypography style={{ fontSize: "16px", color: secondaryTextColor, marginTop: "18px" }}>Here can be a short or long description if needed.</ParagraphTypography>
				<div style={{ marginTop: "80px" }}/>
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
			</Grid>
		</Grid>
	</>;
}