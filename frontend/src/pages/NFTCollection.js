// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Felix Steinkohl <steinkohl@campus.tu-berlin.de>

import React from "react";
import Grid from "@mui/material/Grid";
import HeaderTypography from "../components/HeaderTypography";
import ParagraphTypography from "../components/ParagraphTypography";
import { Box } from "@mui/material";

import ExampleNftImg37 from "../assets/img/nftExamples/image_part_037.png";
import ExampleNftImg38 from "../assets/img/nftExamples/image_part_038.png";
import ExampleNftImg39 from "../assets/img/nftExamples/image_part_039.png";
import ExampleNftImg40 from "../assets/img/nftExamples/image_part_040.png";

import ExampleUserPic from "../assets/img/mockup-user-pic.png";

import NftCardStructuredList from "../components/NftCardStructuredList";
import EthereumIconSvg from "../assets/img/ethereumIcon.svg";

const EthereumIcon = () => <img src={EthereumIconSvg} alt="ETH" style={{ marginBottom: "1px" }}/>;

let dummyData = [
	{ title: "Nürnberg NFT 037", price: "0.01", nftPageUrl: "/info", imgUrl: ExampleNftImg37, buttonText: "Join drop", description: "Descriptions are optional." },
	{ title: "Nürnberg NFT 038", price: "0.0001", nftPageUrl: "/info", imgUrl: ExampleNftImg38, buttonText: "Join drop" },
	{ title: "Nürnberg NFT 039", price: "0.0001", nftPageUrl: "/info", imgUrl: ExampleNftImg39, buttonText: "Join drop", description: "The previous NFT had no description." },
	{ title: "Nürnberg NFT 040", price: "0.0001", nftPageUrl: "/info", imgUrl: ExampleNftImg40, buttonText: "Join drop" }
];

export default function NftCollection({ user }) {

	let topPartOfPage = (
		<Box>
			<HeaderTypography style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "20px" }}>Your NFT Collection</HeaderTypography>
			<Grid container spacing={2}  alignItems="center" justifyContent="center" direction="column">
				<Grid item style={{ width: "143px", height: "143px", backgroundColor: "rgba(255, 255, 255, 0.1)", padding: 0, borderRadius: "100%" }}>
					<div style={{ backgroundImage: `url(${ExampleUserPic})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", width: "100%", height: "100%" }}/>
				</Grid>
				<Grid item style={{ paddingLeft: 0 }}>
					<ParagraphTypography style={{ fontWeight: "bold", fontSize: "24px" }}>
						{user.name}
					</ParagraphTypography>
				</Grid>
				<Grid item style={{ paddingLeft: 0 }}>
					<Grid container direction="row" spacing={3}>
						<Grid item>
							<Grid container direction="column" alignItems="center" justifyContent="center">
								<Grid item>
									<ParagraphTypography style={{ fontSize: "26px", fontWeight: "bold" }}>
										29
									</ParagraphTypography>
								</Grid>
								<Grid item >
									<ParagraphTypography style={{ fontSize: "14px" }}>
										items
									</ParagraphTypography>
								</Grid>
							</Grid>
						</Grid>
						<Grid item>
							<div style={{ height: "24px", width: "2px", backgroundColor: "rgba(255, 255, 255, 0.2)", marginTop: "7px" }}/>
						</Grid>
						<Grid item>
							<Grid container direction="column" alignItems="center" justifyContent="center">
								<Grid item>
									<ParagraphTypography style={{ fontSize: "26px", fontWeight: "bold" }}>
										<EthereumIcon /> 3.6
									</ParagraphTypography>
								</Grid>
								<ParagraphTypography style={{ fontSize: "14px" }}>
									equity
								</ParagraphTypography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<div style={{ marginTop: "44px" }}/>
		</Box>
	);

	return <NftCardStructuredList nftDataArray={dummyData} topChildren={topPartOfPage}/>;
}