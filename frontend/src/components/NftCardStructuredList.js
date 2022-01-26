// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>
// SPDX-FileCopyrightText: 2022 Christoph Ehm. <christoph.ehmendoerfer@campus.tu-berlin.de>

import React, { useEffect, useState } from "react";
import HeaderTypography from "../components/HeaderTypography";
import GroupLargeIconSvg from "../assets/img/group-large-icon.svg";
import GroupSmallIconSvg from "../assets/img/group-small-icon.svg";
import { Divider } from "@mui/material";
import { activeTextColor, textColor } from "../assets/jss/colorPalette";
import Grid from "@mui/material/Grid";
import NftCard, { CardSize } from "../components/NftCard";

const GroupSizes = {
	LARGE: {
		gridColumnsMinMax: "272px",
		cardSize: CardSize.large,
	},
	SMALL: {
		gridColumnsMinMax: "219px",
		cardSize: CardSize.small,
	},
};
export const defaultGroupSize = "LARGE";

const ViewCategories = {
	NEWEST: "NEWEST",
	CHEAPEST: "CHEAPEST",
};

export function NFTCardViewContent({ selectedNFTCardData, selectedGroupSize }) {
	const groupSize = GroupSizes[selectedGroupSize] ?? GroupSizes[defaultGroupSize];
	const cardViewContainerStyle = {
		display: "grid",
		gridTemplateColumns: `repeat(auto-fit, minmax(${groupSize.gridColumnsMinMax}, max-content))`,
		gridGap: "8px",
		justifyContent: "center",
		padding: "initial",
	};

	return (<div style={cardViewContainerStyle}>
		{ selectedNFTCardData.map((elem, idx) =>
			<div key={idx}>
				<NftCard size={groupSize.cardSize} imgUrl={elem.imgUrl} nftPageUrl={elem.nftPageUrl} price={elem.priceEth} description={elem.description} title={elem.title} buttonText={elem.buttonText} />
			</div>
		)}
	</div>);
}

export function NFTCardViewBar({ children, selectedGroupSize, setSelectedGroupSize }) {
	const groupSize = GroupSizes[selectedGroupSize] ?? GroupSizes[defaultGroupSize];
	const groupSizeSymbolStyle = (thisGroupSize) => (
		(groupSize === thisGroupSize)? { opacity: 1.0, } : { opacity: 0.3, }
	);

	return (<div style={{ position: "relative" }}>
		<div style={{ position: "absolute", right: 0 }} >
			<Grid container direction="row">
				<img src={GroupLargeIconSvg} alt="Large Icons" onClick={() => setSelectedGroupSize("LARGE")} style={{ ...groupSizeSymbolStyle(GroupSizes.LARGE), cursor: "pointer" }}/>
				<Grid item style={{ width: "9px", }}/>
				<img src={GroupSmallIconSvg} alt="Small Icons" onClick={() => setSelectedGroupSize("SMALL")} style={{ ...groupSizeSymbolStyle(GroupSizes.SMALL), cursor: "pointer" }}/>
			</Grid>
		</div>
		{children}
	</div>);
}

/**
 * Generic component for listing NFTs with a custom header
 * @param topChildren components that are shown above the NFT list as a header
 * @param nftDataArray the data used for the NFT cards
 * @returns {JSX.Element}
 */
export default function NftCardStructuredList({ topChildren, nftDataArray }) {
	const [selectedCategory, setSelectedCategory] = useState(ViewCategories.NEWEST);
	const [selectedGroupSize, setSelectedGroupSize] = useState(defaultGroupSize);
	const [newestData, setNewestData] = useState([...nftDataArray]);
	const [cheapestData, setCheapestData] = useState([...nftDataArray]);
	const [selectedData, setSelectedData] = useState([...nftDataArray]);

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
		setSelectedData(selectedCategory === ViewCategories.NEWEST ? newestData : cheapestData);
	}, [selectedCategory, newestData, cheapestData]);

	const categoryTabStyle = (thisCategory) => (
		(selectedCategory === thisCategory)?
			{ borderBottom: `3px solid ${activeTextColor}`, }
			:
			{ opacity: 0.7, }
	);

	return <>
		<Grid container style={{ marginTop: 20, width: "100%" }} >
			<Grid item style={{ width: "100%" }}>
				<div style={{ marginLeft: "auto", marginRight: "auto", display: "block" }}>
					{topChildren}
				</div>
			</Grid>
			<Grid item style={{ width: "100%" }}>
				<div style={{ marginLeft: "auto", marginRight: "auto", display: "block" }}>
					<NFTCardViewBar {...{ selectedGroupSize, setSelectedGroupSize }}>
						<Grid container direction="row">
							<Grid item>
								<HeaderTypography
									onClick={() => setSelectedCategory(ViewCategories.NEWEST)}
									style={{ ...categoryTabStyle(ViewCategories.NEWEST), fontSize: "18px", paddingBottom: "11px", color: textColor, fontWeight: "bold", cursor: "pointer", }}
								>Newest</HeaderTypography>
							</Grid>
							<Grid item style={{ width: "38px" }}/>
							<Grid item>
								<HeaderTypography
									onClick={() => setSelectedCategory(ViewCategories.CHEAPEST)}
									style={{ ...categoryTabStyle(ViewCategories.CHEAPEST), fontSize: "18px", paddingBottom: "11px", color: textColor, fontWeight: "bold", cursor: "pointer", }}
								>Cheapest</HeaderTypography>
							</Grid>
						</Grid>
					</NFTCardViewBar>

					<Divider style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", width: "100%", height: "0.2px", marginBottom: "20px", marginTop: "-2px" }}/>

					<NFTCardViewContent selectedNFTCardData={selectedData} {...{ selectedGroupSize }}/>
				</div>
			</Grid>
		</Grid>


	</>;
}