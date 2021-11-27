// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import NftLogo from "../assets/NFTTheWorldLogo.svg";
import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

/**
 * Wrapper component used to build the footer of the page that is display at the bottom of every page.
 * @param children  children components that should be shown above the footer, i.e. the rest of the website
 * @returns {JSX.Element}
 * @constructor
 */
export default function Footer({ children }){

	return <>
		<div style={{ minHeight: "100vh", paddingBottom: "83px" }}>
			{children}
		</div>
		<footer className="footer" style={{ paddingTop: "10px", marginTop: "-83px", height: "83px", display: "inherit" }}>
			<div style={{ height: "58px", borderTop: "1px solid " + "rgba(255, 255, 255, 0.09)",  display: "flex", justifyContent: "space-between" }}>
				<div style={{ minWidth: "20px", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "20px" }}>
					<img src={NftLogo} alt="Logo" style={{ width: "35px", height: "35px", marginRight: "5px", opacity: "50%", userSelect: "none" }} unselectable="on" />
					<Typography style={{ fontSize: "9px", fontFamily: "Josefin Sans", lineHeight: "96%", marginTop: "9px", opacity: "50%", whiteSpace: "nowrap", marginRight: "13px", userSelect: "none" }}>
						NFT<br/>the world!
					</Typography>
					<Typography style={{ fontSize: "11px", fontFamily: "Noto Sans", fontStyle: "normal", lineHeight: "15px", marginTop: "14.5px", opacity: "81%", color: "white", whiteSpace: "nowrap" }}>
						2021 AMOS Project - NFT The world! MIT
					</Typography>
				</div>
				<div style={{ display: "inherit", minWidth: "20px", height: "100%" }}>
					<Link to="/privacy" style={{ textDecoration: "none", color: "inherit" }}>
						<Typography style={{ fontSize: "15px", fontFamily: "PT Sans", fontStyle: "normal", lineHeight: "136%", marginTop: "24px", opacity: "80%", whiteSpace: "nowrap" }}>
							Privacy
						</Typography>
					</Link>

					<Link to="/termsOfUse" style={{ textDecoration: "none", color: "inherit" }}>
						<Typography style={{ fontSize: "15px", fontFamily: "PT Sans", fontStyle: "normal", lineHeight: "136%", marginTop: "24px", opacity: "80%", whiteSpace: "nowrap", marginLeft: "30px" }}>
							Terms of use
						</Typography>
					</Link>

					<Link to="/support" style={{ textDecoration: "none", color: "inherit" }}>
						<Typography style={{ fontSize: "15px", fontFamily: "PT Sans", fontStyle: "normal", lineHeight: "136%", marginTop: "24px", opacity: "80%", whiteSpace: "nowrap", marginRight: "20px", marginLeft: "30px" }}>
							Support
						</Typography>
					</Link>
				</div>
			</div>
		</footer>
	</>;

}