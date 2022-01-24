// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2022 Christoph Ehm. <christoph.ehmendoerfer@campus.tu-berlin.de>

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import Box from "@mui/material/Box";

import HeaderTypography from "../components/HeaderTypography";
import ButtonLinkTypography from "../components/ButtonLinkTypography";
import CodeTypography from "../components/CodeTypography";
import RoundedEdgesButton from "../components/RoundedEdgesButton";
import { NFTCardViewBar, NFTCardViewContent, defaultGroupSize, } from "../components/NftCardStructuredList";

import { Image, CenterBox } from "../components/Common";

import { activeTextColor } from "../assets/jss/colorPalette";
const textColor = (alpha = 1.0) => `rgba(255, 255, 255, ${alpha})`;

const SimpleLink = ({ to, text }) => (
	<Link to={to} style={{ fontFamily: "PT Sans", textDecoration: "none", color: "inherit", display: "inline" }}>
		{text}
	</Link>
);

const GreenLink = ({ to, text }) => (
	<Link to={to} style={{ textDecoration: "none" }}>
		<ButtonLinkTypography style={{ color: activeTextColor, display: "inline" }}>
			{text}
		</ButtonLinkTypography>
	</Link>
);

import leftAngleIcon from "../assets/img/ku.svg";

/** used at the top of the page */
const BackLink = ({ Link, refererName, style }) => (
	<div style={style}>
		<Link>
			<div style={{ fontFamily: "Montserrat", fontWeight: "500", fontSize: "12px", display: "flex", alignItems: "center" }} >
				<Image src={leftAngleIcon} alt="<" height="1em"/>

				<Margin width="9px"/>

				<span style={{ marginTop: "-0.1em", }}>
					Back to {refererName}
				</span>
			</div>
		</Link>
	</div>
);

/**
 * Creates empty Space and allows for a solid separator line in between.
 * @param height CSS marginTop units. If width and borderMargin are used,
 *     this will determine the vertical length of the border instead.
 * @param width CSS marginLeft units. If set, the margin will behave like an HTML "span".
 * @param borderMargin CSS marginRight units if width is used otherwise marginBottom units.
 *     If set, 1px solid border is drawn between both margins.
 * @returns {JSX.Element}
 */
function Margin({ width, height, borderMargin, sx, ...style }) {
	let horizontalSpace = {};
	let verticalSpace = {};
	let borderSpace = {};

	const usesVerticalBorder = width && borderMargin;
	if (width)
		horizontalSpace = { display: "inline", marginLeft: width };

	if (height && !usesVerticalBorder)
		verticalSpace = { marginTop: height };

	if (borderMargin) {
		let borderProperties = "1px solid " + textColor(0.09);
		if (usesVerticalBorder)
			borderSpace = { borderLeft: borderProperties, marginRight: borderMargin, height, };
		else
			borderSpace = { borderTop: borderProperties, marginBottom: borderMargin };
	}

	return <Box {...{ sx }} style={{ ...horizontalSpace, ...verticalSpace, ...borderSpace, ...style, }}/>;
}


import ExampleNftImg21 from "../assets/img/nftExamples/image_part_021.png";
import ExampleNftImg22 from "../assets/img/nftExamples/image_part_022.png";
import ExampleNftImg38 from "../assets/img/nftExamples/image_part_038.png";
import ExampleNftImg39 from "../assets/img/nftExamples/image_part_039.png";
let nftCardDummyData = [
	{ title: "Nürnberg NFT 021", price: "1.0", nftPageUrl: "/info", imgUrl: ExampleNftImg21, buttonText: "Join drop", description: "There is something cool about this text. When this text gets to long the text will be automatically cut off. My biggest secret is that I love cookies." },
	{ title: "Nürnberg NFT 021", price: "0.0001", nftPageUrl: "/info", imgUrl: ExampleNftImg21, buttonText: "Join drop", description: "text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text " },
	{ title: "Nürnberg NFT 022", price: "0.0002", nftPageUrl: "/info", imgUrl: ExampleNftImg22, buttonText: "Join drop", description: "This text can be descriptive." },
	{ title: "Nürnberg NFT 038", price: "0.0001", nftPageUrl: "/info", imgUrl: ExampleNftImg38, buttonText: "Join drop" },
	{ title: "Nürnberg NFT 039", price: "0.0001", nftPageUrl: "/info", imgUrl: ExampleNftImg39, buttonText: "Join drop", description: "The previous NFT had no description." },
];

