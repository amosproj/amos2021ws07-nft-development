// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import RoundedEdgesButton from "../components/RoundedEdgesButton";
import ethereumContractApi from "../api/ethereumContractApi";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { inputFieldStyle } from "../assets/jss/InputFieldJSS";
import * as React from "react";
import ParagraphTypography from "../components/ParagraphTypography";
import CenterFlexBoxMedium from "../components/CenterFlexBoxMedium";
import HeaderTypography from "../components/HeaderTypography";
import { Box, Dialog, DialogContent, DialogTitle, FormGroup, Switch } from "@mui/material";
import Grid from "@mui/material/Grid";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterMoment from "@mui/lab/AdapterMoment";
import { LocalizationProvider } from "@mui/lab";
import { activeTextColor, backgroundColor, textColor } from "../assets/jss/colorPalette";
import FormControlLabel from "@mui/material/FormControlLabel";
import moment from "moment";
import ConditionalAlert from "../components/ConditionalAlert";
import CloseIcon from "@mui/icons-material/Close";

const CREATE_DROP_DATA_DEFAULT = {
	formattedDropTime: 0,
	unformattedDropTime: "",
	formattedUriList: [],
	formattedNftPrice: 2100,
	newNftName: "",
	newNftTokenName: "",
	unformattedNftPrice: 1.0
};

/**
 * Page used to create a new drop.
 * @returns {JSX.Element}
 * @constructor
 */
export default function CreateDropPage() {
	const [createDropResult, setCreateDropResult] = useState("");
	const [confirmDropCreateDialogIsOpen, setConfirmDropCreateDialogIsOpen] = useState(false);
	const [createDropData, setCreateDropData] = useState(CREATE_DROP_DATA_DEFAULT);
	const [newDropTimeDate, setNewDropTimeDate] = React.useState(Date.now());

	const handleCreateNewDrop = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		let newNftName = data.get("newNftName");
		let newNftTokenName = data.get("newNftTokenName");
		let newNftPrice = data.get("newNftPrice");
		let nftUriList = data.get("nftUriList");
		let formattedNftPrice;
		try {
			formattedNftPrice = ethereumContractApi.ethToWei(newNftPrice);
		} catch (E) {
			setCreateDropResult("NFT price is formatted incorrectly.");
			return;
		}
		let formattedUriList = nftUriList.split("\n").map(element => element.trim()).filter(element => element.length > 0);
		if (formattedUriList.length === 0){
			setCreateDropResult("No NFT URIs specified. Enter at least one NFT URI.");
			return;
		}
		let formattedDropTime = moment(newDropTimeDate).valueOf();
		if (newNftTokenName.length > 11) {
			setCreateDropResult("NFT token name is too long. Enter 1-11 characters as a token name.");
			return;
		}
		if (newNftTokenName.length === 0) {
			setCreateDropResult("NFT token name is too short. Enter 1-11 characters as a token name.");
			return;
		}
		if (formattedUriList.length === 0) {
			setCreateDropResult("No NFT URIs entered.");
		}

		setCreateDropResult("Sending request to the blockchain ...");
		setCreateDropData({
			formattedDropTime: formattedDropTime/1000,
			formattedUriList: formattedUriList,
			formattedNftPrice: formattedNftPrice,
			newNftName: newNftName,
			newNftTokenName: newNftTokenName,
			unformattedNftPrice: newNftPrice,
			unformattedDropTime: newDropTimeDate
		});
		setConfirmDropCreateDialogIsOpen(true);
	};

	return <CenterFlexBoxMedium>
		<HeaderTypography style={{ fontSize: "26px", paddingBottom: "16px" }}>Create new drop</HeaderTypography>

		<ParagraphTypography style={{ paddingBottom: "24px" }}>
			Enter the required information below, press continue, confirm the entered data and pay the required fee in MetaMask to create a new drop.
		</ParagraphTypography>

		<Box component="form" onSubmit={handleCreateNewDrop} noValidate sx={{ mt: 1 }}>
			<Grid container direction="column" justifyContent="left" alignContent="left">
				<ParagraphTypography>Enter the name of every new NFT in the drop. </ParagraphTypography>
				<TextField sx = {{ ...inputFieldStyle, paddingBottom: "20px"  }} margin="normal" required fullWidth id="newNftName" label="NFT name" name="newNftName" autoFocus />

				<ParagraphTypography>Enter NFT token name of every new NFT in the drop. Must be at most 11 characters long.</ParagraphTypography>
				<TextField sx = {{ ...inputFieldStyle, paddingBottom: "20px"  }} margin="normal" required fullWidth id="newNftTokenName" label="NFT token name" name="newNftTokenName" autoFocus />

				<ParagraphTypography>Enter the price of every new NFT in the drop in ETH. </ParagraphTypography>
				<TextField sx = {{ ...inputFieldStyle, paddingBottom: "20px"  }} margin="normal" required fullWidth id="newNftPrice" label="New NFT price (ETH)" name="newNftPrice" autoFocus />

				<ParagraphTypography style={{ paddingBottom: "20px" }}>Select the time at which the drop will be dropped. </ParagraphTypography>
				<LocalizationProvider dateAdapter={AdapterMoment} style={{ paddingBottom: "20px" }}>
					<DateTimePicker
						ampm={false}
						margin="normal"
						renderInput={(props) => <TextField id="asd" {...props} sx={{ ...inputFieldStyle, color: "white" }}/>}
						label="Drop date & time"
						value={newDropTimeDate}
						onChange={(newValue) => {
							setNewDropTimeDate(newValue);
						}}
					/>
				</LocalizationProvider>

				<ParagraphTypography style={{ paddingTop: "20px" }}>Enter the URIs of the new NFTs. Enter exactly one URI per line. The number of URIs determines the number of NFTs in the drop. </ParagraphTypography>
				<TextField multiline rows={20} sx = {{ ...inputFieldStyle, paddingBottom: "20px"  }} margin="normal" required fullWidth id="nftUriList" label="NFT image URIs" name="nftUriList" autoFocus />

				<ConditionalAlert text={createDropResult} severity="error"/>
				<div style={{ overflowX: "none", display: "flex", justifyContent: "right", paddingTop: "18px", paddingBottom: "18.5px" }}>
					<RoundedEdgesButton type="submit" fullWidth variant="contained" style={{ backgroundColor: activeTextColor, width: "200px" }}>
						Confirm entered data
					</RoundedEdgesButton>
				</div>

			</Grid>
		</Box>

		<ConfirmCreateDropDialog createDropData={createDropData} open={confirmDropCreateDialogIsOpen} setOpen={setConfirmDropCreateDialogIsOpen} setCreateDropResult={setCreateDropResult}/>
	</CenterFlexBoxMedium>;

}

