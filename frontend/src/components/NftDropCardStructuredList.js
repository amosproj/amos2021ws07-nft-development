// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021/2022 Dominic Heil <d.heil@campus.tu-berlin.de>

import React, { useEffect, useState } from "react";
import HeaderTypography from "../components/HeaderTypography";
import GroupVerticalSvg from "../assets/img/group-vertical-icon.svg";
import GroupHorizontalIconSvg from "../assets/img/group-horizontal-icon.svg";
import { Divider } from "@mui/material";
import { activeTextColor, textColor, whiteTransparentBackgroundColor } from "../assets/jss/colorPalette";
import Grid from "@mui/material/Grid";
import NftCardHorizontallyScrollableList from "./NftCardHorizontallyScrollableList";
import NftCardVerticallyScrollableList from "./NftDropCardVerticallyScrollableList";
import { useMediaQuery } from "react-responsive";
import appwriteApi from "../api/appwriteApi";
import moment from "moment";
import ethereumContractApi from "../api/ethereumContractApi";

/**
 * Generic component for listing NFTs with a custom header
 * @param topChildren components that are shown above the NFT list as a header
 * @param nftDataArray the data used for the NFT cards
 * @returns {JSX.Element}
 */
export default function NftDropCardStructuredList({ nftDataArray }) {
	const [selectedCategory, setSelectedCategory] = useState("next");
	const [selectedGroupSize, setSelectedGroupSize] = useState("vertical");
	const [selectedData, setSelectedData] = useState([...nftDataArray]);
	const isLarge = useMediaQuery({ query: "(min-width: 500px)" });

	useEffect(() => {
		if (!isLarge){
			setSelectedGroupSize("vertical");
		}
	}, [isLarge]);

	useEffect(() => {
		let filter = "";
		let limit = 10;
		let orderField = "drop_time";
		let orderType = "DESC";
		switch (selectedCategory){
		case "next": default:
			orderField = "drop_time";
			orderType = "ASC";
			filter = ["drop_time>"+Math.floor(moment(Date.now()).valueOf() / 1000)];
			break;
		case "new":
			orderField = "drop_id";
			orderType = "DESC";
			break;
		case "hot":
			orderField = "drop_reserved";
			orderType = "DESC";
			break;
		case "sold":
			// TODO: filter those who dropped
			filter = "";
			break;
		}
		appwriteApi.getDrops(filter, limit, orderField, orderType).then((newDropData) => {
			let filteredDropData = newDropData.documents.map(dropEntry => {
				return {
					title: dropEntry["drop_name"],
					price: dropEntry["drop_price"],
					priceEth: ethereumContractApi.weiToEth(dropEntry["drop_price"]),
					dropTime: dropEntry["drop_time"]*1000,
					nftTotalAvailability: dropEntry["drop_size"],
					nftLeft: dropEntry["drop_size"]-dropEntry["drop_reserved"],
					imgUrl: JSON.parse(dropEntry["drop_uris"])[0],
					description: dropEntry["drop_name"] + " drop.",
					dropId: dropEntry["drop_id"]
				};
			});
			setSelectedData(filteredDropData);
		});
	}, [selectedCategory]);

	return <>
		<Grid container style={{ marginTop: 20, width: "100%" }} >
			<Grid item style={{ width: "100%" }}>
				<div style={{ marginLeft: "auto", marginRight: "auto", display: "block" }}>
					<div style={{ position: "relative" }}>
						<div style={{ position: "absolute", right: 0 }} >
							{isLarge &&
							<Grid container direction="row">
								<img
									src={GroupVerticalSvg} alt="Large Icons" onClick={() => setSelectedGroupSize("vertical")} style={{
										opacity: selectedGroupSize === "vertical" ? "100%" : "30%",
										cursor: "pointer",
										paddingRight: "9px"
									}}
								/>
								<img src={GroupHorizontalIconSvg} alt="Small Icons" onClick={() => setSelectedGroupSize("horizontal")} style={{ opacity: selectedGroupSize === "horizontal" ? "100%" : "30%", cursor: "pointer" }}/>
							</Grid>
							}
						</div>
						<Grid container direction="row">
							<Grid item>
								<HeaderTypography
									onClick={() => setSelectedCategory("next")}
									style={{ fontSize: "18px", borderBottom: selectedCategory === "next" ? `3px solid ${activeTextColor}`:"none", paddingBottom: "11px", color: textColor, fontWeight: "bold", cursor: "pointer", opacity: selectedCategory === "next" ? 1 : 0.7 }}
								>Next</HeaderTypography>
							</Grid>
							<Grid item style={{ width: "38px" }}/>
							<Grid item>
								<HeaderTypography
									onClick={() => setSelectedCategory("new")}
									style={{ fontSize: "18px", borderBottom: selectedCategory === "new" ? `3px solid ${activeTextColor}`:"none", paddingBottom: "11px", color: textColor, fontWeight: "bold", cursor: "pointer", opacity: selectedCategory === "new" ? 1 : 0.7 }}
								>New</HeaderTypography>
							</Grid>
							<Grid item style={{ width: "38px" }}/>
							<Grid item>
								<HeaderTypography
									onClick={() => setSelectedCategory("hot")}
									style={{ fontSize: "18px", borderBottom: selectedCategory === "hot" ? `3px solid ${activeTextColor}`:"none", paddingBottom: "11px", color: textColor, fontWeight: "bold", cursor: "pointer", opacity: selectedCategory === "hot" ? 1 : 0.7 }}
								>Hot</HeaderTypography>
							</Grid>
							<Grid item style={{ width: "38px" }}/>
							<Grid item>
								<HeaderTypography
									onClick={() => setSelectedCategory("sold")}
									style={{ fontSize: "18px", borderBottom: selectedCategory === "sold" ? `3px solid ${activeTextColor}`:"none", paddingBottom: "11px", color: textColor, fontWeight: "bold", cursor: "pointer", opacity: selectedCategory === "sold" ? 1 : 0.7 }}
								>Sold</HeaderTypography>
							</Grid>
						</Grid>
					</div>
					<Divider style={{ backgroundColor: whiteTransparentBackgroundColor, width: "100%", height: "0.2px", marginBottom: "20px", marginTop: "-2px" }}/>
					{
						selectedGroupSize === "vertical"
							?
							<NftCardHorizontallyScrollableList cardData={selectedData}/>
							:
							<NftCardVerticallyScrollableList cardData={selectedData}/>
					}
				</div>
			</Grid>
		</Grid>


	</>;
}