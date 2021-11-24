// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import React, { useEffect } from "react";
import useChangeRoute from "../hooks/useChangeRoute";

/**
 * Wrapper component that only displays its children if the user is a logged in user, otherwise wrapped components
 * will not be shown.
 * @param children wrapped components that should only be shown logged in users
 * @returns {JSX.Element}
 */
export default function UserArea({ user, children }) {
	const changeRoute = useChangeRoute();

	useEffect(() => {
		if (!user){
			changeRoute("/");
		}
	}, [user]);

	if (!user){
		return <></>;
	}

	return <>
		{children}
	</>;
}