const Row = ({ index, text }) => (
	<div style={{ backgroundColor: index%2===0? "grey":"darkGray" }}>{text}</div>
);


const ConfirmCreateDropDialog = ({ createDropData, open, setOpen, setCreateDropResult }) => {
	const [isChecked, setIsChecked] = useState(false);
	const [isMetaMaskConnected, setisMetaMaskConnected] = useState(false);

	const handleConfirmedDropCreation = (event) => {
		event.preventDefault();
		ethereumContractApi.createDrop( createDropData.formattedDropTime, createDropData.formattedUriList, createDropData.formattedNftPrice, createDropData.newNftName, createDropData.newNftTokenName,tx => {
			console.log(tx);
			setCreateDropResult("Successfully created the new drop.");
		}, (err, tx) => {
			console.log(err, tx);
			setCreateDropResult("There was an error while trying to create a new drop.");
		});
	};

	return <Dialog open={open} keepMounted fullScreen scroll="body">
		<div style={{ backgroundColor: backgroundColor, minHeight: "100vh", width: "100%", color:"white" }} >
			<DialogTitle textAlign="right" style={{ paddingRight: "18px", paddingTop: "18px" }}><CloseIcon onClick={() => setOpen(old => !old)} style={{ color: textColor }}/></DialogTitle>
			<Grid container style={{ width: "min(100vw, 600px)", paddingBottom: "50px" }} justifyContent="right" margin="auto">
				<DialogContent style={{ marginTop: "10px", textAlign: "center" }}>
					<HeaderTypography style={{ fontSize: "26px", paddingBottom: "15px" }}>Confirm the creation of the drop</HeaderTypography>
					<Grid container direction="column" justifyContent="center" alignContent="center">
						<Grid item style={{ paddingBottom: "40px" }}>
							<ParagraphTypography>
								Please check if the provided information is correct and confirm below if you want to create the drop.
								If you want to make changes to the information, just close this dialog, change any value and press &quot;Confirm&quot; again.
							</ParagraphTypography>
						</Grid>
						<Grid item style={{ paddingBottom: "20px" }}>
							<ParagraphTypography >
								The NFTs will have the name
							</ParagraphTypography>
							<div style={{ color: activeTextColor, backgroundColor: "#505050", marginTop: "10px" }}>{createDropData.newNftName}</div>
						</Grid>
						<Grid item style={{ paddingBottom: "20px" }}>
							<ParagraphTypography>
								The NFTs will have the token/symbol name
							</ParagraphTypography>
							<div style={{ color: activeTextColor, backgroundColor: "#505050", marginTop: "10px" }}>{createDropData.newNftName}</div>
						</Grid>
						<Grid item style={{ paddingBottom: "20px" }}>
							<ParagraphTypography>
								The NFTs will have the price
							</ParagraphTypography>
							<div style={{ color: activeTextColor, backgroundColor: "#505050", marginTop: "10px" }}>{createDropData.unformattedNftPrice} ETH ({createDropData.formattedNftPrice} WEI)</div>
						</Grid>
						<Grid item style={{ paddingBottom: "20px" }}>
							<ParagraphTypography>
								The drop time of the NFTs will be
							</ParagraphTypography>
							<div style={{ color: activeTextColor, backgroundColor: "#505050", marginTop: "10px" }}>{createDropData.unformattedDropTime.toString()} (unix-timestamp: {createDropData.formattedDropTime})</div>
						</Grid>
						<Grid item style={{ paddingBottom: "20px" }}>
							<ParagraphTypography>
								The following number of new NFTs will be created during the drop
							</ParagraphTypography>
							<div style={{ color: activeTextColor, backgroundColor: "#505050", marginTop: "10px" }}>{createDropData.formattedUriList.length}</div>
						</Grid>
						<Grid item>
							<ParagraphTypography>The following image URIs will be used for the NFT creation</ParagraphTypography>
							<div style={{ minHeight: "100px", maxHeight: "400px", maxWidth: "min(100vw, 600px)", overflowY: "scroll", overflowX: "scroll", backgroundColor: "gray", marginTop: "10px" }}>
								{createDropData.formattedUriList.map((uriItem, index)=> <Row text={uriItem} index={index} key={index}/>)}
							</div>
						</Grid>
						<Grid item style={{ paddingTop: "30px", paddingBottom: "10px" }}>
							<ParagraphTypography>
								If all the information is correct, toggle the switch below, connect MetaMask and click the button to create the drop.
								After clicking the button, MetaMask will ask you to pay a fee to send the new drop to the blockchain.
							</ParagraphTypography>
						</Grid>
						<Grid item style={{ position: "relative" }} component="form" onSubmit={handleConfirmedDropCreation}>
							<FormGroup>
								<FormControlLabel
									style={{ paddingBottom: "20px" }}
									control={ <Switch checked={isChecked} onChange={() => setIsChecked(old => !old)} /> }
									label="Are you sure you want to create the drop?"
								/>
								<div style={{ position: "relative", height: "40px", width: "100%" }}>
									<RoundedEdgesButton style={{ backgroundColor: "blue", width: "200px", position: "absolute", left: 0 }} onClick={() => ethereumContractApi.init().then(address => setisMetaMaskConnected(address !== null && address !== ""))}>
										Connect MetaMask
									</RoundedEdgesButton>
									<RoundedEdgesButton type="submit" fullWidth variant="contained" style={{ backgroundColor: (isChecked && isMetaMaskConnected)?activeTextColor:"gray", width: "200px", position: "absolute", right: 0 }} disabled={!(isChecked && isMetaMaskConnected)}>
										Create drop
									</RoundedEdgesButton>
								</div>
							</FormGroup>
						</Grid>
					</Grid>
				</DialogContent>
			</Grid>
		</div>
	</Dialog>;

};