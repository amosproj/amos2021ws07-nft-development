// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2022 Christoph Ehm. <christoph.ehmendoerfer@campus.tu-berlin.de>
// SPDX-FileCopyrightText: 2021/2022 Dominic Heil <d.heil@campus.tu-berlin.de>
// SDPX-FileCopyrightText: 2022 Que Le <b.le@tu-berlin.de>

import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";



import Margin from "../components/MarginNFTInfoPage";

import ethereumContractApi from "../api/ethereumContractApi";
import MetaMaskNotConnected from "../components/MetaMaskNotConnected";
import GreenLink from "../components/GreenLink";

import NFTInfoDetailColumn from "../components/NFTInfoDetailColumn";
import NFTInfoImage from "../components/NFTInfoImage";
import NFTInfoTitle from "../components/NFTInfoTitle";
import BackLink from "../components/BackLink";
import SimpleLink from "../components/SimpleLink";
import NFTInfoDropInfo from "../components/NFTInfoDropInfo";

/**
 * Content of a page showing information related to a selected NFT.
 * @param setUser from main App container
 * @param user from main App container
 * @returns {JSX.Element}
 */
export default function NFTInfoPage(/*{ setUser, user, }*/) {
	const isLarge = useMediaQuery({ query: "(min-width: 750px)" });
	const [nftName, setNftName] = useState("Title");
	const [nftUri, setNftUri] = useState("");
	const [nftToken, setNftToken] = useState("");
	const [ownerAddress, setOwnerAddress] = useState("");
	const [metaMaskIsConnected, setMetaMaskIsConnected] = useState(false);
	const textColor = (alpha = 1.0) => `rgba(255, 255, 255, ${alpha})`;
	const infoPropertyLabelStyle = {
		fontWeight: "700",
		fontSize: "16px",
	};
	const infoPropertyLinkStyle = {
		fontWeight: "500",
		fontSize: "16px",
	};
	useEffect(() => {
		if (ethereumContractApi.selectedAccount !== null) {
			setMetaMaskIsConnected(true);
		}
	}, []);

	const connectMetaMask = () => ethereumContractApi.init().then(() => {
		setMetaMaskIsConnected(true);
	});

	useEffect(async () => {
		if (metaMaskIsConnected){
			const urlParams = new URLSearchParams(window.location.search);
			const nftToken = urlParams.get("nftToken");
			if (nftToken === "" || nftToken === null)
				return;

			let uri = await ethereumContractApi.getUriOfNft(nftToken);
			let name = await ethereumContractApi.getNameOfNft(nftToken);
			let ownerAddress = await ethereumContractApi.getOwnerOfNft(nftToken);

			setNftUri(uri);
			setNftName(name);
			setNftToken(nftToken);
			setOwnerAddress(ownerAddress);
		}
	}, [metaMaskIsConnected]);

	const render = () => (<>
		<BackLink Link={RefererLink} {...{ refererName }} style={{ marginTop: "18px", width: "100%" }}/>
		<Margin height="32px"/>
		{isLarge? largeLayout() : smallLayout()}
		<Margin height="39px"/>
		{/* TODO: If in future a mapping from NFT token address to drop is added, you can display other NFTs from that
		 drop using the following code: */}
		{/*<NFTCardViewBar {...{ selectedGroupSize, setSelectedGroupSize }}>*/}
		{/*	<HeaderTypography style={{ fontWeight: "700", fontSize: "18px", }}>*/}
		{/*		Other NFTs from this drop*/}
		{/*	</HeaderTypography>*/}
		{/*</NFTCardViewBar>*/}
		{/*<Margin height="26px"/>*/}
		{/*<NFTCardViewContent selectedNFTCardData={similarNFTCardData} {...{ selectedGroupSize, }}/>*/}
	</>);

	const smallLayout = () => (
		<div style={{ marginLeft: "10px", marginRight: "10px", display: "flex", flexDirection: "column", alignItems: "stretch", }}>
			<NFTInfoTitle nftName={nftName}/>
			<NFTInfoImage imgUrl={nftUri}/>
			{/* <NFTInfoDetailColumn {...{ CollectionLink, OwnerLink }} nftName={nftName}/> */}
			<NFTInfoDetailColumn 
				CollectionLink={CollectionLink} OwnerLink={OwnerLink} nftName={nftName} 
				infoPropertyLabelStyle={infoPropertyLabelStyle} infoPropertyLinkStyle={infoPropertyLinkStyle}
			/>
			{/* <NFTInfoDropInfo {...{ CollectionLink, AuthorLink }} nftDropToken={nftToken} dropName={nftName}/> */}
			<NFTInfoDropInfo 
				CollectionLink={CollectionLink} AuthorLink={AuthorLink} 
				nftDropToken={nftToken} dropName={nftName} textColor={textColor}
			/>
		</div>
	);

	const largeLayout = () => (
		<div style={{ display: "flex", flexDirection: "row", }} >
			<div style={{ display: "flex", flexDirection: "column", maxWidth: "33%", }}>
				<NFTInfoImage imgUrl={nftUri}/>
				{/* <NFTInfoDropInfo {...{ CollectionLink, AuthorLink }} nftDropToken={nftToken} dropName={nftName}/> */}
				<NFTInfoDropInfo 
					CollectionLink={CollectionLink} AuthorLink={AuthorLink} 
					nftDropToken={nftToken} dropName={nftName} textColor={textColor}
				/>
			</div>

			<Margin width="28px"/>

			<div style={{ display: "flex", flexDirection: "column", maxWidth: "calc(66% - 28px)", }}>
				<NFTInfoTitle nftName={nftName}/>
				{/* <NFTInfoDetailColumn {...{ CollectionLink, OwnerLink }} nftName={nftName}/> */}
				<NFTInfoDetailColumn 
					CollectionLink={CollectionLink} OwnerLink={OwnerLink} nftName={nftName} 
					infoPropertyLabelStyle={infoPropertyLabelStyle} infoPropertyLinkStyle={infoPropertyLinkStyle}
				/>
			</div>
		</div>
	);

	const refererPath = "/user/myCollection";
	const refererName = `<${nftName}>`;

	const RefererLink = ({ children }) => <SimpleLink to={refererPath} text={children} />;
	
	const CollectionLink = () => <GreenLink to={refererPath} text={refererName} />;

	const authorPath = "";
	const authorName = "AMOS-NFT-Team & Partners";

	const AuthorLink = () => <GreenLink to={authorPath} text={authorName} />;

	const ownerPath = "";  // TODO
	const ownerName = ownerAddress;  // TODO, must be null if there is no owner yet
	const isOwnerYou = false;  // TODO
	const hasOwner = !!ownerName;
	const OwnerLink = hasOwner && (() => <GreenLink to={ownerPath} text={isOwnerYou? "you" : ownerName} />);

	// const [selectedGroupSize, setSelectedGroupSize] = useState(defaultGroupSize);
	// const similarNFTCardData = nftCardDummyData;  // TODO, get data of NFT Card that are similar to current

	if (!metaMaskIsConnected) {
		return <MetaMaskNotConnected connectMetaMask={connectMetaMask}/>;
	}

	return render();
}