/**
 * Content of a page showing information related to a selected NFT.
 * @param setUser from main App container
 * @param user from main App container
 * @returns {JSX.Element}
 */
export default function NFTInfoPage(/*{ setUser, user, }*/) {
	const isLarge = useMediaQuery({ query: "(min-width: 750px)" });

	const render = () => (<>
		<BackLink Link={RefererLink} {...{ refererName }} style={{ marginTop: "18px", width: "100%" }}/>

		<Margin height="32px"/>

		{isLarge? largeLayout() : smallLayout()}

		<Margin height="39px"/>

		<NFTCardViewBar {...{ selectedGroupSize, setSelectedGroupSize }}>
			<HeaderTypography style={{ fontWeight: "700", fontSize: "18px", }}>
				Other NFTs from this drop
			</HeaderTypography>
		</NFTCardViewBar>

		<Margin height="26px"/>

		<NFTCardViewContent selectedNFTCardData={similarNFTCardData} {...{ selectedGroupSize, }}/>
	</>);

	const smallLayout = () => (
		<div style={{ marginLeft: "10px", marginRight: "10px", display: "flex", flexDirection: "column", alignItems: "stretch", }}>
			<NFTInfoTitle/>
			<NFTInfoImage/>
			<NFTInfoDetailColumn {...{ CollectionLink, OwnerLink }} />
			<NFTInfoDropInfo {...{ CollectionLink, AuthorLink }} />
		</div>
	);

	const largeLayout = () => (
		<div style={{ display: "flex", flexDirection: "row", }} >
			<div style={{ display: "flex", flexDirection: "column", maxWidth: "33%", }}>
				<NFTInfoImage/>
				<NFTInfoDropInfo {...{ CollectionLink, AuthorLink }} /> 
			</div>

			<Margin width="28px"/>

			<div style={{ display: "flex", flexDirection: "column", maxWidth: "calc(66% - 28px)", }}>
				<NFTInfoTitle/>
				<NFTInfoDetailColumn {...{ CollectionLink, OwnerLink }}/>
			</div>
		</div>
	);

	const refererPath = "";  // TODO
	const refererName = "<NFT collection name>";  // TODO, could be either NFT Drop or profile name

	const RefererLink = ({ children }) => <SimpleLink to={refererPath} text={children} />;
	
	const CollectionLink = () => <GreenLink to={refererPath} text={refererName} />;

	const authorPath = "";  // TODO
	const authorName = "Author name";  // TODO

	const AuthorLink = () => <GreenLink to={authorPath} text={authorName} />;

	const ownerPath = "";  // TODO
	const ownerName = null;  // TODO, must be null if there is no owner yet
	const isOwnerYou = false;  // TODO
	const hasOwner = !!ownerName;
	const OwnerLink = hasOwner && (() => <GreenLink to={ownerPath} text={isOwnerYou? "you" : ownerName} />);

	const [selectedGroupSize, setSelectedGroupSize] = useState(defaultGroupSize);
	const similarNFTCardData = nftCardDummyData;  // TODO, get data of NFT Card that are similar to current

	return render();
}



import exampleImage from "../assets/img/nftExamples/image_part_021.png";

const NFTInfoImage = () => {
	const nftImage = exampleImage;  // TODO, swap exampleImage with real image

	return (<div>
		<div style={{ marginLeft: "8px", width: "calc(100% - 16px)", }}>
			<Image src={nftImage} borderRadius="3px" width="100%"/>
		</div>

		<Margin height="27px"/>
	</div>);
};

import ParagraphTypography from "../components/ParagraphTypography";
import copySymbol from "../assets/img/copy-symbol.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";

// copyContent: String that should be copied to clipboard
export const CopyButton = ({ copyContent }) => (
	<CopyToClipboard text={copyContent} >
		<Image src={copySymbol} alt="Copy" width="18px" cursor="pointer" />
	</CopyToClipboard>
);

