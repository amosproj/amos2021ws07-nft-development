// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>, Berinike Tech <berinike@delphai.com>

import React, { useEffect, useRef, useState } from "react";
import HeaderTypography from "../components/HeaderTypography";
import ParagraphTypography from "../components/ParagraphTypography";
import { activeTextColor } from "../assets/jss/colorPalette";

import NurembergCity from "../assets/img/nuremberg_city.png";
import NftCardStructuredList from "../components/NftCardStructuredList";
import Grid from "@mui/material/Grid";
import Countdown, { zeroPad } from "react-countdown";
import TextField from "@mui/material/TextField";
import { inputFieldStyle } from "../assets/jss/InputFieldJSS";
import RoundedEdgesButton from "../components/RoundedEdgesButton";
import EthereumIconSvg from "../assets/img/ethereumIcon.svg";
import appwriteApi from "../api/appwriteApi";

const countdownTimeRenderer = ({ days, hours, minutes, seconds, completed }) => {
	if (completed) {
		// Render a completed state
		return <div style={{ paddingTop: "3px" }}>dropped</div>;
	} else {
		// Render a countdown
		return <div style={{ paddingTop: "3px" }}>{zeroPad(days)}d {zeroPad(hours)}h {zeroPad(minutes)}m {zeroPad(seconds)}s</div>;
	}
};

const EthereumIcon = () => <img src={EthereumIconSvg} alt="ETH" style={{ marginBottom: "-4px" }}/>;

function NftDropBanner({ dropData }) {
	// TODO: make dynamic once we have real data
	const containerStyle = ({ minHeight: "305px", marginBottom: "30px" });
	const backgroundImageStyle = ({ padding: "10px", borderRadius: "15px", backgroundImage: `url(${NurembergCity})`, backgroundSize: "cover", backgroundPosition: "center", alignItems: "center", justifyContent: "center", textAlign: "center", });
	const countdownRef = useRef();

	useEffect(() => {
		countdownRef.current.getApi().start();
	});

	return (
		<div style={containerStyle}>
			<div style={backgroundImageStyle}>
				<Grid container item justifyItems="center" alignItems="center" direction="column" style={{ width: "100%", height: "100%", margin: 0 }}>
					<Grid item style={{ maxWidth: "700px", backgroundColor: "rgba(0, 0, 0, 0.4)", borderRadius: "20px", padding: "10px" }}>
						<Grid container item justifyItems="center" alignItems="center" direction="column" style={{ paddingBottom: "10px", width: "100%", height: "100%" }}>
							<HeaderTypography style={{ fontSize: "37px", fontWeight: "bold" }}>
								{dropData.title}
							</HeaderTypography>
							<ParagraphTypography style={{ marginTop: "15px", fontSize: "22px", color: "rgba(255, 255, 255, 0.81)" }}>
								This NFT drop provides {dropData.nftTotalAvailability} images of culture within the area of {dropData.title}.
							</ParagraphTypography>
							<div style={{ marginTop: "35px", maxWidth: "255px", minWidth: "235px", paddingLeft: "7px", paddingRight: "7px", paddingBottom: "6px", fontSize: "28px", fontFamily: "Noto Sans", backgroundColor: "rgba(28, 28, 28, 0.5)", border: "1px solid rgba(255, 255, 255, 0.4)", borderRadius: "10px" }}>
								<Countdown ref={countdownRef} date={new Date(dropData.dropTime||0)} renderer={countdownTimeRenderer}/>
							</div>

							<Grid item>
								<Grid container direction="row" justifyContent="center" alignItems="center">
									<Grid item style={{ marginTop: "6px" }}>
										<Grid container item direction="row">
											<EthereumIcon/>
											<ParagraphTypography style={{ marginRight: "8px" }}>{dropData.price}</ParagraphTypography>
										</Grid>
									</Grid>
									<TextField sx = {{ ...inputFieldStyle }} style={{ width: "172px" }} margin="normal" id="amount" label="Amount" name="amount" autoFocus size="small"/>
									<RoundedEdgesButton style={{ backgroundColor: activeTextColor, marginLeft: "9.5px", height: "40px", marginTop: "10px" }}>Join drop!</RoundedEdgesButton>
								</Grid>
							</Grid>
							<ParagraphTypography style={{ fontSize: "11px", fontWeight: "bold" }}>left: {dropData.nftLeft} / {dropData.nftTotalAvailability}</ParagraphTypography>
							<ParagraphTypography style={{ fontSize: "11px", marginTop: "20px" }}> by AMOS-NFT-Team</ParagraphTypography>
						</Grid>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}

export default function NftDropPage() {
	const [dropData, setDropData] = useState({});
	const [nftData, setNftData] = useState([]);


	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const dropId = urlParams.get("dropid");

		let filter = ["drop_id="+dropId];
		let limit = 10;
		let orderField = "drop_time";
		let orderType = "DESC";

		appwriteApi.getDrops(filter, limit, orderField, orderType).then((newDropData) => {
			let filteredDropData = newDropData.documents.map(dropEntry => {
				return {
					title: dropEntry["drop_name"],
					price: dropEntry["drop_price"],
					nftTotalAvailability: dropEntry["drop_size"],
					nftLeft: dropEntry["drop_size"],
					dropTime: dropEntry["drop_time"]*1000,
					imgUris: JSON.parse(dropEntry["drop_uris"]),
					description: dropEntry["drop_name"] + " drop.",
					dropId: dropEntry["drop_id"]
				};
			})[0];
			// TODO: available or dropped based on current time
			let newNftData = filteredDropData.imgUris.map((elem, idx) => {
				return {
					title: filteredDropData.title + " " + idx,
					price: filteredDropData.price,
					nftPageUrl: "#",
					imgUrl: elem,
					buttonText: "Available",
					dropTime: filteredDropData.dropTime
				};
			});
			console.log(newNftData);
			setDropData(filteredDropData);
			setNftData(newNftData);
		});
	}, []);

	return <NftCardStructuredList nftDataArray={nftData} topChildren={<NftDropBanner dropData={dropData}/>}/>;
}
