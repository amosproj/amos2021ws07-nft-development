// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>
// SDPX-FileCopyrightText: 2022 Que Le <b.le@tu-berlin.de>

import React, { useEffect, useRef, useState } from "react";
import { zeroPad } from "react-countdown";
import HeaderTypography from "../components/HeaderTypography";
import ParagraphTypography from "../components/ParagraphTypography";
import {
	activeTextColor, countdownBackgroundColor, countdownBorderColor,
	dropPageBannerSemiTransparentBackgroundColor,
	semiTransparentTextColor
} from "../assets/jss/colorPalette";
import Grid from "@mui/material/Grid";
import Countdown from "react-countdown";
import TextField from "@mui/material/TextField";
import { inputFieldStyle } from "../assets/jss/InputFieldJSS";
import RoundedEdgesButton from "../components/RoundedEdgesButton";
import ethereumContractApi from "../api/ethereumContractApi";
import moment from "moment";
import { textFont } from "../assets/jss/fontPalette";
import { dropBannerImg } from "../assets/jss/imagePalette";
import EthereumIcon from "./EthereumIcon";
// import { countdownTimeRenderer } from "./NftDropPage";

export const countdownTimeRenderer = ({ days, hours, minutes, seconds, completed }) => {
	if (completed) {
		// Render a completed state
		return <div style={{ paddingTop: "3px" }}>dropped</div>;
	} else {
		// Render a countdown
		return <div style={{ paddingTop: "3px" }}>{zeroPad(days)}d {zeroPad(hours)}h {zeroPad(minutes)}m {zeroPad(seconds)}s</div>;
	}
};

/**
 * Banner for NFT drop
 * @param dropData data for drop
 * @returns {JSX.Element}
 */
