// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import React, { useEffect, useState } from "react";
import appwriteApi from "../api/appwriteApi";
import CenterFlexBox from "../components/CenterFlexBox";
import ParagraphTypography from "../components/ParagraphTypography";

/**
 * Wrapper component that only displays its children if the user is in the Admins team, otherwise wrapped components
 * will not be shown.
 * @param children wrapped components that should only be shown to admins
 * @returns {JSX.Element}
 */
export default function AdminArea({ children }) {
	const [userIsAdmin, setUserIsAdmin] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(async () => {
		const isAdmin = await appwriteApi.userIsMemberOfTeam("Admins");
		setUserIsAdmin(isAdmin);
		setIsLoaded(true);
	}, []);

	if (!isLoaded){
		return <CenterFlexBox>
			<ParagraphTypography>
				Loading
			</ParagraphTypography>
		</CenterFlexBox>;
	}

	if (!userIsAdmin){
		return <CenterFlexBox>
			<ParagraphTypography>
				You are trying to access an admin restricted area. If you believe you should access to this area, please contact an admin directly.
			</ParagraphTypography>
		</CenterFlexBox>;
	}

	return <>
		{children}
	</>;
}