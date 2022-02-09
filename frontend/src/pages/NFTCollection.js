// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Felix Steinkohl <steinkohl@campus.tu-berlin.de>
// SPDX-FileCopyrightText: 2022 Dominic Heil <d.heil@campus.tu-berlin.de>

import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import HeaderTypography from "../components/HeaderTypography";
import ParagraphTypography from "../components/ParagraphTypography";
import { Box } from "@mui/material";

import NftCardStructuredList from "../components/NftCardStructuredList";
import ethereumContractApi from "../api/ethereumContractApi";
import ConnectWalletButton from "../components/ConnectWalletButton";
import Loading from "../components/Loading";
import { semiTransparentDividerColor, whiteTransparentBackgroundColor } from "../assets/jss/colorPalette";
import { ethereumIcon, sampleUserImg } from "../assets/jss/imagePalette";

const EthereumIcon = () => <img src={ethereumIcon} alt="ETH" style={{ marginBottom: "1px" }}/>;

export default function NftCollection({ user }) {
	const [metaMaskIsConnected, setMetaMaskIsConnected] = useState(false);
	const [nftCollectionData, setNftCollectionData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (ethereumContractApi.selectedAccount !== null) {
			setMetaMaskIsConnected(true);
		}
	}, []);

	const connectMetaMask = () => ethereumContractApi.init().then(() => {
		setMetaMaskIsConnected(true);
	});

	useEffect(() => {
		if (metaMaskIsConnected){
			ethereumContractApi.getNftsOfConnectedAddress().then(async (nftList) => {
				let formattedData = [];
				for (let nftAddress of nftList) {
					let uri = await ethereumContractApi.getUriOfNft(nftAddress);
					let name = await ethereumContractApi.getNameOfNft(nftAddress);
					formattedData.push(
						{
							title: name,
							price: "",
							nftPageUrl: "/info?nftToken=" + nftAddress,
							imgUrl: uri,
							buttonText: "Show info",
							description: `This NFT is part of a drop that provides images of culture within the area of ${name}.`
						}
					);
				}
				setNftCollectionData(formattedData);
				setIsLoading(false);
			});
		}
	}, [metaMaskIsConnected]);


	let topPartOfPage = (
		<Box>
			<HeaderTypography style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "20px" }}>Your NFT Collection</HeaderTypography>
			<Grid container spacing={2}  alignItems="center" justifyContent="center" direction="column">
				<Grid item style={{ width: "143px", height: "143px", backgroundColor: whiteTransparentBackgroundColor, padding: 0, borderRadius: "100%" }}>
					<div style={{ backgroundImage: `url(${sampleUserImg})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", width: "100%", height: "100%" }}/>
				</Grid>
				<Grid item style={{ paddingLeft: 0 }}>
					<ParagraphTypography style={{ fontWeight: "bold", fontSize: "24px" }}>
						{user.name}
					</ParagraphTypography>
				</Grid>
				<Grid item style={{ paddingLeft: 0 }}>
					<Grid container direction="row" spacing={3}>
						<Grid item>
							<Grid container direction="column" alignItems="center" justifyContent="center">
								<Grid item>
									<ParagraphTypography style={{ fontSize: "26px", fontWeight: "bold" }}>
										{nftCollectionData.length}
									</ParagraphTypography>
								</Grid>
								<Grid item >
									<ParagraphTypography style={{ fontSize: "14px" }}>
										{nftCollectionData.length === 1 ?
											"item": "items"
										}
									</ParagraphTypography>
								</Grid>
							</Grid>
						</Grid>
						<Grid item>
							<div style={{ height: "24px", width: "2px", backgroundColor: semiTransparentDividerColor, marginTop: "7px" }}/>
						</Grid>
						<Grid item>
							<Grid container direction="column" alignItems="center" justifyContent="center">
								<Grid item>
									<ParagraphTypography style={{ fontSize: "26px", fontWeight: "bold" }}>
										<EthereumIcon /> -
									</ParagraphTypography>
								</Grid>
								<ParagraphTypography style={{ fontSize: "14px" }}>
									equity
								</ParagraphTypography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<div style={{ marginTop: "44px" }}/>
		</Box>
	);

	if (!metaMaskIsConnected) {
		return (
			<Grid container style={{ marginTop: 20, width: "100%" }} >
				<Grid item style={{ width: "100%" }}>
					<div style={{ marginLeft: "auto", marginRight: "auto", display: "block" }}>
						{topPartOfPage}
					</div>
				</Grid>
				<Grid item style={{ width: "100%" }}>
					<Grid container alignItems="center" justifyContent="center">
						<ConnectWalletButton onClick={connectMetaMask}/>
					</Grid>
				</Grid>
			</Grid>
		);
	}

	if (isLoading){
		return (
			<Grid container style={{ marginTop: 20, width: "100%" }} >
				<Grid item style={{ width: "100%" }}>
					<div style={{ marginLeft: "auto", marginRight: "auto", display: "block" }}>
						{topPartOfPage}
					</div>
				</Grid>
				<Loading/>
			</Grid>
		);
	}

	return <NftCardStructuredList nftDataArray={nftCollectionData} topChildren={topPartOfPage}/>;
}