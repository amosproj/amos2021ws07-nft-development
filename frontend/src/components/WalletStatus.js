// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>
// SPDX-FileCopyrightText: 2022 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>

import Wallet from "../components/Wallet";
import React from "react";
import CenterBox from "../components/CenterBox";
import ConnectWalletButton from "./ConnectWalletButton";

/**
 * Center box of Wallet component
 * @param user user object
 * @param setUser state function for settign user
 * @returns {JSX.Element}
 */
export default function WalletStatus({ user, setUser, }) {
	const render = () => (
		<CenterBox>
			<Wallet {...{ ConnectWalletButton, user, setUser, }} />
		</CenterBox>
	);
	return render();
}