/**
 * represents a column with NFT image and associated NFT Drop information.
 * @param CollectionLink represents a link back to the NFT Collection page where this NFT was selected.
 * @param AuthorLink represents a link to the original creator account.
 * @returns 
 */
function NFTInfoDropInfo({ CollectionLink, AuthorLink }) {
	const nftDropText = "Subtitle or description, can be in two rows. Or even longer description can be here or somewhere else. Subtitle or description, can be in two rows.";  // TODO
	const nftDropHashString = "0xA6048Ce1dF0c37E010Eb9E64da0C8E72f274C6";  // TODO

	const fourLinesStyle = { display: "-webkit-box", lineClamp: 4, WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" };
	const render = () => (
		<div style={{ paddingTop: "10px", paddingLeft: "16px", paddingBottom: "15px", paddingRight: "16px", borderRadius: "7px", background: "rgba(255,255,255,0.04)", }}>
			<div style={{ fontFamily: "Noto Sans", color: textColor(0.83), fontWeight: "400", fontSize: "13px", }}>
				This item is part of drop <CollectionLink/>.
			</div>

			<Margin height="10px"/>

			<ParagraphTypography style={{ fontWeight: "700", fontSize: "16px", }}>
				About Drop
			</ParagraphTypography>

			<Margin height="3px"/>

			<div style={{ fontFamily: "Noto Sans", color: textColor(0.5), fontSize: "13px", }}>
				Author: <AuthorLink/>
			</div>

			<Margin height="9px"/>

			<ParagraphTypography style={{ color: textColor(0.9), fontSize: "15px", fontWeight: "500", ...fourLinesStyle }}>
				{nftDropText}
			</ParagraphTypography>

			<Margin height="0.9em"/>

			<NFTDropHash/>
		</div>
	);

	const NFTDropHash = () => {
		const dropHashBoxStyle = ({
			width: "calc(100% - 31px)",
			overflow: "hidden",
			textOverflow: "ellipsis",
			paddingLeft: "7px",
			paddingRight: "7px",
			paddingTop: "6px",
			paddingBottom: "6px",
			color: "#858585",
			background: textColor(0.02),
			border: "1px dashed " + textColor(0.14),
			boxSizing: "border-box",
			borderRadius: "4px",
		});

		return (<>
			<ParagraphTypography style={{ color: textColor(0.5), fontWeight: "500", fontSize: "13px" }}>
				Drop hash:
			</ParagraphTypography>

			<Margin height="7px"/>

			<CenterBox row style={{ justifyContent: "space-between", }}>
				<CodeTypography style={dropHashBoxStyle}>
					{nftDropHashString}
				</CodeTypography>

				<Margin width="13px"/>

				<CopyButton copyContent={nftDropHashString}/>
			</CenterBox>
		</>);
	};

	return render();
}

const NFTInfoTitle = () => {
	const nftName = "Title of the NFT";  // TODO

	return (<>
		<HeaderTypography style={{ fontWeight: "700", fontSize: "34px", marginTop: "-8px" }}>
			{nftName}
		</HeaderTypography>

		<Margin height="24px"/>
	</>);
};

/**
 * Represents a column of NFT specific information like owner, related NFT Drop, description, price...
 * @param CollectionLink JSX Component representing the Link back to the collection page
 *     where this NFT was selected.
 * @param OwnerLink JSX component representing the owner link.
 *     If <pre>null</pre> or <pre>undefined</pre>, it will omit the owner.
 * @returns {JSX.Element}
 */
function NFTInfoDetailColumn({ CollectionLink, OwnerLink }) {
	const varietyName = null; // TODO
	const mintDate = null; // TODO
	const tokenID = "0xA6048Ce1dF0c37E010Eb9E64da0C8E72f274C6"; // TODO

	return (<>
		<NFTAssociations {...{ CollectionLink, OwnerLink }}/>

		<NFTBuyingOptions/>

		<NFTDescription/>
		
		<NFTSpecificInformation {...{ varietyName, mintDate, tokenID }} />
	</>);
}

const infoPropertyLabelStyle = {
	fontWeight: "700",
	fontSize: "16px",
};
const infoPropertyLinkStyle = {
	fontWeight: "500",
	fontSize: "16px",
};

// OwnerLink may also be null or undefined
const NFTAssociations = ({ CollectionLink, OwnerLink = null, }) => {
	const owner = !!OwnerLink && (<>
		<span style={infoPropertyLabelStyle}>
			Owner&nbsp;
		</span>
		<span style={infoPropertyLinkStyle}>
			<OwnerLink/>
		</span>

		<Margin sx={{ display: { xs: "none", sm: "inline", } }} width="30px"/>
		<Margin sx={{ display: { xs: "block", sm: "none", } }} height="4px"/>
	</>);

	return (<>
		<div style={{ fontFamily: "Noto Sans", }}>
			{owner}
	
			<span style={infoPropertyLabelStyle}>
				Part of&nbsp;
			</span>
			<span style={infoPropertyLinkStyle}>
				<CollectionLink/>
			</span>
		</div>
	
		<div style={{ marginTop: "27px", marginBottom: "23px", borderTop: "1px solid " + textColor(0.09) }} />
	</>);
};

import ethIcon from "../assets/img/ethereumIcon.svg";

const NFTInfoBuyingLabel = ({ text }) => (
	<ParagraphTypography style={{ fontWeight: "500", fontSize: "13px", color: textColor(0.57) }}>
		{text}
	</ParagraphTypography>
);

const NFTBuyingOptions = () => {
	const price = 3.6;  // TODO, no owner? then join price, owner resells? then resale price, else null

	const render = () => (<>
		<div style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start", }}>
			{nftInfoPrice}
			{nftInfoAction}
		</div>

		<Margin height="38px"/>
	</>);

	const hasPrice = !!price;
	const nftInfoPrice = hasPrice && (<div>
		<NFTInfoBuyingLabel text="Price:"/>
		<Margin height="2px"/>

		<div style={{ fontFamily: "Noto Sans", fontWeight: "700", fontSize: "33px", }}>
			<Image src={ethIcon} alt="ETH" height="0.8em" display="inline"/>
			{price}
			<Margin width="31px"/>
		</div>
	</div>);

	let nftInfoAction;

	const hasEditRights = true;  // TODO, only Admin or original Author can edit (but not buy)
	const isOwner = false;  // TODO, this could be passed as argument from the default component above
	if (hasEditRights) {
		nftInfoAction = <NFTInfoEditOptions/>;
	} else if (hasPrice && !isOwner) {
		nftInfoAction = <NFTInfoPlaceOrderButton/>;
	}

	return render();
};

const NFTInfoEditOptions = () => {
	const unpublishButtonStyle = { height: "36px", width: "113px", fontWeight: "700", fontSize: "14px", background: activeTextColor, };
	const unpublishPath = "";  // TODO, maybe an onClick event would be better
	const editItemPath = "";  // TODO
	const deleteItemPath = "";  // TODO

	const NFTInfoActionButton = ({ children, style, ...props }) => (
		<RoundedEdgesButton style={{ fontWeight: "700", fontSize: "14px", color: "#C4C4C4", ...style, }} component={Link} {...props}>
			{children}
		</RoundedEdgesButton>
	);

	const actions = (<div style={{ display: "flex", alignItems: "baseline" }}>
		<RoundedEdgesButton style={unpublishButtonStyle} component={Link} to={unpublishPath}>
			Unpublish
		</RoundedEdgesButton>

		<Margin width="23px"/>

		<NFTInfoActionButton to={editItemPath} style={{ visibility: "hidden", }}>
			Edit Item
		</NFTInfoActionButton>

		<Margin width="20px"/>

		<NFTInfoActionButton to={deleteItemPath} style={{ visibility: "hidden", }}>
			Delete
		</NFTInfoActionButton>
	</div>);

	return (<>
		<div style={{ fontSize: "33px", }}>
			<NFTInfoBuyingLabel text={<br/>} />

			<Margin height="10px"/>

			<Margin width="0px" heigth="1em" borderMargin="43px"/>
		</div>

		<div>
			<NFTInfoBuyingLabel text="Actions:" />

			<Margin height="10px"/>

			{actions}
		</div>
	</>);
};

const NFTInfoPlaceOrderButton = () => {
	const buyButtonStyle = { padding: "0px", height: "57px", width: "192px", fontWeight: "700", fontSize: "18px", background: activeTextColor, };
	const buyPath = "";  // TODO, could be that we need onClick event instead
	
	return (<div>
		<NFTInfoBuyingLabel text={<br/>} />

		<RoundedEdgesButton style={buyButtonStyle} component={Link} to={buyPath}>
			Place Order
		</RoundedEdgesButton>
	</div>);
};

const NFTDescription = () => {
	const nftDescriptionContent = (<>
		Subtitle or description, can be in two rows.
		Or even longer description can be here or somewhere else.
		Subtitle or description, can be in two rows.
		Or even longer description can be here or somewhere else.<br/><br/>

		Subtitle or description, can be in two rows.<br/><br/>

		Or even longer description can be here or somewhere else.
		Subtitle or description, can be in two rows.
		Or even longer description can be here.
	</>);  // TODO, maybe use the Drop description for now

	return (<>
		<HeaderTypography style={{ fontWeight: "700", fontSize: "24px", }}>
			Description
		</HeaderTypography>

		<Margin height="20px"/>

		<div style={{ fontFamily: "Noto Sans", fontWeight: "500", fontSize: "18px", }}>
			{nftDescriptionContent}
		</div>

		<Margin height="36px"/>
	</>);
};

/**
 * Arranges these things of NFT specific information.
 * @param varietyName String, hides variety label if null/undefined
 * @param mintDate Date or String, hides mint date if null/undefined
 * @param tokenID String
 * @returns {JSX.Element}
 */
function NFTSpecificInformation({ tokenID, varietyName = null, mintDate = null, }) {
	const nftTokenIDStyle = { fontSize: "12px", color: textColor(0.5), };
	const render = () => (<div>
		<Box sx={{ flexDirection: { xs: "column", md: "row", }, alignItems: { md: "baseline", }, }} style={{ display: "flex", }}>
			<ParagraphTypography style={{ display: "inline", ...nftTokenIDStyle }}>
				NFT Token ID:&ensp;
			</ParagraphTypography>

			<Margin sx={{ display: { xs: "block", md: "none", } }} height="0.5em" />

			<CenterBox row style={nftTokenIDStyle}>
				<span style={{ maxWidth: "calc(100% - 31px)", overflow: "hidden", textOverflow: "ellipsis", }}>
					{tokenIDField}
				</span>

				<Margin width="13px"/>

				<CopyButton copyContent={tokenID}/>
			</CenterBox>
		</Box>

		<Margin height="8px" borderMargin="19px"/>

		<div style={{ fontFamily: "Noto Sans", }}>
			{varietyInfo}

			{mintDateInfo}

			{ !hasVariety && !isMinted &&
				<Margin sx={{ display: { xs: "block", md: "none" } }} height="20px" />
			}
		</div>
	</div>);

	const tokenIDField = (
		<CodeTypography style={{ color: "inherit", display: "inline", fontSize: "13px", fontWeight: "500", padding: "4px", background: textColor(0.02), borderRadius: "4px" }}>
			{tokenID}
		</CodeTypography>
	);


	const varietyColor = "#00528D";  // TODO, for example take bits from varietyName hash
	const VarietyLabel = () => (
		<span style={{ fontSize: "13px", fontWeight: "500", padding: "3px", borderRadius: "3px", background: varietyColor, foreground: textColor(), }}>
			{varietyName}
		</span>
	);
	const hasVariety = !!varietyName;
	const varietyInfo = hasVariety && (<>
		<span style={infoPropertyLabelStyle}>
			Variety&ensp;<VarietyLabel/>
		</span>

		<Margin sx={{ display: { xs: "none", md: "inline" } }} width="17px"/>
		<Margin sx={{ display: { xs: "block", md: "none" } }} height="4px" />
	</>);


	const MintDateString = () => (
		<span style={{ fontWeight: "500", fontSize: "inherit" }}>
			{mintDate.toDateString?.().substring(4) ?? mintDate}
		</span>
	);
	const isMinted = !!mintDate;
	const mintDateInfo = isMinted && (
		<span style={infoPropertyLabelStyle}>
			Minted&nbsp;<MintDateString/>
		</span>
	);

	return render();
}