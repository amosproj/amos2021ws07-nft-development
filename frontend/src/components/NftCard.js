// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import React from "react";
import HeaderTypography from "./HeaderTypography";
import ParagraphTypography from "./ParagraphTypography";
import RoundedEdgesButton from "./RoundedEdgesButton";
import EthereumIconSvg from "../assets/img/ethereumIcon.svg";
import { Link } from "react-router-dom";
import * as assert from "assert";

const EthereumIcon = () => <img src={EthereumIconSvg} alt="ETH" style={{ marginBottom: "-4px" }}/>;

export default function NftCard({ title="",
	description="",
	price="-",
	nftPageUrl="",
	imgUrl="	",
	buttonText="Access",
	sm=false,
	md=false,
	lg=true }) {
	assert(sm||md||lg, "NftCard: Either sm, md or lg need to be specified!");

	let buttonStyle = {};
	let priceTagStyle = {};
	let cardStyle = {};
	if (sm){
		buttonStyle = { paddingBottom: "6.5px", paddingRight: "1.5px", height: "30.7px", width: "98.5px" };
		priceTagStyle = { bottom: "7.5px", };
		cardStyle = { aspectRatio: "205/293", width: "205px" };
	} else if (md) {
		buttonStyle = { paddingBottom: "6.5px", paddingRight: "1.5px", height: "34.5px", width: "111px" };
		priceTagStyle = { paddingBottom: "35px", bottom: "7.5px", };
		cardStyle = { aspectRatio: "231/367", width: "231px" };
	} else { // lg
		buttonStyle = { paddingBottom: "6.5px", paddingRight: "1.5px", height: "34.5px", width: "111px" };
		priceTagStyle = { paddingBottom: "35px", bottom: "7.5px", };
		cardStyle = { aspectRatio: "257/367", width: "257px" };
	}

	return (
		<div style={{ backgroundColor: "#262626", borderRadius: "12px", padding: "8.5px", ...cardStyle }}>
			<Link to={nftPageUrl} style={{}}>
				<div style={{ backgroundImage: `url(${imgUrl})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", width: "100%", height: "48%" }}/>
			</Link>
			<div style={{ height: "52%", padding: "3px", position: "relative" }}>
				<HeaderTypography style={{ fontSize: "14px", paddingTop: "16px", fontWeight: "bold" }}>{title}</HeaderTypography>
				<ParagraphTypography style={{ fontSize: "12px", lineHeight: "132%", marginTop: "10px" }}>{description}</ParagraphTypography>
				<div style={{ position: "absolute",  left: 0, paddingRight: "1.5px",  ...priceTagStyle }}>
					<HeaderTypography style={{ fontSize: "12px", lineHeight: "132%" }}>
						<EthereumIcon/> {price}
					</HeaderTypography>
				</div>
				<div style={{ position: "absolute", bottom: 0, right: 0 }}>
					<RoundedEdgesButton style={{ backgroundColor: "transparent", fontSize: "12px", border: "1px solid #FFFFFF", ...buttonStyle }} component={Link} to={nftPageUrl}>
						{buttonText}
					</RoundedEdgesButton>
				</div>
			</div>
		</div>
	);
}