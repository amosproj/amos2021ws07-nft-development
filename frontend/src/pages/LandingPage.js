// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import * as React from "react";

import WelcomeBanner from "../components/Banner";
import HeaderTypography from "../components/HeaderTypography";

import Grid from "@mui/material/Grid";

import AnnouncementPage from "./AnnouncementPage";
import ExampleNftImg22 from "../assets/img/nftExamples/image_part_022.png";
import ExampleNftImg21 from "../assets/img/nftExamples/image_part_021.png";
import NftDropCardStructuredList from "../components/NftDropCardStructuredList";
let dummyData = [
	{ title: "Nürnberg NFT 021", price: "1.0", dropId: 1000, nftTotalAvailability: "1000", nftLeft: "74", nftPageUrl: "/drop", imgUrl: ExampleNftImg21, description: "There is something cool about this text. When this text gets to long the text will be automatically cut off. My absolutely biggest secret is that I love cookies." },
	{ title: "Nürnberg NFT 022", price: "0.0001", dropId: 1001, nftTotalAvailability: "124", nftLeft: "57", nftPageUrl: "/drop", imgUrl: ExampleNftImg21, description: "text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text " },
	{ title: "Nürnberg NFT 023", price: "0.0002", dropId: 1002, nftTotalAvailability: "100", nftLeft: "0", nftPageUrl: "/drop", imgUrl: ExampleNftImg22, description: "This text can be descriptive." },
	{ title: "Nürnberg NFT 024", price: "0.0002", dropId: 1003, nftTotalAvailability: "100", nftLeft: "0", nftPageUrl: "/drop", imgUrl: ExampleNftImg22, description: "This NFT is a copy." },
];

export default function LandingPage({ user }) {

	return (
		<Grid container direction="row" rowSpacing="55px" columnSpacing="5px" columns={24}>
			<Grid item xs={24} style={{ marginTop: "16px" }}>
				<WelcomeBanner user={user}/>
			</Grid>
			<Grid item xs={24} lg={16}>
				<HeaderTypography style={{ fontSize: "20px", fontWeight: "bold", lineHeight: "24px", marginBottom: "25px" }}> NFT Drops</HeaderTypography>
				<NftDropCardStructuredList nftDataArray={dummyData}/>
			</Grid>
			<Grid item xs={24} lg={8}>
				<AnnouncementPage user={user} isSidebar={true}/>
			</Grid>
		</Grid>
	);
}