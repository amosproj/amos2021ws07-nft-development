// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import React, { useEffect, useState } from "react";
import appwriteApi from "../api/appwriteApi";
import CenterFlexBox from "../components/CenterFlexBox";
import { Typography } from "@mui/material";


export default function EmailConfirmPage() {

	const [wasConfirmed, setWasConfirmed] = useState(false);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const userId = urlParams.get("userId");
		const secret = urlParams.get("secret");
		appwriteApi.attemptEmailConfirmation(userId, secret).then((res) => {
			if (res){
				setWasConfirmed(true);
			}
		}).catch(() => {});
	});

	return <CenterFlexBox>
		{wasConfirmed
			?
			<Typography style={{ color: "white" }}>Was not able to confirm email.</Typography>
			:
			<Typography style={{ color: "white" }}>Email confirmed successfully.</Typography>
		}

	</CenterFlexBox>;
}