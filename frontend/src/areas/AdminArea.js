// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import React, { useEffect, useState } from "react";
import appwriteApi from "../api/appwriteApi";

export default function AdminArea({ children }) {
	const [userIsAdmin, setUserIsAdmin] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(async () => {
		const isAdmin = await appwriteApi.userIsMemberOfTeam("Admins");
		setUserIsAdmin(isAdmin);
		setIsLoaded(true);
	}, []);

	if (!isLoaded){
		return <></>;
	}

	if (!userIsAdmin){
		return <></>;
	}

	return <>
		{children}
	</>;
}