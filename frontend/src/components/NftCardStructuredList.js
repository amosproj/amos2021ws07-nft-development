// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import React, { useEffect, useState } from "react";
import HeaderTypography from "../components/HeaderTypography";
import GroupLargeIconSvg from "../assets/img/group-large-icon.svg";
import GroupSmallIconSvg from "../assets/img/group-small-icon.svg";
import { Divider } from "@mui/material";
import { activeTextColor, textColor } from "../assets/jss/colorPalette";
import Grid from "@mui/material/Grid";
import NftCard, { CardSize } from "../components/NftCard";

const GroupSizes = {
	large: {
		gridColumnsMinMax: "272px",
		cardSize: CardSize.large,
	},
	small: {
		gridColumnsMinMax: "219px",
		cardSize: CardSize.small,
	},
};
export const defaultGroupSize = "large";

const ViewCategories = {
	newest: "newest",
	cheapest: "cheapest",
};

export function NFTCardViewContent({ selectedNFTCardData, selectedGroupSize }) {
	const groupSize = GroupSizes[selectedGroupSize] ?? GroupSizes[defaultGroupSize];
	const cardViewContainerStyle = {
		display: "grid",
		gridTemplateColumns: `repeat(auto-fit, minmax(${groupSize.gridColumnsMinMax}, max-content))`,
		gridGap: "8px",
		justifyContent: "space-between",
		padding: "initial",
	};

	return (<div style={cardViewContainerStyle}>
		{ selectedNFTCardData.map((elem, idx) =>
			<div key={idx}>
				<NftCard size={groupSize.cardSize} imgUrl={elem.imgUrl} nftPageUrl={elem.nftPageUrl} price={elem.price} description={elem.description} title={elem.title} buttonText={elem.buttonText} />
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
				<img src={GroupLargeIconSvg} alt="Large Icons" onClick={() => setSelectedGroupSize("large")} style={{ ...groupSizeSymbolStyle(GroupSizes.large), cursor: "pointer" }}/>
				<Grid item style={{ width: "9px", }}/>
				<img src={GroupSmallIconSvg} alt="Small Icons" onClick={() => setSelectedGroupSize("small")} style={{ ...groupSizeSymbolStyle(GroupSizes.small), cursor: "pointer" }}/>
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
	const [selectedCategory, setSelectedCategory] = useState(ViewCategories.newest);
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
		setSelectedData(selectedCategory === ViewCategories.newest ? newestData : cheapestData);
	}, [selectedCategory]);

	const categoryTabStyle = (thisCategory) => (
		(selectedCategory === thisCategory)? {
			borderBottom: `3px solid ${activeTextColor}`,
		} : {
			opacity: 0.7,
		}
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
									onClick={() => setSelectedCategory(ViewCategories.newest)}
									style={{ ...categoryTabStyle(ViewCategories.newest), fontSize: "18px", paddingBottom: "11px", color: textColor, fontWeight: "bold", cursor: "pointer", }}
								>Newest</HeaderTypography>
							</Grid>
							<Grid item style={{ width: "38px" }}/>
							<Grid item>
								<HeaderTypography
									onClick={() => setSelectedCategory(ViewCategories.cheapest)}
									style={{ ...categoryTabStyle(ViewCategories.cheapest), fontSize: "18px", paddingBottom: "11px", color: textColor, fontWeight: "bold", cursor: "pointer", }}
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