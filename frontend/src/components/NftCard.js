// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import React from "react";
import HeaderTypography from "./HeaderTypography";
import ParagraphTypography from "./ParagraphTypography";
import RoundedEdgesButton from "./RoundedEdgesButton";
import EthereumIconSvg from "../assets/img/ethereumIcon.svg";
import { Link } from "react-router-dom";

const EthereumIcon = () => <img src={EthereumIconSvg} alt="ETH" style={{ marginBottom: "-4px" }}/>;

export const CardSize = Object.freeze({ "small":1, "medium":2, "large":3, });

export default function NftCard({ title="",
	description="",
	price="-",
	nftPageUrl="",
	imgUrl="	",
	buttonText="Access",
	size=CardSize.large,
	style={} }
) {

	let buttonStyle = {};
	let buttonDivStyle = {};
	let priceTagStyle = {};
	let cardStyle = {};
	switch (size){
	case CardSize.small:
		buttonStyle = { paddingBottom: "6.5px", paddingRight: "1.5px", height: "30.7px", width: "98.5px" };
		priceTagStyle = { bottom: "7.5px" };
		cardStyle = { aspectRatio: "205/293", width: "205px" };
		break;
	case CardSize.medium:
		buttonStyle = { paddingBottom: "6.5px", paddingRight: "1.5px", height: "34.5px", width: "111px" };
		priceTagStyle = { paddingBottom: "35px", bottom: "7.5px" };
		cardStyle = { aspectRatio: "231/367", width: "231px" };
		break;
	case CardSize.large:
		buttonStyle = { paddingBottom: "6.5px", paddingRight: "1.5px", height: "34.5px", width: "111px" };
		priceTagStyle = { bottom: "22px", left: "5px" };
		buttonDivStyle = { bottom: "13px" };
		cardStyle = { aspectRatio: "257/367", width: "257px" };
		break;
	default:
		throw new Error("NftCard: No or no valid size specified!");
	}

	return (
		<div style={{ backgroundColor: "#262626", borderRadius: "12px", padding: "8.5px", ...cardStyle, ...style }}>
			<Link to={nftPageUrl} style={{}}>
				<div style={{ backgroundImage: `url(${imgUrl})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", width: "100%", height: "48%" }}/>
			</Link>
			<div style={{ height: "52%", padding: "3px", position: "relative", width: "calc(100% - 6px)" }}>
				<HeaderTypography style={{ fontSize: "14px", paddingTop: "16px", fontWeight: "bold" }}>{title}</HeaderTypography>
				<ParagraphTypography style={{ width: "100%", fontSize: "12px", lineHeight: "132%", marginTop: "10px", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", lineClamp: 4, WebkitLineClamp: 4, WebkitBoxOrient: "vertical" }}>{description}</ParagraphTypography>
				<div style={{ position: "absolute",  left: 0, paddingRight: "1.5px",  ...priceTagStyle }}>
					<HeaderTypography style={{ fontSize: "12px", lineHeight: "132%" }}>
						{price !== "-" && <> <EthereumIcon/> {price}</>}
					</HeaderTypography>
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