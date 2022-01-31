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
import AnnouncementPage from "./AnnouncementPage";

export default function FaqPage({ user }) {

	return <>
		<Grid container direction="row" rowSpacing="55px" columnSpacing="5px" style={{ marginTop: 20 }} columns={24}>
			<Grid item xs={24} sm={24} md={24} lg={16} xl={16}>
				<HeaderTypography style={{ fontSize: "26px", fontWeight: "bold" }}>FAQ</HeaderTypography>
				<ParagraphTypography style={{ fontSize: "16px", color: secondaryTextColor }}>Here you can find answers to frequently asked questions.</ParagraphTypography>
				<Divider style={{ backgroundColor: "rgba(255, 255, 255, 0.65)", width: "35px", height: "2px", marginTop: "12px", marginBottom: "20px" }}/>
				<FaqTable/>
			</Grid>
			<Grid item xs={24} sm={24} md={24} lg={8} xl={8}>
				<AnnouncementPage user={user} isSidebar/>
			</Grid>
			<Grid item xs={24} sm={24} md={24} lg={24} xl={24}>
				<WelcomeBanner user={user}/>
			</Grid>
		</Grid>
	</>;
}

const faqData = [
	{
		title: "What is an NFT?",
		text: ["Non-fungible token or NFT is a type of crypto asset that represents digital works of art and other collectibles into one-of-a-kind. Each NFT is unique and exists in a single copy, it cannot be divided, and all information about its author, buyer and all transactions with it is securely stored in the blockchain. In other words, an NFT is a digital certificate attached to a unique object."]
	},
	{
		title: "Which blockchains does NFT world! support?",
		text: ["The NFT World! currently supports Ethereum blockchain."]
	},
	{
		title: "How to connect my wallet?",
		text: ["If you have not yet connected your wallet, you will be prompted to connect to the wallet when you try to join the drop or purchase an NFT token. ",
		"Also, you can do it in your Profile by clicking the Connect MetaMask Wallet button."]
	},
	{
		title: "Is connecting my wallet to NFT world! secure?",
		text: ["When you connect your wallet, you give us the right to view your wallet addresses, but we cannot take any money from it.",
		"When making any transaction, you will receive a notification in the pop-up window of your wallet and you will need to manually confirm the transaction.",
		"Thus, the connection to the wallet is secure, but you should still follow the general security rules. Such rules are, for example, to avoid using malicious sites and not to share your seed phrase with anyone"]
	},
	{
		title: "How can I join a drop?",
		text: ["You can view and choose the drops you are interested in on the main page of the NFT World! After being redirected to the drop page, you will be able to view the NFT belonging to that drop. If you want to join the drop, then select the amount of NFT you would like to receive and click the Join Drop button.",
		"You will be redirected to your wallet. Follow your wallet instructions to confirm the transaction."]
	},
	{
		title: "What are gas fees and how much do I need to pay?",
		text: ["The gas fees can be customized by a user with MetaMask. There you can set what you'd like to pay for the transaction, and lower gas fees mean slower transactions. MetaMask also says that transactions may not succeed if the fee is chosen too small."]
	},
	{
		title: "What is the NFT Collection and where can I find it?",
		text: ["The Collection shows the NFTs that you own. You can see your collection by clicking the NFT collection button on the Profile page."]
	},
	{
		title: "What is the NFT World?",
		text: ["The NFT World is an open source marketplace platform that can be used to sell and buy NFTs.",
		"This solution allows small, medium sized companies and enthusiasts to easily deploy their own NFT platform for non- or commercial purposes."]
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