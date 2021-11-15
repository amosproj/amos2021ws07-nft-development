// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import React from "react";
import useChangeRoute from "../hooks/useChangeRoute";

export default function UserArea({ user, children }) {
	const changeRoute = useChangeRoute();

	if (!user){
		changeRoute("/");
		return <></>;
	}

	return <>
		{children}
	</>;
}