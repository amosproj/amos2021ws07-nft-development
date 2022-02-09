// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>
// SPDX-FileCopyrightText: 2022 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>
// SDPX-FileCopyrightText: 2021 Que Le <b.le@tu-berlin.de>

import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { textColor } from "../assets/jss/colorPalette";
import { textFont } from "../assets/jss/fontPalette";
import Margin from "../components/Margin";
import CenterBox from "../components/CenterBox";
import HeaderTypography from "../components/HeaderTypography";

/**
 * Displays one row of related profile settings.
 * @param label name of the profile setting (displayed left), string only
 * @param inputFieldList list of TextField properties for default text input fields (displayed in mid).
 *    If the text field data is only a string, it's used as `defaultValue` property.
 *    The text field data JSON should have at least the `label` property, `defaultValue` is recommended.
 * @param inputColumnExtra additional JSX element(s) to display below text input fields
 * @param inputDescription string or JSX describing the input fields or format (displayed right)
 * @param boxProps properties for the frame of the entire profile setting
 * @returns {JSX.Element}
 */
export default function ProfileSetting({ label, inputFieldList = [], inputColumnExtra = "", inputDescription = "", boxProps = {}, }) {
	const render = () => (
		<Box {...boxProps}>
			<ProfileSettingRow {...{ left, middle, right }} />
			{!!inputColumnExtra && <Margin height="24px" />}
			<ProfileSettingRow middle={inputColumnExtra} />
		</Box>
	);

	const ProfileSettingRow = ({ left = "", middle = "", right = "", }) => (
		<Box sx={{ flexDirection: { xs: "column", md: "row", }, }} style={{ display: "flex", justifyContent: "space-between" }}>
			<Box sx={{ width: { xs: "100%", md: "25%", } }}>
				{left}
			</Box>

			{!!left && <Margin sx={{ display: { xs: "block", md: "none", } }} height="24px" />}

			<Box
				sx={{ width: { xs: "100%", md: "calc(37% - 46px)", }, display: { xs: "flex", md: "block", }, }}
				style={{ flexDirection: "column", alignItems: "center", }}
			>
				{middle}
			</Box>

			<Margin sx={{ display: { xs: "none", md: "inline", }, }} width="46px" />
			{!!right && <Margin sx={{ display: { xs: "block", md: "none", }, }} height="8px" />}

			<CenterBox row sx={{ width: { xs: "100%", md: "37%", } }}>
				{right}
			</CenterBox>
		</Box>
	);

	const textFieldProps = (textFieldData, id) => ({
		required: true,
		fullWidth: true,
		name: `${label}${id}`,
		id: `${label}${id}`,
		multiline: false,
		// TODO, it may use the "error" property
		...(
			typeof (textFieldData) === "string" ?
				{ defaultValue: textFieldData }
				: textFieldData
		)
	});
	const textFieldColor = (alpha) => `rgba(255,255,255,${alpha})`;
	// TODO create a text field theme instead
	const textFieldStyle = {
		border: `1px solid ${textFieldColor(0.5)}`, borderRadius: "7px",
		fontWeight: "400", fontSize: "16px"
	};
	const textFieldSX = {
		input: {
			WebkitTextFillColor: `${textFieldColor(0.6)} !important`,
			color: `${textFieldColor(0.6)} !important`
		},
		label: { color: textFieldColor(0.6) }
	};

	const left = (
		<HeaderTypography style={{ fontWeight: "700", fontSize: "18px", color: textColor }}>
			{label}
		</HeaderTypography>
	);

	let middle;
	if (inputFieldList.length)
		middle = inputFieldList.map((textFieldData, index) => (<div key={index.toString()}>
			{(index > 0) && <Margin height="24px" />}
			<TextField {...textFieldProps(textFieldData, index)} style={textFieldStyle} sx={textFieldSX} />
		</div>));
	else {
		middle = inputColumnExtra;
		inputColumnExtra = null;
	}

	const right = (
		<div style={{ fontFamily: textFont, fontWeight: "400", fontSize: "18px", color: textColor, opacity: 0.7, }}>
			{inputDescription}
		</div>
	);

	return render();
}
