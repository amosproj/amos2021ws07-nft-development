// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import React from "react";

export default function UserArea({ user, children }) {

	if (!user){
		return <></>;
	}

	return <>
		{children}
	</>;
}