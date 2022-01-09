// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>, Berinike Tech <berinike@delphai.com>

import React from "react";
import HeaderTypography from "../components/HeaderTypography";
import ParagraphTypography from "../components/ParagraphTypography";
import { activeTextColor } from "../assets/jss/colorPalette";

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
import NurembergCity from "../assets/img/nuremberg_city.png";
import NftCardStructuredList from "../components/NftCardStructuredList";
import Grid from "@mui/material/Grid";
import Countdown, { zeroPad } from "react-countdown";
import TextField from "@mui/material/TextField";
import { inputFieldStyle } from "../assets/jss/InputFieldJSS";
import RoundedEdgesButton from "../components/RoundedEdgesButton";
import EthereumIconSvg from "../assets/img/ethereumIcon.svg";

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

const renderer = ({ days, hours, minutes, seconds, completed }) => {
	if (completed) {
		// Render a completed state
		return <div style={{ paddingTop: "3px" }}>dropped</div>;
	} else {
		// Render a countdown
		return <div style={{ paddingTop: "3px" }}>{zeroPad(days)}d {zeroPad(hours)}h {zeroPad(minutes)}m {zeroPad(seconds)}s</div>;
	}
};

const EthereumIcon = () => <img src={EthereumIconSvg} alt="ETH" style={{ marginBottom: "-4px" }}/>;

export default function NftDropPage() {
	const containerStyle = ({ minHeight: "305px", marginBottom: "30px" });
	const backgroundImageStyle = ({ padding: "44px", borderRadius: "15px", backgroundImage: `url(${NurembergCity})`, backgroundSize: "cover", backgroundPosition: "center", alignItems: "center", justifyContent: "center", textAlign: "center", });

	let nftDropBanner = (
		<div style={containerStyle}>
			<div style={backgroundImageStyle}>
				<Grid container item justifyItems="center" alignItems="center" direction="column" style={{ paddingBottom: "10px", backgroundColor: "rgba(0, 0, 0, 0.4)", width: "100%", height: "100%", borderRadius: "20px" }}>
					<HeaderTypography style={{ fontSize: "37px", fontWeight: "bold" }}>
						Nürnberg
					</HeaderTypography>
					<ParagraphTypography style={{ marginTop: "15px", fontSize: "22px", color: "rgba(255, 255, 255, 0.81)" }}>
						This NFT drop provides 100 images of culture within the area of Nuremburg.
					</ParagraphTypography>
					<div style={{ marginTop: "35px", width: "269px", height: "47px", fontSize: "28px", fontFamily: "Noto Sans", backgroundColor: "rgba(28, 28, 28, 0.5)", border: "1px solid rgba(255, 255, 255, 0.4)", borderRadius: "10px" }}>
						<Countdown date={Date.now() + 10000} renderer={renderer}/>
					</div>

					<Grid item>
						<Grid container direction="row" justifyContent="center" alignItems="center">
							<EthereumIcon/>
							<ParagraphTypography style={{ marginRight: "8px" }}>0.01</ParagraphTypography>
							<TextField sx = {{ ...inputFieldStyle }} style={{ width: "172px" }} margin="normal" id="amount" label="Amount" name="amount" autoFocus/>
							<RoundedEdgesButton style={{ backgroundColor: activeTextColor, marginLeft: "9.5px" }} >Join drop!</RoundedEdgesButton>
						</Grid>
					</Grid>
					<ParagraphTypography style={{ fontSize: "11px", fontWeight: "bold" }}>left: 10 / 100</ParagraphTypography>
					<ParagraphTypography style={{ fontSize: "11px", marginTop: "20px" }}> by AMOS-NFT-Team</ParagraphTypography>
				</Grid>
			</div>
		</div>
	);


	return <NftCardStructuredList nftDataArray={dummyData} topChildren={nftDropBanner}/>;
}
