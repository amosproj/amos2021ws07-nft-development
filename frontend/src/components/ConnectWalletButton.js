// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>
// SPDX-FileCopyrightText: 2022 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>
// SDPX-FileCopyrightText: 2021 Que Le <b.le@tu-berlin.de>

import React from "react";
import Margin from "../components/Margin";
import Image from "../components/Image";
import CenterBox from "../components/CenterBox";
import ButtonLinkTypography from "../components/ButtonLinkTypography";
import RoundedEdgesButton from "../components/RoundedEdgesButton";
import { metaMaskIcon } from "../assets/jss/imagePalette";

/**
 * Center box of Wallet component
 * @param style style
 * @param onClick onClick handler for connecting wallet
 * @returns {JSX.Element}
 */
export default function ConnectWalletButton({ style, onClick }) {
	const connectWalletColor = (alpha) => `rgba(0, 141, 212, ${alpha})`;
	const connectWalletStyle = { border: `1px solid ${connectWalletColor(0.4)}`, color: connectWalletColor(1.0), paddingLeft: "24px", paddingRight: "24px", height: "47px", };
	return (
		<RoundedEdgesButton style={{ ...connectWalletStyle, ...style, }} onClick={onClick}>
			<CenterBox>
				<Image src={metaMaskIcon} height="1.8em" />

				<Margin width="12px" />

				<ButtonLinkTypography style={{ display: "inline", fontWeight: "700", fontSize: "14px", }}>
					Connect MetaMask Wallet
				</ButtonLinkTypography>

				<Margin width="12px" />
			</CenterBox>
		</RoundedEdgesButton>
	);
}
