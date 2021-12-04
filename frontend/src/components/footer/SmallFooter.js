// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import NftFullLogo from "../../assets/img/NFTTheWorldFullLogo.svg";
import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { textColor } from "../../assets/jss/colorPalette";
import Grid from "@mui/material/Grid";

/**
 * Footer that is displayed on mobile devices.
 * @param children  children components that should be shown above the footer, i.e. the rest of the website
 * @returns {JSX.Element}
 * @constructor
 */
export default function SmallFooter({ children }) {
	return <>
		<div style={{ minHeight: "100vh", paddingBottom: "220px" }}>
			{children}
		</div>
		<footer className="footer" style={{ paddingTop: "10px", marginTop: "-220px", height: "83px", display: "inherit" }}>
			<div style={{ height: "58px", borderTop: "1px solid " + "rgba(255, 255, 255, 0.09)" }}>
				<Grid container direction="row">
					<Grid item style={{ marginTop: "20px" }}>
						<img src={NftFullLogo} alt="Logo" style={{ height: "21px", marginRight: "5px", opacity: "50%", userSelect: "none", userDrag: "none" }} onDragStart={(e) => e.preventDefault()} unselectable="on" />
					</Grid>
					<Grid item>
						<Typography style={{ fontSize: "15px", fontFamily: "PT Sans", fontWeight: "bold", lineHeight: "19px", marginTop: "20px", opacity: "80%", whiteSpace: "nowrap" }}>
							<Link to="/privacy" style={{ textDecoration: "none", color: "inherit" }}>
								Privacy
							</Link>
						</Typography>
					</Grid>
					<Grid item>
						<Typography style={{ fontSize: "15px", fontFamily: "PT Sans", fontWeight: "bold", lineHeight: "19px", marginTop: "18px", opacity: "80%", whiteSpace: "nowrap" }}>
							<Link to="/termsOfUse" style={{ textDecoration: "none", color: "inherit" }}>
								Terms of use
							</Link>
						</Typography>
					</Grid>
					<Grid item>
						<Typography style={{ fontSize: "15px", fontFamily: "PT Sans", fontWeight: "bold", lineHeight: "19px", marginTop: "18px", opacity: "80%", whiteSpace: "nowrap" }}>
							<Link to="/support" style={{ textDecoration: "none", color: "inherit" }}>
								Support
							</Link>
						</Typography>
					</Grid>
					<Grid item>
						<Typography style={{ fontSize: "11px", fontFamily: "Noto Sans", fontStyle: "normal", lineHeight: "15px", marginTop: "14.5px", opacity: "81%", color: textColor, whiteSpace: "nowrap" }}>
							2021 AMOS Project - NFT The world! MIT
						</Typography>
					</Grid>
				</Grid>
			</div>
		</footer>
	</>;
}