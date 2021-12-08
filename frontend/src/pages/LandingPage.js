// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import React from "react";

import WelcomeBanner from "../components/Banner";
import HeaderTypography from "../components/HeaderTypography";

import Grid from "@mui/material/Grid";

import AnnouncementPage from "./AnnouncementPage";
import ExampleNftImg22 from "../assets/img/nftExamples/image_part_022.png";
import ExampleNftImg21 from "../assets/img/nftExamples/image_part_021.png";
import NftCardHorizontallyScrollableList from "../components/NftCardHorizontallyScrollableList";
let dummyData = [
	{ title: "Nürnberg NFT 021", price: "1.0", nftPageUrl: "/drop", imgUrl: ExampleNftImg21, description: "There is something cool about this text. When this text gets to long the text will be automatically cut off. My absolutely biggest secret is that I love cookies." },
	{ title: "Nürnberg NFT 022", price: "0.0001", nftPageUrl: "/drop", imgUrl: ExampleNftImg21, description: "text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text " },
	{ title: "Nürnberg NFT 023", price: "0.0002", nftPageUrl: "/drop", imgUrl: ExampleNftImg22, description: "This text can be descriptive." },
];

export default function LandingPage({ user }) {

	return (
		<Grid container direction="row" rowSpacing="55px" columnSpacing="5px" columns={24}>
			<Grid item xs={24} style={{ marginTop: "16px" }}>
				<WelcomeBanner user={user}/>
			</Grid>
			<Grid item xs={24} lg={17}>
				<HeaderTypography style={{ fontSize: "20px", fontWeight: "bold", lineHeight: "24px", marginBottom: "29px", marginLeft: "20px" }}> NFT list</HeaderTypography>
				<NftCardHorizontallyScrollableList cardData={dummyData}/>
			</Grid>
			<Grid item xs={24} lg={7}>
				<AnnouncementPage user={user} isSidebar={true}/>
			</Grid>
		</Grid>
	);
}