// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021/2022 Dominic Heil <d.heil@campus.tu-berlin.de>

import { textFont } from "./fontPalette";

const WHITE_35 = "#FFFFFF59";
const WHITE_60 = "#FFFFFF99";
const WHITE_85 = "#FFFFFFD8";

// JSS for one line input fields
export const inputFieldStyle = {
	"& fieldset": {
		borderColor: WHITE_35,
	},
	"svg": {
		filter: "invert(100%) sepia(16%) saturate(131%) hue-rotate(240deg) brightness(118%) contrast(35%)"
	},
	"&:hover fieldset": {
		borderColor: WHITE_60,
	},
	"& label": {
		fontFamily: textFont,
		fontSize: "14px",
		marginTop: "2px"
	},
	"& label.Mui-focused": {
		color: WHITE_60,
	},
	"& .MuiFormLabel-asterisk": {
		color: WHITE_60,
	},
	"& .MuiFormLabel-root": {
		color: WHITE_60,
	},
	".MuiOutlinedInput-notchedOutline": {
		borderWidth: "1px",
		borderRadius: "7px"
	},
	".MuiOutlinedInput-input":{
		color: "white",
		fontFamily: textFont,
	},
	"& .MuiOutlinedInput-root": {
		"&.Mui-focused fieldset": {
			borderColor: WHITE_60,
		},
		"&:hover fieldset": {
			borderColor: WHITE_85,
		},
		"& label.Mui-focused": {
			color: WHITE_85,
		},
	},
};
