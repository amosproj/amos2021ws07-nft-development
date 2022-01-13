// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import React from "react";
import HeaderTypography from "./HeaderTypography";
import ParagraphTypography from "./ParagraphTypography";
import RoundedEdgesButton from "./RoundedEdgesButton";
import EthereumIconSvg from "../assets/img/ethereumIcon.svg";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";

const EthereumIcon = () => <img src={EthereumIconSvg} alt="ETH" style={{ marginBottom: "-4px" }}/>;

export default function NftCardWide({ title="",
	description="",
	price="-",
	nftPageUrl="",
	imgUrl="	",
	buttonText="Access",
	nftCreator="AMOS-NFT-Team",
	nftTotalAvailability= "100",
	nftLeft="0",
	timeRemainingTillDrop="0 ‘ 00 : 01 : 00",
	style={} }
) {

	let buttonStyle = { paddingBottom: "6.5px", paddingRight: "1.5px", height: "34.5px", width: "111px" };
	let priceTagStyle = { bottom: "15px", left: "5px" };
	let buttonDivStyle = { bottom: "6px" };
	let cardStyle = { aspectRatio: "245/375", width: "245px" };

	return (
		<div style={{ backgroundColor: "#262626", borderRadius: "12px", marginRight: "20px", padding: "8.5px", ...style, ...cardStyle }}>
			<Link to={nftPageUrl} style={{}}>
				<div style={{ backgroundImage: `url(${imgUrl})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", width: "100%", height: "220px" }}/>
			</Link>
			<div style={{ height: "210px", padding: "3px", position: "relative", width: "calc(100% - 6px)" }}>
				<HeaderTypography style={{ fontSize: "14px", paddingTop: "14px", fontWeight: "bold" }}>{title}</HeaderTypography>
				<ParagraphTypography style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.68)", paddingTop: "5px" }}>{nftCreator!=="" && "by "}{nftCreator}</ParagraphTypography>
				<div style={{ position: "relative", height: "24px", paddingTop: "8px" }}>
					<div style={{ position: "absolute", left: 0, fontFamily: "Pathway Gothic One", fontSize: "24px" }}>
						{timeRemainingTillDrop}
					</div>
					<div style={{ position: "absolute", right: 0, fontFamily: "Pathway Gothic One", fontSize: "24px" }}>
						<ParagraphTypography style={{ width: "100%", fontSize: "11px", lineHeight: "96%", marginTop: "10px" }}>
							left: {nftLeft} / {nftTotalAvailability}
						</ParagraphTypography>
					</div>
				</div>
				<ParagraphTypography style={{ width: "100%", fontSize: "12px", lineHeight: "132%", marginTop: "13px", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", lineClamp: 3, WebkitLineClamp: 3, WebkitBoxOrient: "vertical", color: "rgba(255, 255, 255, 0.81)" }}>{description}</ParagraphTypography>
				<div style={{ position: "absolute", left: 0, paddingRight: "1.5px",  ...priceTagStyle }}>
					<Grid container direction="row">
						<Grid item><EthereumIcon/> </Grid>
						<Grid item>
							<HeaderTypography style={{ fontSize: "12px", lineHeight: "132%", minWidth: "90px" }}>
								{price}
							</HeaderTypography>
						</Grid>
					</Grid>
				</div>
				<div style={{ position: "absolute", bottom: 0, right: 0, ...buttonDivStyle }}>
					<RoundedEdgesButton style={{ backgroundColor: "transparent", fontSize: "12px", border: "1px solid #FFFFFF", ...buttonStyle }} component={Link} to={nftPageUrl}>
						{buttonText}
					</RoundedEdgesButton>
				</div>
			</div>
		</div>
	);
}
