// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Felix Steinkohl <steinkohl@campus.tu-berlin.de>

import React from "react";
// import appwriteApi from "../api/appwriteApi";
import Grid from "@mui/material/Grid";
import HeaderTypography from "../components/HeaderTypography";
import ParagraphTypography from "../components/ParagraphTypography";
// import { Box, Button, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { Box, TableCell } from "@mui/material";
import { secondaryTextColor } from "../assets/jss/colorPalette";
// import { activeTextColor, secondaryTextColor, textColor } from "../assets/jss/colorPalette";

// import ExampleNftImg21 from "../assets/img/nftExamples/image_part_021.png";
// import ExampleNftImg22 from "../assets/img/nftExamples/image_part_022.png";
// import ExampleNftImg23 from "../assets/img/nftExamples/image_part_023.png";
// import ExampleNftImg24 from "../assets/img/nftExamples/image_part_024.png";
import ExampleNftImg37 from "../assets/img/nftExamples/image_part_037.png";
import ExampleNftImg38 from "../assets/img/nftExamples/image_part_038.png";
import ExampleNftImg39 from "../assets/img/nftExamples/image_part_039.png";
import ExampleNftImg40 from "../assets/img/nftExamples/image_part_040.png";
// import ExampleNftImg41 from "../assets/img/nftExamples/image_part_041.png";
// import ExampleNftImg42 from "../assets/img/nftExamples/image_part_042.png";

import ExampleUserPic from "../assets/img/mockup-user-pic.png";

import NftCardStructuredList from "../components/NftCardStructuredList";
// import Typography from "@mui/material/Typography";
// import appwriteApi from "../api/appwriteApi";
// import Container from "@mui/material/Container";
// import Wallet from "../components/Wallet";
// import RightArrowGreen from "../assets/img/right-arrow-green.svg";
// import RightArrowWhite from "../assets/img/right-arrow-white.svg";
// import NftCard, {CardSize} from "../components/NftCard";
// import {Link} from "react-router-dom";
import RoundedEdgesButton from "../components/RoundedEdgesButton";
// import Profile from "./Profile";

let dummyData = [
	{ title: "Nürnberg NFT 037", price: "0.01", nftPageUrl: "/drop", imgUrl: ExampleNftImg37, buttonText: "Join drop", description: "Descriptions are optional." },
	{ title: "Nürnberg NFT 038", price: "0.0001", nftPageUrl: "/drop", imgUrl: ExampleNftImg38, buttonText: "Join drop" },
	{ title: "Nürnberg NFT 039", price: "0.0001", nftPageUrl: "/drop", imgUrl: ExampleNftImg39, buttonText: "Join drop", description: "The previous NFT had no description." },
	{ title: "Nürnberg NFT 040", price: "0.0001", nftPageUrl: "/drop", imgUrl: ExampleNftImg40, buttonText: "Join drop" }
];

export default function NftCollection() {

	let topPartOfPage = (
		<Box>
			<HeaderTypography style={{ fontSize: "36px", fontWeight: "bold" }}>Your NFT Collection</HeaderTypography>
			<Grid
				container
				spacing={2}
				alignItems="center"
				justifyContent="center"
				direction="column"
			>
				<TableCell>
					<img src={ ExampleUserPic } alt="User Pic"/>
				</TableCell>
				<TableCell>
					Username
				</TableCell>
				<RoundedEdgesButton style={{ backgroundColor: "transparent", fontSize: "12px", border: "1px solid #FFFFFF" }} >
					Edit Profile
				</RoundedEdgesButton>
				<Grid direction="row">
					<Grid direction="column">
						<TableCell>
							29
						</TableCell>
						<TableCell>
							Items
						</TableCell>
					</Grid>
					<Grid direction="column">
						<TableCell>
							2.45
						</TableCell>
						<TableCell>
							Eth
						</TableCell>
					</Grid>
				</Grid>
			</Grid>
			<ParagraphTypography style={{ fontSize: "16px", color: secondaryTextColor, marginTop: "18px" }}>Here can be a short or long description if needed.</ParagraphTypography>
			<div style={{ marginTop: "80px" }}/>
		</Box>
	);

	return <NftCardStructuredList nftDataArray={dummyData} topChildren={topPartOfPage}/>;
}