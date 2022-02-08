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
import ButtonLinkTypography from "../components/ButtonLinkTypography";

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
		text: [
			"A non-fungible token or NFT for short is a type of digital asset. " +
			"It can represent, for example, digital works of art and other collectibles, each NFT being one-of-a-kind, i.e. \"non-fungible\". " +
			"Each NFT has a unique value. It's indivisible and all meta information about its author, buyer and associated transactions is immutably and publicly stored on blockchain.",

			"An NFT can be thought of like a digital certificate of market rights attached to a digital artificact.",

			"Yet, in most parts of the world, this meaning relies on community conventions and metaverse applications and not actual legal rights.",

			"NFTs are not a copy protection for digital content."
		]
	},
	{
		title: "Which blockchains does NFT The World! support and why?",
		text: [
			"NFT The World! only supports the Ethereum blockchain mainly because of popularity and a big community of users and developers."
		]
	},
	{
		title: "How to connect my wallet?",
		text: [
			"If you have not yet connected your wallet, you will be prompted to connect to the wallet when you try to join the drop or purchase an NFT token.",
			"You can also click on the \"Connect MetaMask Wallet\" button in your profile or your NFT Collection."
		]
	},
	{
		title: "Is connecting my wallet to NFT world! secure?",
		text: [
			"When you connect your wallet, you give us the right to view your wallet addresses, but we cannot withdraw any money from it. " +
			"Before every transaction, you will receive a notification in the pop-up window of your wallet and you will need to manually confirm the transaction.",

			"We are using MetaMask which is a \"Hot Wallet\" that can be accessed over Internet. The wallet connection is as secure as the wallet application itself. " +
			"Therefore, you should follow the general security rules. Such rules are, for example, to avoid using dubious sites, offers. " +
			"Don't open or interact with unsolicited NFTs sent to you and do not share your seed phrase nor password with anyone.",

			"You could consider a second \"cold\" wallet for long-term asset storage and use MetaMask for your online activity only.",

			"For hot wallets to prevent abuse by unauthorized people, be careful to log out of your MetaMask account as soon as you are done with your activity! " +
			"Otherwise other PC users or hackers with advanced control might be able to use it!"
		]
	},
	{
		title: "What is an NFT drop and how can I join?",
		text: [
			"An NFT drop is the release of a collection of usually related but random NFTs for purchase. " +
			"Joining a \"drop\" means reserving a buying position.",
			"You can view and choose drops of your interest on the main page of NFT The World! " +
			"After being redirected to the drop's individual page, you will be able to view included example NFTs. " +
			"If you want to join the drop, select the amount of NFTs you would like to buy later and click the Join Drop button.",

			"Note that NFTs will be distributed randomly! A higher amounts improves the chance of getting a rare or your desired NFT. " +
			"Your buying amount is limited to 20% of the total number of available NFTs.",

			"After having Joined the Drop, you will be redirected to your wallet. Follow your wallet instructions to confirm the transaction."
		]
	},
	{
		title: "What are gas fees and how much do I need to pay?",
		text: [
			"Gas fees are costs imposed by miners (blockchain verifiers) for executing transactions.",
			"In MetaMask you will see a recommended gas fee. The gas fees can be customized in MetaMask. " +
			"There you can set what you'd like to pay for the transaction. " +
			"Lower gas fees mean slower transactions because miners prioritize transactions which pay more. ",
			"According to MetaMask, transactions might not succeed if the fee is chosen too small."
		]
	},
	{
		title: "What is the NFT Collection and where can I find it?",
		text: ["The Collection shows the NFTs that you own. You can see your collection by clicking the NFT collection button on your Profile page."]
	},
	{
		title: "What is NFT The World?",
		text: [
			"NFT The World! is an open source NFT Drop marketplace platform that can be used to easily create NFT Drops and easily sell and buy NFTs.",
			"This solution allows small and medium sized companies and enthusiasts to easily deploy their own NFT platform for non- or commercial purposes."
		]
	}
];

function FaqTable() {
	const [ openedId, setOpenedId ] = React.useState(0);
	const maxOpenedId = (1 << faqData.length) - 1;
	const isFullyExtended = (openedId === maxOpenedId);
	
	const ExpansionStrategy = {
		SINGLE: function (id) {
			this.toggleFaqRow = () => setOpenedId( (this.isOpened? 0 : 1) << id );
			this.isOpened = !!((openedId >> id) & 1);
		},
	
		MULTIPLE: function (id) {
			this.toggleFaqRow = () => setOpenedId( openedId ^ (1 << id) );
			this.isOpened = !!((openedId >> id) & 1);
		},
	};
	const defaultStrategy = "SINGLE";
	const otherStrategy = "MULTIPLE";
	const [strategyId, setStrategyId] = React.useState(defaultStrategy);
	let Strategy = ExpansionStrategy[strategyId];

	return (<>
		<div style={{ display: "flex", }}>
			<ButtonLinkTypography onClick={() => setOpenedId(isFullyExtended? 0 : maxOpenedId)} style={{ cursor: "pointer", color: isFullyExtended? activeTextColor : textColor, }}>
				all
			</ButtonLinkTypography>
			&nbsp;&nbsp;|&nbsp;&nbsp;
			<ButtonLinkTypography onClick={() => setStrategyId(strategyId === otherStrategy? defaultStrategy : otherStrategy)} style={{ cursor: "pointer", color: strategyId === otherStrategy? activeTextColor : textColor }}>
				multi mode
			</ButtonLinkTypography>
		</div>
		<TableContainer>
			<Table aria-label="collapsible table">
				<TableBody>
					{faqData.map((row, index) => (
						<FaqQuestionRow key={row.title.replace(" ","_")} strategy={new Strategy(index)} row={row}/>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	</>
	);
}

function FaqQuestionRow({ strategy, row }) {
	return (
		<React.Fragment>
			<TableRow>
				<TableCell component="th" scope="row" onClick={strategy.toggleFaqRow} style={{ borderBottom: "none", paddingLeft: "0px", paddingBottom: "10px", paddingTop: "25px" }}>
					<HeaderTypography style={{ color: strategy.isOpened ? activeTextColor : textColor, cursor: "pointer", fontSize: "20px", fontWeight: "bold", userSelect: "none" }} >
						{row.title}&nbsp;
						<img src={ strategy.isOpened ? RightArrowGreen : RightArrowWhite } alt="->"/>
					</HeaderTypography>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingTop: 0, borderBottom: "1px dashed rgba(255, 255, 255, 0.3)", paddingLeft: "0px" }} colSpan={6}>
					<Collapse in={strategy.isOpened} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 0, marginLeft: 0, paddingLeft: "0px", paddingBottom: "8px" }}>
							{row.text.map((paragraph, idx) => (
								<ParagraphTypography key={idx} style={{ color: textColor, lineHeight: "181%", paddingTop: "6px", paddingBottom: (idx < row.text.length-1)?"18px":0 }}>
									{paragraph}
								</ParagraphTypography>
							))}
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}