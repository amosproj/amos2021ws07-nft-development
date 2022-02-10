// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>

import React from "react";
import HeaderTypography from "../components/HeaderTypography";
import ConnectWalletButton from "../components/ConnectWalletButton";
import Grid from "@mui/material/Grid";
import Margin from "./MarginNFTInfoPage";

/**
 * Component to display when metamask is not connected. 
 * Show button to connect.
 * @param connectMetaMask callback to connect to metamask
 * @returns {JSX.Element}
 */
export default function MetaMaskNotConnected({ connectMetaMask }) {
	return (
		<Grid container direction="column" justifyContent="center" alignContent="center">
			<Grid item>
				<Grid container direction="column" justifyContent="center" alignContent="center">
					<Margin height="100px" />
					<Grid item style={{ maxWidth: "600px" }}>
						<HeaderTypography variant="h5">
							Connect MetaMask in order to view info of the requested NFT.
						</HeaderTypography>
					</Grid>
					<Margin height="30px" />
					<Grid item>
						<Grid container style={{ width: "100%" }} direction="column" justifyContent="center" alignContent="center">
							<ConnectWalletButton onClick={connectMetaMask} />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
