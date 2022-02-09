// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import React from "react";
import { Link } from "react-router-dom";
import { textColor, whiteTransparentBackgroundColor } from "../../assets/jss/colorPalette";
import Grid from "@mui/material/Grid";
import ParagraphTypography from "../ParagraphTypography";
import ButtonLinkTypography from "../ButtonLinkTypography";
import { fullWebsiteIcon } from "../../assets/jss/imagePalette";

/**
 * Footer that is displayed on mobile devices.
 * @returns {JSX.Element}
 */
export default function SmallFooter() {
	return <>
		<footer className="footer" style={{ paddingTop: "10px", marginTop: "-220px", height: "83px", display: "inherit" }}>
			<Grid container direction="row" alignItems="center" justifyContent="center" columns={1} style={{ height: "58px", borderTop: `1px solid ${whiteTransparentBackgroundColor}` }}>
				<Grid item width="100%" style={{ marginTop: "20px" }}>
					<img src={fullWebsiteIcon} alt="Logo" style={{ height: "21px", marginRight: "5px", opacity: "50%", userSelect: "none", userDrag: "none" }} onDragStart={(e) => e.preventDefault()} unselectable="on" />
				</Grid>
				<Grid item width="100%">
					<ButtonLinkTypography style={{ fontSize: "15px", fontWeight: "bold", lineHeight: "19px", marginTop: "20px", opacity: "80%", whiteSpace: "nowrap" }}>
						<Link to="/privacy" style={{ textDecoration: "none", color: "inherit" }}>
							Privacy
						</Link>
					</ButtonLinkTypography>
				</Grid>
				<Grid item width="100%">
					<ButtonLinkTypography style={{ fontSize: "15px", fontWeight: "bold", lineHeight: "19px", marginTop: "18px", opacity: "80%", whiteSpace: "nowrap" }}>
						<Link to="/termsOfUse" style={{ textDecoration: "none", color: "inherit" }}>
							Terms of use
						</Link>
					</ButtonLinkTypography>
				</Grid>
				<Grid item width="100%">
					<ButtonLinkTypography style={{ fontSize: "15px", fontWeight: "bold", lineHeight: "19px", marginTop: "18px", opacity: "80%", whiteSpace: "nowrap" }}>
						<Link to="/support" style={{ textDecoration: "none", color: "inherit" }}>
							Support
						</Link>
					</ButtonLinkTypography>
				</Grid>
				<Grid item width="100%">
					<ParagraphTypography style={{ fontSize: "11px", fontStyle: "normal", lineHeight: "15px", marginTop: "14.5px", opacity: "81%", color: textColor, whiteSpace: "nowrap" }}>
						2021 AMOS Project - NFT The world! MIT
					</ParagraphTypography>
				</Grid>
			</Grid>
		</footer>
	</>;
}