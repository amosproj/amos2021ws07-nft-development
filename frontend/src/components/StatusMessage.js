// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>
// SPDX-FileCopyrightText: 2022 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>
// SDPX-FileCopyrightText: 2021 Que Le <b.le@tu-berlin.de>

import React from "react";
import { textColor } from "../assets/jss/colorPalette";
import { textFont } from "../assets/jss/fontPalette";
import Margin from "../components/Margin";
import ConditionalAlert from "../components/ConditionalAlert";
import GreenCheck from "./GreenCheck";

/**
 * Status message component
 * @param style style
 * @param onClick onClick handler for connecting wallet
 * @returns {JSX.Element}
 */
export default function StatusMessage({ isSuccessful, successText = "", errorText = "", otherText = "" }) {
	const statusStyle = {
		display: "inline", color: textColor, opacity: 0.9,
		font: textFont, fontWeight: "400", fontSize: "18px"
	};
	return (
		(isSuccessful) ?
			(<div style={{ display: "flex", alignItems: "center", }}>
				<GreenCheck />
				<Margin width="17px" />
				<div style={statusStyle}>
					{successText}
				</div>
			</div>)
			:
			(<div style={statusStyle}>
				<ConditionalAlert severity="info" text={otherText} />
				<ConditionalAlert severity="error" text={errorText} />
			</div>)
	);
}
