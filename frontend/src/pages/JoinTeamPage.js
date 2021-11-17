// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import React, { useEffect, useState } from "react";
import appwriteApi from "../api/appwriteApi";
import CenterFlexBox from "../components/CenterFlexBox";
import { Typography } from "@mui/material";


export default function JoinTeamPage({ user }) {
	const [isLoaded, setIsLoaded] = useState(false	);
	const [wasAccepted, setWasAccepted] = useState(false);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const membershipId = urlParams.get("membershipId");
		const userId = urlParams.get("userId");
		const teamId = urlParams.get("teamId");
		const secret = urlParams.get("secret");
		appwriteApi.attemptJoinTeam(membershipId, userId, teamId, secret).then((res) => {
			if (res){
				setWasAccepted(true);
			}
			setIsLoaded(true);
		}).catch(() => {
			setWasAccepted(false);
			setIsLoaded(true);
		});
	});

	if (!isLoaded) {
		return <></>;
	}

	return <CenterFlexBox>
		{wasAccepted
			?
			<Typography style={{ color: "white" }}>Successfully joined the team.</Typography>
			:
			<Typography style={{ color: "white" }}>Was not able to join team. {user === null && <>It seems like you are not logged in. Login and then try accepting the invitation again!</>}</Typography>
		}

	</CenterFlexBox>;
}