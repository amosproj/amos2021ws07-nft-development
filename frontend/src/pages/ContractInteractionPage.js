// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import CenterFlexBox from "../components/CenterFlexBox";
import RoundedEdgesButton from "../components/RoundedEdgesButton";
import ethereumContractApi from "../api/ethereumContractApi";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { inputFieldStyle } from "../assets/jss/InputFieldJSS";
import * as React from "react";
import ParagraphTypography from "../components/ParagraphTypography";

export default function ContractInteractionPage() {

	const [balance, setBalance]	= useState(null);
	const [address, setAddress]	= useState("");
	const [methods, setMethods]	= useState([]);
	const [dropTime, setDropTime]	= useState("");
	const [numberOfNFTsToCreate, setNumberOfNFTsToCreate] = useState("");
	const [numberOfNFTsToBuy, setNumberOfNFTsToBuy] = useState("");
	const [droptime, setDroptime] = useState("");
	const [dropHash, setDropHash] = useState("");
	const [nftHash, setNftHash] = useState("");
	const [ownedNftIndex, setOwnedNftIndex] = useState("");

	const [createDropResult, setCreateDropResult] = useState("");
	const [joinDropResult, setJoinDropResult] = useState("");
	const [dropDropResult, setDropDropResult] = useState("");
	const [buyNftResult, setBuyNftResult] = useState("");
	const [realNftIndex, setRealNftIndex] = useState("");



	return <CenterFlexBox>
		<RoundedEdgesButton style={{ backgroundColor: "blue" }} onClick={() => ethereumContractApi.init()}>Initialize connections</RoundedEdgesButton>
		<RoundedEdgesButton style={{ backgroundColor: "blue" }} onClick={async () => setBalance(await ethereumContractApi.getBalanceOfSelectedAddress())}>Get Balance balance</RoundedEdgesButton>
		{(balance/1000000000000000000).toFixed(9)}
		<RoundedEdgesButton style={{ backgroundColor: "blue" }} onClick={async () => setAddress(await ethereumContractApi.getSelectedAddress())}>Get selected address</RoundedEdgesButton>
		{address}
		<RoundedEdgesButton style={{ backgroundColor: "blue" }} onClick={async () => setDropTime(JSON.stringify(await ethereumContractApi.getDropTime(parseInt(dropHash))))}>Get Droptime (enter drop hash below)</RoundedEdgesButton>
		time: {dropTime}
		<RoundedEdgesButton style={{ backgroundColor: "blue" }} onClick={async () => setMethods(await ethereumContractApi.getMethods())}>Get all methods of contract</RoundedEdgesButton>
		<ul>
			{methods.map((e, i) => <li key={i}>{e}</li>)}
		</ul>
		<TextField sx = {{ ...inputFieldStyle, paddingBottom: "20px" }} id="outlined-multiline-flexible" label="Drop hash number" value={dropHash} onChange={event => setDropHash(event.target.value)} />
		<TextField sx = {{ ...inputFieldStyle, paddingBottom: "20px" }} id="outlined-multiline-flexible" label="Number of NFTs to join drop for" value={numberOfNFTsToBuy} onChange={event => setNumberOfNFTsToBuy(event.target.value)} />
		<TextField sx = {{ ...inputFieldStyle, paddingBottom: "20px" }} id="outlined-multiline-flexible" label="Droptime" value={droptime} onChange={event => setDroptime(event.target.value)} />
		<TextField sx = {{ ...inputFieldStyle, paddingBottom: "20px" }} id="outlined-multiline-flexible" label="Number of NFTs to create" value={numberOfNFTsToCreate} onChange={event => setNumberOfNFTsToCreate(event.target.value)} />
		<TextField sx = {{ ...inputFieldStyle, paddingBottom: "20px" }} id="outlined-multiline-flexible" label="NFT hash to buy" value={nftHash} onChange={event => setNftHash(event.target.value)} />
		<TextField sx = {{ ...inputFieldStyle, paddingBottom: "20px" }} id="outlined-multiline-flexible" label="Get index (0,1,2...) of owned NFT" value={ownedNftIndex} onChange={event => setOwnedNftIndex(event.target.value)} />

		<ParagraphTypography>Create a new drop for the above specified amount of NFTs to create for a specified drop time.</ParagraphTypography>

		<RoundedEdgesButton
			style={{ backgroundColor: "blue" }} onClick={async () => {
				let numberOfNFTsToCreateNum = parseInt(numberOfNFTsToCreate);
				if (isNaN(numberOfNFTsToCreateNum)) {
					setCreateDropResult("Number of NFTs to create not formatted correctly.");
					return;
				}
				let droptimeNum = parseInt(droptime);
				if (isNaN(droptimeNum)) {
					setCreateDropResult("Drop time not formatted correctly.");
					return;
				}

				setCreateDropResult("Sending request to the blockchain ...");

				ethereumContractApi.createDrop( droptimeNum, numberOfNFTsToCreateNum,tx => {
					console.log(tx);
					setCreateDropResult("Successfully created the new drop.");
				}, (err, tx) => {
					console.log(err, tx);
					setCreateDropResult("There was an error while trying to create a new drop.");
				});
			}}
		>Create Drop</RoundedEdgesButton>
		{createDropResult}

		<ParagraphTypography>Join a drop for the above specified amount of NFTs.</ParagraphTypography>

		<RoundedEdgesButton
			style={{ backgroundColor: "blue" }} onClick={async () => {
				let numberOfNFTsToBuyNum = parseInt(numberOfNFTsToBuy);
				let dropHashNum = parseInt(dropHash);
				if (isNaN(numberOfNFTsToBuyNum)) {
					setJoinDropResult("Number of NFTs to buy not formatted correctly.");
					return;
				}
				if (isNaN(dropHashNum)) {
					setJoinDropResult("Drop hash not formatted correctly.");
					return;
				}
				setJoinDropResult("Sending request to the blockchain ...");
				ethereumContractApi.joinDrop(dropHashNum, numberOfNFTsToBuyNum,tx => {
					console.log(tx);
					setJoinDropResult("Successfully joined the drop.");
				}, (err, tx) => {
					console.log(err, tx);
					setJoinDropResult("There was an error while trying to join the drop.");
				});
			}}
		>Join Drop</RoundedEdgesButton>
		{joinDropResult}

		<ParagraphTypography>Drop a specified drop. I.e. reserve NFTs to users that joined the drop.</ParagraphTypography>

		<RoundedEdgesButton
			style={{ backgroundColor: "blue" }} onClick={async () => {
				let dropHashNum = parseInt(dropHash);
				if (isNaN(dropHashNum)) {
					setDropDropResult("Drop hash not formatted correctly.");
					return;
				}
				setDropDropResult("Sending request to the blockchain ...");
				ethereumContractApi.dropDrop(dropHashNum, tx => {
					console.log(tx);
					setDropDropResult("Successfully dropped the drop.");
				}, (err, tx) => {
					console.log(err, tx);
					setDropDropResult("There was an error while trying drop a drop.");
				});
			}}
		>Drop Drop</RoundedEdgesButton>
		{dropDropResult}

		<ParagraphTypography>Enter real NFT hash of an NFT you got assigned to during the drop to buy it. Cost: 0.01ETH</ParagraphTypography>

		<RoundedEdgesButton
			style={{ backgroundColor: "blue" }} onClick={async () => {
				let dropHashNum = parseInt(dropHash);
				if (isNaN(dropHashNum)) {
					setBuyNftResult("Drop hash not formatted correctly.");
					return;
				}
				let nftHashNum = parseInt(nftHash);
				if (isNaN(nftHashNum)) {
					setBuyNftResult("NFT hash not formatted correctly.");
					return;
				}
				setBuyNftResult("Sending request to the blockchain ...");
				ethereumContractApi.buyNFT("10000000000000000", "10000000000000000", nftHashNum, dropHashNum, tx => {
					console.log(tx);
					setBuyNftResult("Successfully bought the NFT.");
				}, (err, tx) => {
					console.log(err, tx);
					setBuyNftResult("There was an error while trying buy the NFT.");
				});
			}}
		>Buy NFTs</RoundedEdgesButton>
		{buyNftResult}

		<ParagraphTypography>Enter Index of owned NFTs to get actual NFT index. If a real number gets returned, you own the NFT.</ParagraphTypography>


		<RoundedEdgesButton
			style={{ backgroundColor: "blue" }} onClick={async () => {
				let ownedNftIndexNum = parseInt(ownedNftIndex);
				if (isNaN(ownedNftIndexNum)) {
					setRealNftIndex("Owned NFT index not formatted correctly.");
					return;
				}
				setRealNftIndex("Sending request to the blockchain ...");
				ethereumContractApi.getNftIndexOfOwnedNft(ownedNftIndexNum).then(r => setRealNftIndex(r));
			}}
		>Get real NFT index of owned NFTs.</RoundedEdgesButton>
		{realNftIndex}



	</CenterFlexBox>;

}
