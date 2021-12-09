// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import HeaderTypography from "../components/HeaderTypography";
import ParagraphTypography from "../components/ParagraphTypography";
import RightArrowWhite from "../assets/img/right-arrow-white.svg";
import RightArrowGreen from "../assets/img/right-arrow-green.svg";
import {
	Box,
	Collapse,
	Divider,
	Table, TableBody,
	TableCell,
	TableContainer,
	TableRow,
} from "@mui/material";
import * as React from "react";
import { activeTextColor, secondaryTextColor, textColor } from "../assets/jss/colorPalette";
import Grid from "@mui/material/Grid";

import WelcomeBanner from "../components/Banner";

export default function FaqPage({ user }) {

	return <>
		<Grid container spacing={2} style={{ marginTop: 20 }}>
			<Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
				<HeaderTypography style={{ fontSize: "26px", fontWeight: "bold" }}>FAQ</HeaderTypography>
				<ParagraphTypography style={{ fontSize: "16px", color: secondaryTextColor }}>Here you can find answers to frequently asked questions.</ParagraphTypography>
				<Divider style={{ backgroundColor: "rgba(255, 255, 255, 0.65)", width: "35px", height: "2px", marginTop: "12px", marginBottom: "20px" }}/>
				<FaqTable/>
			</Grid>
			<Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
				<div style={{ backgroundColor: "red", width: "100%", height: "320px" }}>Announcements</div>
			</Grid>
			<Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ marginTop: "52px" }}>
				<WelcomeBanner user={user}/>
			</Grid>
		</Grid>
	</>;
}

const faqData = [
	{
		title: "How can I get a token?",
		text: ["By joining a drop and paying for it."]
	},
	{
		title: "What is NFT the world project?",
		text: ["This project aims to create a reusable example application which generates valid NFTs and automatizes " +
		"important steps in order to lower the usability hurdles and improve crucial adoption. As an open source project," +
		" the result can be used by others, also for small to medium sized companies, to easily create NFT solutions for " +
		"their own marketing strategies, sales management or online campaigns for several non- or commercial purposes.",
		"A private secondary market mechanism can be supported for a deeper relationship of customers to the owning seller. " +
			"In particular, we are creating a web service that can be used to buy and trade NFTs of Nürnberg and Riga on the Ethereum Kovan Testnet."]
	},
	{
		title: "Where can I store tokens?",
		text: ["In your MetaMask wallet."]
	},
	{
		title: "How is the price of tokens determined?",
		text: ["By the users."]
	},
	{
		title: "What will happen to my tokens if the project is close? (This is just an example of how the text looks in multiple lines)",
		text: ["You will keep them :)."]
	},
	{
		title: "Why is this project open source?",
		text: ["Because it started as an open source university project.", "And because we can."]
	}
];

function FaqTable() {
	return (
		<TableContainer >
			<Table aria-label="collapsible table">
				<TableBody>
					{faqData.map((row) => (
						<FaqQuestionRow key={row.title.replace(" ","_")} row={row} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

function FaqQuestionRow(props) {
	const { row } = props;
	const [open, setOpen] = React.useState(false);

	return (
		<React.Fragment>
			<TableRow>
				<TableCell component="th" scope="row" onClick={() => setOpen(!open)} style={{ borderBottom: "none", paddingLeft: "0px", paddingBottom: "10px", paddingTop: "25px" }}>
					<HeaderTypography style={{ color: open ? activeTextColor : textColor, cursor: "pointer", fontSize: "20px", fontWeight: "bold", userSelect: "none" }} >
						{row.title} <img src={ open ? RightArrowGreen : RightArrowWhite } alt="right arrow"/>
					</HeaderTypography>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingTop: 0, borderBottom: "1px dashed rgba(255, 255, 255, 0.3)", paddingLeft: "0px" }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 0, marginLeft: 0, paddingLeft: "0px", paddingBottom: "8px" }}>
							{row.text.map((paragraph, idx) => <ParagraphTypography key={idx} style={{ color: textColor, lineHeight: "181%", paddingTop: "6px", paddingBottom: (idx < row.text.length-1)?"18px":0 }}>{paragraph}</ParagraphTypography>)}
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}