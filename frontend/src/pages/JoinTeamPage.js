// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import React, { useEffect, useState } from "react";
import appwriteApi from "../api/appwriteApi";
import CenterFlexBox from "../components/CenterFlexBox";
import { Typography } from "@mui/material";


export default function JoinTeamPage({ user }) {
	const [isLoaded, setIsLoaded] = useState(false	);
	const [wasAccepted, setWasAccepted] = useState(false);
	// http://localhost:3000/joinTeam?membershipId=6193197a5e9b3&userId=6191604b496b0&secret=7dbd290be06dc9e95f42e55f8fb8a3222a1fbac531d2ce7b882ed115e0f5c0e332d0d276efb638a39354a332cfbbbfbdd11322d4ddec71dacaf4a0dad5a35f44b115def5b6de29022a8e68e3ad7f25afce49546421a946c22c744433c1a75afd66b6cd4e71cfbd555a3f5eaea6d9df10c1d32de53dd79679bac8bc0365e0861e&teamId=6191549c46fd5

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
		}
		);
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