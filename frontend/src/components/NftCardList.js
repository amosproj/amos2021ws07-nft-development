// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import React, { useEffect, useRef, useState } from "react";
import HeaderTypography from "../components/HeaderTypography";
import GroupLargeIconSvg from "../assets/img/group-large-icon.svg";
import GroupSmallIconSvg from "../assets/img/group-small-icon.svg";
import { Divider } from "@mui/material";
import { activeTextColor, textColor } from "../assets/jss/colorPalette";
import Grid from "@mui/material/Grid";
import NftCard from "../components/NftCard";
import { useContainerDimensions } from "../hooks/useContainerDimensions";

/**
 * Generic component for listing NFTs with a custom header
 * @param topChildren components that are shown above the NFT list as a header
 * @param nftDataArray the data used for the NFT cards
 * @returns {JSX.Element}
 */
export default function NftCardList({ topChildren, nftDataArray }) {
	const [selectedCategory, setSelectedCategory] = useState("newest");
	const [selectedGroupSize, setSelectedGroupSize] = useState("large");
	const [newestData, setNewestData] = useState([...nftDataArray]);
	const [cheapestData, setCheapestData] = useState([...nftDataArray]);
	const [selectedData, setSelectedData] = useState([...nftDataArray]);
	const componentRef = useRef();
	const { width } = useContainerDimensions(componentRef);

	useEffect(() => {
		let newData = [...nftDataArray];
		setNewestData([...nftDataArray]);
		newData.sort(function(a, b) {
			if (a.price < b.price) return -1;
			if (a.price > b.price) return 1;
			return 0;
		});
		setCheapestData(newData);
	}, [nftDataArray]);

	useEffect(() => {
		setSelectedData(selectedCategory === "newest" ? newestData : cheapestData);
	});

	let mainComponentWidth;
	if (width >= 1160) {
		mainComponentWidth = "1160px";
	} else {
		mainComponentWidth = width+"px";
	}

	return <>
		<Grid container style={{ marginTop: 20, width: "100%" }} >
			<Grid item style={{ width: "100%" }}>
				<div style={{ width: mainComponentWidth, marginLeft: "auto", marginRight: "auto", display: "block" }}>
					{topChildren}
				</div>
			</Grid>
			<Grid item ref={componentRef} style={{ width: "100%" }}>
				<div style={{ width: mainComponentWidth, marginLeft: "auto", marginRight: "auto", display: "block" }}>
					<div style={{ position: "relative" }} ref={componentRef}>
						<div style={{ position: "absolute", right: 0 }} >
							<Grid container direction="row">
								<img src={GroupLargeIconSvg} alt="Large Icons" onClick={() => setSelectedGroupSize("large")} style={{ opacity: selectedGroupSize === "large"? "100%":"30%", cursor: "pointer", paddingRight: "9px" }}/>
								<img src={GroupSmallIconSvg} alt="Small Icons" onClick={() => setSelectedGroupSize("small")} style={{ opacity: selectedGroupSize === "small"? "100%":"30%", cursor: "pointer" }}/>
							</Grid>
						</div>
						<Grid container direction="row">
							<Grid item>
								<HeaderTypography
									onClick={() => setSelectedCategory("newest")}
									style={{ fontSize: "18px", borderBottom: selectedCategory === "newest" ? `3px solid ${activeTextColor}`:"none", paddingBottom: "11px", color: textColor, fontWeight: "bold", cursor: "pointer", opacity: selectedCategory === "newest" ? 1 : 0.7 }}
								>Newest</HeaderTypography>
							</Grid>
							<Grid item style={{ width: "38px" }}/>
							<Grid item>
								<HeaderTypography
									onClick={() => setSelectedCategory("cheapest")}
									style={{ fontSize: "18px", borderBottom: selectedCategory === "cheapest" ? `3px solid ${activeTextColor}`:"none", paddingBottom: "11px", color: textColor, fontWeight: "bold", cursor: "pointer", opacity: selectedCategory === "cheapest" ? 1 : 0.7 }}
								>Cheapest</HeaderTypography>
							</Grid>
						</Grid>
					</div>
					<Divider style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", width: "100%", height: "0.2px", marginBottom: "20px", marginTop: "-2px" }}/>
					<div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(${selectedGroupSize==="large"?272:219}px, max-content))`, gridGap: "8px", justifyContent: "center", padding: "initial" }}>
						{selectedData.map((elem, idx) =>
							<div key={idx} style={{}}>
								<NftCard sm={selectedGroupSize==="small"} lg={selectedGroupSize==="large"} imgUrl={elem.imgUrl} nftPageUrl={elem.nftPageUrl} price={elem.price} description={elem.description} title={elem.title} buttonText={elem.buttonText} />
							</div>
						)}
					</div>
				</div>
			</Grid>
		</Grid>


	</>;
}