export default function NftDropBanner({ dropData }) {
	// TODO: make dynamic once we have real data
	const containerStyle = ({ minHeight: "305px", marginBottom: "30px" });
	const backgroundImageStyle = ({ padding: "10px", borderRadius: "15px", backgroundImage: `url(${dropBannerImg})`, backgroundSize: "cover", backgroundPosition: "center", alignItems: "center", justifyContent: "center", textAlign: "center", });
	const countdownRef = useRef();

	const [isConnectedToMetaMask, setIsConnectedToMetaMask] = useState(false);
	const [amountNfts, setAmountNfts] = useState(0);
	const [joinedMessage, setJoinedMessage] = useState("");
	const [now, setNow] = useState(Math.floor(moment(Date.now()).valueOf() / 1000));
	const [numReservedNFTsOfUser, setNumReservedNFTsOfUser] = useState(0);

	const [isDropStillActive, setIsDropStillActive] = useState(dropData.dropTime / 1000 > now);

	useEffect(() => {
		countdownRef.current.getApi().start();
	});

	useEffect(() => {
		setIsDropStillActive(dropData.dropTime / 1000 > now);
	}, [dropData, now]);

	useEffect(() => {
		if (isConnectedToMetaMask) {
			ethereumContractApi.getReservedNFTsCount(dropData["dropId"]).then(numReservedNFTs => {
				setNumReservedNFTsOfUser(numReservedNFTs);
			});
		}
	}, [isConnectedToMetaMask]);

	let buttonText = "Join Drop!";
	let buttonStyle = {};
	let buttonAction;

	if (isDropStillActive) {
		if (dropData.nftLeft > 0) {
			buttonText = "Join drop!";
			buttonStyle = { backgroundColor: activeTextColor };
			buttonAction = () => {
				ethereumContractApi.init().then(() => {
					setIsConnectedToMetaMask(true);
					setJoinedMessage("Sending transaction to blockchain...");
					ethereumContractApi.joinDrop(dropData.dropId, amountNfts, () => {
						setJoinedMessage("Joined drop for " + amountNfts + " NFTs.");
					}, () => { });
				});
			};
			// join drop
		} else {
			buttonText = "Drop full!";
			buttonStyle = { backgroundColor: "red" };
			// Drop full
		}
	} else {
		// connect metaMask
		if (!isConnectedToMetaMask) {
			buttonText = "Connect MetaMask";
			buttonStyle = { backgroundColor: activeTextColor };
			buttonAction = () => {
				ethereumContractApi.init().then(() => {
					setIsConnectedToMetaMask(true);
				});
			};
		} else {
			// TODO: change below to check if current user is allowed to buy NFTs, current condition is only to pass eslinting
			if (numReservedNFTsOfUser > 0) {
				// TODO: Display how many NFTs can NFTs can be bought by user
				buttonText = "Buy NFTs!";
				buttonStyle = { backgroundColor: "activeTextColor" };
				buttonAction = () => {
					setJoinedMessage("Sending transaction to blockchain...");
					ethereumContractApi.buyNFT(numReservedNFTsOfUser * dropData.price, dropData.dropId,
						() => {
							setJoinedMessage("Purchased NFTs successfully!");
						}, () => {
							setJoinedMessage("Was not able to purchase NFTs!");
						});
				};
			} else {
				buttonText = "Drop done!";
				buttonStyle = { backgroundColor: "red", cursor: "default" };
			}
			// nothing to do
		}
	}

	return (
		<div style={containerStyle}>
			<div style={backgroundImageStyle}>
				<Grid container item justifyItems="center" alignItems="center" direction="column" style={{ width: "100%", height: "100%", margin: 0 }}>
					<Grid item style={{ maxWidth: "700px", backgroundColor: dropPageBannerSemiTransparentBackgroundColor, borderRadius: "20px", padding: "10px" }}>
						<Grid container item justifyItems="center" alignItems="center" direction="column" style={{ paddingBottom: "10px", width: "100%", height: "100%" }}>
							<HeaderTypography style={{ fontSize: "37px", fontWeight: "bold" }}>
								{dropData.title}
							</HeaderTypography>
							<ParagraphTypography style={{ marginTop: "15px", fontSize: "22px", color: semiTransparentTextColor }}>
								This NFT drop provides {dropData.nftTotalAvailability} images of culture within the area of {dropData.title}.
							</ParagraphTypography>
							<div style={{ marginTop: "35px", maxWidth: "255px", minWidth: "235px", paddingLeft: "7px", paddingRight: "7px", paddingBottom: "6px", fontSize: "28px", fontFamily: textFont, backgroundColor: countdownBackgroundColor, border: `1px solid ${countdownBorderColor}`, borderRadius: "10px" }}>
								<Countdown
									ref={countdownRef} date={new Date(dropData.dropTime || 0)} renderer={countdownTimeRenderer} onComplete={() => {
										setNow(Math.floor(moment(Date.now()).valueOf() / 1000));
									}}
								/>
							</div>

							<Grid item>
								<Grid container direction="row" justifyContent="center" alignItems="center">
									<Grid item style={{ marginTop: "6px" }}>
										<Grid container item direction="row">
											{!isDropStillActive && numReservedNFTsOfUser > 0 ?
												<>{numReservedNFTsOfUser}&nbsp;x&nbsp;</> : <></>}
											<EthereumIcon />
											<ParagraphTypography style={{ marginRight: "8px" }}>
												{dropData.priceEth}</ParagraphTypography>
										</Grid>
									</Grid>
									<TextField
										sx={{ ...inputFieldStyle }} style={{ width: "172px" }} margin="normal" id="amount" label="Amount" name="amount" autoFocus size="small" type="number" value={amountNfts} onChange={(e) => {
											let numWishedNfts = +e.target.value;
											if (numWishedNfts < 1) {
												setAmountNfts(1);
											} else if (numWishedNfts > Math.max(1, Math.floor(dropData.nftTotalAvailability / 20))) {
												setAmountNfts(Math.max(1, Math.floor(dropData.nftTotalAvailability / 20)));
											} else {
												setAmountNfts(numWishedNfts);
											}
										}} 
									/>
									<RoundedEdgesButton style={{ ...buttonStyle, marginLeft: "9.5px", height: "40px", marginTop: "10px" }} onClick={buttonAction}>{buttonText}</RoundedEdgesButton>
								</Grid>
							</Grid>
							{joinedMessage !== "" && <ParagraphTypography style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "10px", marginTop: "5px" }}>{joinedMessage}</ParagraphTypography>}
							{isDropStillActive && <ParagraphTypography style={{ fontSize: "11px", fontWeight: "bold" }}>left: {dropData.nftLeft} / {dropData.nftTotalAvailability}</ParagraphTypography>}
							{(!isDropStillActive && isConnectedToMetaMask) ?
								numReservedNFTsOfUser > 0 ?
									<ParagraphTypography style={{ fontSize: "11px", marginTop: "20px" }}> You reserved <b>{numReservedNFTsOfUser}</b> NFTs!</ParagraphTypography>
									:
									<ParagraphTypography style={{ fontSize: "11px", marginTop: "20px" }}> You reserved <b>no</b> NFTs in this drop!</ParagraphTypography>
								:
								<></>}
							<ParagraphTypography style={{ fontSize: "11px", marginTop: "20px" }}> by AMOS-NFT-Team</ParagraphTypography>
						</Grid>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}
