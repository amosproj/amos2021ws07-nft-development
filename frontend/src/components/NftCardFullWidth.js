// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021/2022 Dominic Heil <d.heil@campus.tu-berlin.de>

import React, { useEffect, useRef } from "react";
import HeaderTypography from "./HeaderTypography";
import ParagraphTypography from "./ParagraphTypography";
import RoundedEdgesButton from "./RoundedEdgesButton";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Countdown, { zeroPad } from "react-countdown";
import {
	buttonWhiteBorderColor,
	countdownBorderColor, countdownTextColor,
	nftCardBackgroundColor, nftCardCreatorTextColor,
	semiTransparentTextColor
} from "../assets/jss/colorPalette";
import { countdownFont } from "../assets/jss/fontPalette";
import { ethereumIcon } from "../assets/jss/imagePalette";

const EthereumIcon = () => <img src={ethereumIcon} alt="ETH" style={{ marginBottom: "-4px" }}/>;

const countdownTimeRenderer = ({ days, hours, minutes, seconds, completed }) => {
	if (completed) {
		// Render a completed state
		return <div style={{ paddingLeft: "20px" }}>dropped</div>;
	} else {
		// Render a countdown
		return <div>{zeroPad(days)} ‘ {zeroPad(hours)} : {zeroPad(minutes)} : {zeroPad(seconds)}s</div>;
	}
};

export default function NftCardFullWidth({ title="",
	description="",
	price="-",
	dropId=0,
	imgUrl="	",
	dropTime=0,
	buttonText="Access",
	nftCreator="AMOS-NFT-Team",
	nftTotalAvailability= "100",
	nftLeft="0",
	style={} }
) {

	const countdownRef = useRef();

	let buttonStyle = { paddingBottom: "6.5px", paddingRight: "1.5px", height: "34.5px", width: "111px" };
	let cardStyle = { width: "calc(100% - 22px)", height: "145px", borderRadius: "15px", marginBottom: "10px" };

	useEffect(() => {
		countdownRef.current.getApi().start();
	});

	return (
		<div style={{ backgroundColor: nftCardBackgroundColor, borderRadius: "12px", padding: "11px", ...style, ...cardStyle }}>
			<Grid container direction="row">
				<Grid container item direction="column" style={{ width: "104px" }}>
					<Grid item style={{ paddingTop: "1px" }}>
						<Link to={"/nftDropList?dropid="+dropId} style={{}}>
							<div style={{ backgroundImage: `url(${imgUrl})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", width: "104px", height: "90px" }}/>
						</Link>
					</Grid>
					<Grid item style={{ paddingTop: "18px", align: "center" }}>
						<div style={{ border: `1px solid ${countdownBorderColor}`, borderRadius: "5px", padding: "7px" }}>
							<div style={{ fontFamily: countdownFont, fontSize: "17px", color: countdownTextColor }}>
								<Countdown ref={countdownRef} date={new Date(dropTime)} renderer={countdownTimeRenderer} intervalDelay={10} autoStart={true}/>
							</div>
						</div>
					</Grid>
				</Grid>
				<Grid container item direction="column" style={{ width: "calc(100% - 114px)", paddingLeft: "10px" }}>
					<Grid item>
						<div style={{ position: "relative", height: "145px" }}>
							<HeaderTypography style={{ fontSize: "14px", paddingTop: "2px", fontWeight: "bold" }}>{title}</HeaderTypography>
							<ParagraphTypography style={{ fontSize: "12px", color: nftCardCreatorTextColor, paddingTop: "5px" }}>
								{nftCreator !== "" && "by "}
								{nftCreator}
							</ParagraphTypography>
							<ParagraphTypography style={{ width: "100%", fontSize: "12px", lineHeight: "132%", marginTop: "13px", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", lineClamp: 2, WebkitLineClamp: 2, WebkitBoxOrient: "vertical", color: semiTransparentTextColor }}>
								{description}
							</ParagraphTypography>
							<div style={{ position: "absolute", bottom: 0,  height: "30px", width: "100%" }}>
								<div style={{ position: "relative", width: "100%", height: "100%" }}>
									<div style={{ position: "absolute", left: 0 }}>
										<Grid container direction="row">
											<Grid item><EthereumIcon/> </Grid>
											<Grid item>
												<HeaderTypography style={{ fontSize: "12px", lineHeight: "192%", minWidth: "90px" }}>
													{price}
												</HeaderTypography>
											</Grid>
										</Grid>
									</div>
									<div style={{ position: "absolute", left: "50%", WebkitTransform:"translateX(-50%)", MsTransform:"translateX(-50%)", transform:"translateX(-50%)", bottom: "15px" }}>
										<ParagraphTypography style={{ width: "100%", fontSize: "11px", lineHeight: "64%", marginTop: "10px" }}>
											left: {nftLeft} / {nftTotalAvailability}
										</ParagraphTypography>
									</div>
									<div style={{ position: "absolute", right: 0, bottom: "2px" }}>
										<RoundedEdgesButton style={{ backgroundColor: "transparent", fontSize: "12px", border: `1px solid ${buttonWhiteBorderColor}`, ...buttonStyle }} component={Link} to={"/nftDropList?dropid="+dropId}>
											{buttonText}
										</RoundedEdgesButton>
									</div>
								</div>
							</div>
						</div>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}
