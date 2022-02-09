import React from "react";
import HeaderTypography from "../components/HeaderTypography";
import Margin from "../components/MarginNFTInfoPage";

/**
 * NFTInfoTitle.
 * @param nftName nftName
 * @returns {JSX.Element}
 */
export default function NFTInfoTitle({ nftName = "Title of the NFT" }) {
	return (<>
		<HeaderTypography style={{ fontWeight: "700", fontSize: "34px", marginTop: "-8px" }}>
			{nftName}
		</HeaderTypography>

		<Margin height="24px" />
	</>);
}
