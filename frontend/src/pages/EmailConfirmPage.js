// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import React, { useEffect, useState } from "react";
import appwriteApi from "../api/appwriteApi";
import CenterFlexBox from "../components/CenterFlexBox";
import ParagraphTypography from "../components/ParagraphTypography";

/**
 * Page used to confirm the email of a user. The URL query params `userID` and `secret` need to be specified in order
 * to automatically confirm the email of a user.
 * @returns {JSX.Element}
 */
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
		}).catch(r =>
			console.log(r)
		);
	}, []);

	return <CenterFlexBox>
		{wasConfirmed
			?
			<ParagraphTypography>Email confirmed successfully.</ParagraphTypography>
			:
			<ParagraphTypography>Was not able to confirm email.</ParagraphTypography>
		}

	</CenterFlexBox>;
}