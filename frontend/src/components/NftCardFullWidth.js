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

export default function NftCardFullWidth({ title="",
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
	let cardStyle = { width: "calc(100% - 22px)", height: "145px", borderRadius: "15px", marginBottom: "10px" };

	return (
		<div style={{ backgroundColor: "#262626", borderRadius: "12px", padding: "11px", ...style, ...cardStyle }}>
			<Grid container direction="row">
				<Grid container item direction="column" style={{ width: "90px" }}>
					<Grid item style={{ paddingTop: "1px" }}>
						<Link to={nftPageUrl} style={{}}>
							<div style={{ backgroundImage: `url(${imgUrl})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", width: "90px", height: "90px" }}/>
						</Link>
					</Grid>
					<Grid item style={{ paddingTop: "18px", align: "center" }}>
						<div style={{ border: "1px solid rgba(255, 255, 255, 0.4)", borderRadius: "5px", padding: "7px" }}>
							<div style={{ fontFamily: "Pathway Gothic One", fontSize: "18px", color: "rgba(255, 255, 255, 0.7)" }}>
								{timeRemainingTillDrop}
							</div>
						</div>
					</Grid>
				</Grid>
				<Grid container item direction="column" style={{ width: "calc(100% - 100px)", paddingLeft: "10px" }}>
					<Grid item>
						<div style={{ position: "relative", height: "145px" }}>
							<HeaderTypography style={{ fontSize: "14px", paddingTop: "2px", fontWeight: "bold" }}>{title}</HeaderTypography>
							<ParagraphTypography style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.68)", paddingTop: "5px" }}>{nftCreator!=="" && "by "}
								{nftCreator}
							</ParagraphTypography>
							<ParagraphTypography style={{ width: "100%", fontSize: "12px", lineHeight: "132%", marginTop: "13px", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", lineClamp: 2, WebkitLineClamp: 2, WebkitBoxOrient: "vertical", color: "rgba(255, 255, 255, 0.81)" }}>
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
									<div style={{ position: "absolute", left: "40%", bottom: "15px" }}>
										<ParagraphTypography style={{ width: "100%", fontSize: "11px", lineHeight: "64%", marginTop: "10px" }}>
											left: {nftLeft} / {nftTotalAvailability}
										</ParagraphTypography>
									</div>
									<div style={{ position: "absolute", right: 0, bottom: "2px" }}>
										<RoundedEdgesButton style={{ backgroundColor: "transparent", fontSize: "12px", border: "1px solid #FFFFFF", ...buttonStyle }} component={Link} to={nftPageUrl}>
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
