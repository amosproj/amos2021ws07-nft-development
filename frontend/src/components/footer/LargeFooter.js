// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import NftFullLogo from "../../assets/img/NFTTheWorldFullLogo.svg";
import React from "react";
import { Link } from "react-router-dom";
import { textColor } from "../../assets/jss/colorPalette";
import ParagraphTypography from "../ParagraphTypography";
import ButtonLinkTypography from "../ButtonLinkTypography";

/**
 * Footer that is displayed on all large devices, in particular on all non mobile devices.
 * @param children  children components that should be shown above the footer, i.e. the rest of the website
 * @returns {JSX.Element}
 */
export default function LargeFooter({ children }){
	return <>
		<div style={{ minHeight: "calc(100vh - 77px)", paddingBottom: "10px", marginBottom: "67px" }}>
			{children}
		</div>
		<footer className="footer" style={{ marginTop: "-67px", height: "67px", display: "inherit" }}>
			<div style={{ height: "58px", borderTop: "1px solid " + "rgba(255, 255, 255, 0.09)",  display: "flex", justifyContent: "space-between" }}>
				<div style={{ minWidth: "20px", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "20px" }}>
					<img src={NftFullLogo} alt="Logo" style={{  height: "21px", marginRight: "13px", opacity: "50%", userSelect: "none", marginTop: "2.5px" }} onDragStart={(e) => e.preventDefault()} unselectable="on" />
					<ParagraphTypography style={{ fontSize: "11px", fontStyle: "normal", lineHeight: "15px", marginTop: "14.5px", opacity: "81%", color: textColor, whiteSpace: "nowrap" }}>
						2021 AMOS Project - NFT The world! MIT
					</ParagraphTypography>
				</div>
				<div style={{ display: "inherit", minWidth: "20px", height: "100%" }}>
					<ButtonLinkTypography style={{ fontSize: "15px", fontWeight: "bold", lineHeight: "136%", marginTop: "24px", opacity: "80%", whiteSpace: "nowrap" }}>
						<Link to="/privacy" style={{ textDecoration: "none", color: "inherit" }}>
							Privacy
						</Link>
					</ButtonLinkTypography>
					<ButtonLinkTypography style={{ fontSize: "15px", fontWeight: "bold", lineHeight: "136%", marginTop: "24px", opacity: "80%", whiteSpace: "nowrap", marginLeft: "30px" }}>
						<Link to="/termsOfUse" style={{ textDecoration: "none", color: "inherit" }}>
							Terms of use
						</Link>
					</ButtonLinkTypography>
					<ButtonLinkTypography style={{ fontSize: "15px", fontWeight: "bold", lineHeight: "136%", marginTop: "24px", opacity: "80%", whiteSpace: "nowrap", marginRight: "20px", marginLeft: "30px" }}>
						<Link to="/support" style={{ textDecoration: "none", color: "inherit" }}>
							Support
						</Link>
					</ButtonLinkTypography>
				</div>
			</div>
		</footer>
	</>;

}

