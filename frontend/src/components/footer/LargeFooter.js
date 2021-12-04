// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import NftFullLogo from "../../assets/img/NFTTheWorldFullLogo.svg";
import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { textColor } from "../../assets/jss/colorPalette";

/**
 * Footer that is displayed on all large devices, in particular on all non mobile devices.
 * @param children  children components that should be shown above the footer, i.e. the rest of the website
 * @returns {JSX.Element}
 */
export default function LargeFooter({ children }){
	return <>
		<div style={{ minHeight: "100vh", paddingBottom: "83px" }}>
			{children}
		</div>
		<footer className="footer" style={{ paddingTop: "10px", marginTop: "-83px", height: "83px", display: "inherit" }}>
			<div style={{ height: "58px", borderTop: "1px solid " + "rgba(255, 255, 255, 0.09)",  display: "flex", justifyContent: "space-between" }}>
				<div style={{ minWidth: "20px", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "20px" }}>
					<img src={NftFullLogo} alt="Logo" style={{  height: "21px", marginRight: "13px", opacity: "50%", userSelect: "none", marginTop: "2.5px" }} onDragStart={(e) => e.preventDefault()} unselectable="on" />
					<Typography style={{ fontSize: "11px", fontFamily: "Noto Sans", fontStyle: "normal", lineHeight: "15px", marginTop: "14.5px", opacity: "81%", color: textColor, whiteSpace: "nowrap" }}>
						2021 AMOS Project - NFT The world! MIT
					</Typography>
				</div>
				<div style={{ display: "inherit", minWidth: "20px", height: "100%" }}>
					<Typography style={{ fontSize: "15px", fontFamily: "PT Sans", fontWeight: "bold", lineHeight: "136%", marginTop: "24px", opacity: "80%", whiteSpace: "nowrap" }}>
						<Link to="/privacy" style={{ textDecoration: "none", color: "inherit" }}>
							Privacy
						</Link>
					</Typography>
					<Typography style={{ fontSize: "15px", fontFamily: "PT Sans", fontWeight: "bold", lineHeight: "136%", marginTop: "24px", opacity: "80%", whiteSpace: "nowrap", marginLeft: "30px" }}>
						<Link to="/termsOfUse" style={{ textDecoration: "none", color: "inherit" }}>
							Terms of use
						</Link>
					</Typography>
					<Typography style={{ fontSize: "15px", fontFamily: "PT Sans", fontWeight: "bold", lineHeight: "136%", marginTop: "24px", opacity: "80%", whiteSpace: "nowrap", marginRight: "20px", marginLeft: "30px" }}>
						<Link to="/support" style={{ textDecoration: "none", color: "inherit" }}>
							Support
						</Link>
					</Typography>
				</div>
			</div>
		</footer>
	</>;

}

