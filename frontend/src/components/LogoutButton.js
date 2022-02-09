// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>
// SPDX-FileCopyrightText: 2022 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>

import React from "react";
import appwriteApi from "../api/appwriteApi";
import CenterBox from "../components/CenterBox";
import RoundedEdgesButton from "../components/RoundedEdgesButton";

/**
 * "Log out" button.
 * @returns {JSX.Element}
 */
export default function LogoutButton({ setUser, changeRoute }) {
	const clearUser = () => {
		setUser(null);
		changeRoute("/");
	};
	const logoutColor = (alpha) => `rgba(255, 107, 107, ${alpha})`;
	const logoutRoutine = () => appwriteApi.deleteCurrentSession().then(clearUser);
	const logoutStyle = { width: "151px", height: "47px", border: `1px solid ${logoutColor(0.4)}`, color: logoutColor(1.0), fontWeight: "700", fontSize: "14px", };
	return (<CenterBox>
		<RoundedEdgesButton style={logoutStyle} onClick={logoutRoutine}>
			Logout
		</RoundedEdgesButton>
	</CenterBox>);
}
