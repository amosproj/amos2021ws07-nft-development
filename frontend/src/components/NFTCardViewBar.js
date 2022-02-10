// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021/2022 Dominic Heil <d.heil@campus.tu-berlin.de>
// SPDX-FileCopyrightText: 2022 Christoph Ehm. <christoph.ehmendoerfer@campus.tu-berlin.de>

import React from "react";
import Grid from "@mui/material/Grid";
import { groupLargeIcon, groupSmallIcon } from "../assets/jss/imagePalette";
import { GroupSizes, defaultGroupSize } from "./NftCardStructuredList";

/**
 * Bar component that hold children NFT components
 * @param children children
 * @param selectedGroupSize state size of group
 * @param setSelectedGroupSize set function
 * @returns {JSX.Element}
 */
export function NFTCardViewBar({ children, selectedGroupSize, setSelectedGroupSize }) {
	const groupSize = GroupSizes[selectedGroupSize] ?? GroupSizes[defaultGroupSize];
	const groupSizeSymbolStyle = (thisGroupSize) => (
		(groupSize === thisGroupSize) ? { opacity: 1.0, } : { opacity: 0.3, }
	);

	return (<div style={{ position: "relative" }}>
		<div style={{ position: "absolute", right: 0 }}>
			<Grid container direction="row">
				<img src={groupLargeIcon} alt="Large Icons" onClick={() => setSelectedGroupSize("LARGE")} style={{ ...groupSizeSymbolStyle(GroupSizes.LARGE), cursor: "pointer" }} />
				<Grid item style={{ width: "9px", }} />
				<img src={groupSmallIcon} alt="Small Icons" onClick={() => setSelectedGroupSize("SMALL")} style={{ ...groupSizeSymbolStyle(GroupSizes.SMALL), cursor: "pointer" }} />
			</Grid>
		</div>
		{children}
	</div>);
}
