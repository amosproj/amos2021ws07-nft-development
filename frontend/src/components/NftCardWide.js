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
	nftCardBackgroundColor,
	nftCardCreatorTextColor,
	semiTransparentTextColor
} from "../assets/jss/colorPalette";
import { countdownFont } from "../assets/jss/fontPalette";
import { ethereumIcon } from "../assets/jss/imagePalette";

const EthereumIcon = () => <img src={ethereumIcon} alt="ETH" style={{ marginBottom: "-4px" }}/>;

const countdownTimeRenderer = ({ days, hours, minutes, seconds, completed }) => {
	if (completed) {
		// Render a completed state
		return <div>dropped</div>;
	} else {
		// Render a countdown
		return <div>{zeroPad(days)} ‘ {zeroPad(hours)} : {zeroPad(minutes)} : {zeroPad(seconds)}s</div>;
	}
};

export default function NftCardWide({ title="",
	description="",
	price="-",
	dropId="0",
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
	let priceTagStyle = { bottom: "15px", left: "5px" };
	let buttonDivStyle = { bottom: "6px" };
	let cardStyle = { aspectRatio: "245/375", width: "245px" };

	useEffect(() => {
		countdownRef.current.getApi().start();
	});

	return (
		<div style={{ backgroundColor: nftCardBackgroundColor, borderRadius: "12px", marginRight: "20px", padding: "8.5px", ...style, ...cardStyle }}>
			<Link to={"/nftDropList?dropid="+dropId} style={{}}>
				<div style={{ backgroundImage: `url(${imgUrl})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", width: "100%", height: "220px" }}/>
			</Link>
			<div style={{ height: "210px", padding: "3px", position: "relative", width: "calc(100% - 6px)" }}>
				<HeaderTypography style={{ fontSize: "14px", paddingTop: "14px", fontWeight: "bold" }}>{title}</HeaderTypography>
				<ParagraphTypography style={{ fontSize: "12px", color: nftCardCreatorTextColor, paddingTop: "5px" }}>{nftCreator!=="" && "by "}{nftCreator}</ParagraphTypography>
				<div style={{ position: "relative", height: "24px", paddingTop: "8px" }}>
					<div style={{ position: "absolute", fontFamily: countdownFont, left: 0,  fontSize: "24px" }}>
						<Countdown ref={countdownRef} date={new Date(dropTime)} renderer={countdownTimeRenderer}/>
					</div>
					<div style={{ position: "absolute", right: 0, fontFamily: countdownFont, fontSize: "24px" }}>
						<ParagraphTypography style={{ width: "100%", fontSize: "11px", lineHeight: "96%", marginTop: "10px" }}>
							left: {nftLeft} / {nftTotalAvailability}
						</ParagraphTypography>
					</div>
				</div>
				<ParagraphTypography style={{ width: "100%", fontSize: "12px", lineHeight: "132%", marginTop: "13px", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", lineClamp: 3, WebkitLineClamp: 3, WebkitBoxOrient: "vertical", color: semiTransparentTextColor }}>{description}</ParagraphTypography>
				<div style={{ position: "absolute", left: 0, paddingRight: "1.5px",  ...priceTagStyle }}>
					<Grid container direction="row">
						<Grid item><EthereumIcon/> </Grid>
						<Grid item>
							<HeaderTypography style={{ fontSize: price.length > 10? "8px":"12px", lineHeight: "132%", minWidth: "90px" }}>
								{price}
							</HeaderTypography>
						</Grid>
					</Grid>
				</div>
				<div style={{ position: "absolute", bottom: 0, right: 0, ...buttonDivStyle }}>
					<RoundedEdgesButton style={{ backgroundColor: "transparent", fontSize: "12px", border: `1px solid ${buttonWhiteBorderColor}`, ...buttonStyle }} component={Link} to={"/nftDropList?dropid="+dropId}>
						{buttonText}
					</RoundedEdgesButton>
				</div>
			</div>
		</div>
	);
}
