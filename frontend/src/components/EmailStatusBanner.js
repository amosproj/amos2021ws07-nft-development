// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>
// SPDX-FileCopyrightText: 2022 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>
// SDPX-FileCopyrightText: 2021 Que Le <b.le@tu-berlin.de>

import React from "react";
import appwriteApi from "../api/appwriteApi";
import {
	profileEmailConfirmBannerBackgroundColor,
	profileEmailConfirmBannerTextColor,
	whiteTransparentBackgroundColor,
} from "../assets/jss/colorPalette";

import GreenCheck from "./GreenCheck";
import Margin from "../components/Margin";
import ButtonLinkTypography from "../components/ButtonLinkTypography";
import ParagraphTypography from "../components/ParagraphTypography";

/**
 * Component to display status of user's email, i.e verified or not
 * @param isVerified bool variable
 * @returns {JSX.Element}
 */
export default function EmailStatusBanner({ isVerified }) {
	const emailStatusBannerStyle = {
		paddingTop: "11px", paddingLeft: "20px", paddingBottom: "11px", paddingRight: "20px",
		borderRadius: "11px",
	};
	const linkStyle = { textDecoration: "underline", cursor: "pointer", };

	return (isVerified) ?
		(
			<div
				style={{
					visibility: "hidden", display: "flex", alignItems: "center",
					background: profileEmailConfirmBannerBackgroundColor, ...emailStatusBannerStyle,
				}}
			>
				<GreenCheck />
				<Margin width="13px" />
				<ParagraphTypography style={{ display: "inline", fontWeight: "400", fontSize: "15px", color: profileEmailConfirmBannerTextColor, }}>
					Your email was successfully confirmed
				</ParagraphTypography>
			</div>)
		:
		(<div style={{ fontWeight: "400", fontSize: "15px", background: whiteTransparentBackgroundColor, ...emailStatusBannerStyle, }}>
			Email verification unsuccessful,&ensp;
			<ButtonLinkTypography style={{ display: "inline", ...linkStyle, }} onClick={appwriteApi.sendEmailConfirmation}>
				resent&nbsp;email&nbsp;Verification
			</ButtonLinkTypography>
		</div>
		);
}