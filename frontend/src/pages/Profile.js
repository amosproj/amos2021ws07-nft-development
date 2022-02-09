// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>
// SPDX-FileCopyrightText: 2022 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>

import Box from "@mui/material/Box";

import React, { useEffect, useState } from "react";
import appwriteApi from "../api/appwriteApi";
import useChangeRoute from "../hooks/useChangeRoute";
import { textColor } from "../assets/jss/colorPalette";

import Margin from "../components/Margin";
import HeaderTypography from "../components/HeaderTypography";
import ButtonLinkTypography from "../components/ButtonLinkTypography";
import EmailStatusBanner from "../components/EmailStatusBanner";
import UserNftCollectionButton from "../components/UserNftCollectionButton";
import CreateDropButton from "../components/CreateDropButton";
import LogoutButton from "../components/LogoutButton";
import WalletStatus from "../components/WalletStatus"; 
import StatusMessage from "../components/StatusMessage";
import Loading from "../components/Loading";
import ProfileSetting from "../components/ProfileSetting";

import { partnerTeamName } from "../utils/config";
import { ProfileUserPicture } from "./ProfileUserPicture";

export const linkStyle = { textDecoration: "underline", cursor: "pointer", };

/**
 * Page used to display profile of a user. Contains general information such as username, email,
 * if their email was verified, a possibility to change the users password and a possibility to logout.
 * @param user user object of the currently logged in user
 * @param setUser function to set the user object
 * @returns {JSX.Element}
 */
export default function Profile({ user, setUser }) {
	const [hasPasswordChanged, setHasPasswordChanged] = useState(false);
	const [passwordErrorText, setPasswordErrorText] = useState("");
	const [userIsInPartnerTeam, setUserIsInPartnerTeam] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const changeRoute = useChangeRoute();

	useEffect(() => {
		appwriteApi.userIsMemberOfTeam(partnerTeamName)
			.then(
				(isInPartnerTeam) => setUserIsInPartnerTeam(isInPartnerTeam)
			)
			.then(() => {
				setIsLoading(false);
			});
	}, []);

	if (isLoading) {
		return <Loading />;
	}

	const render = () => (<Box component="form" onSubmit={checkAndSaveProfile} >
		<EmailStatusBanner isVerified={isEmailVerified} />
		<Margin height="39px" />
		<HeaderTypography style={{ fontWeight: "700", fontSize: "22px", }}>
			Profile Settings
		</HeaderTypography>
		<Margin height="48px" />
		{
			profileSettings().map((settingProperties, index) => (<div key={index.toString()}>
				{index > 0 && <Margin height="34px" borderMargin="34px" />}

				<ProfileSetting {...settingProperties} />
			</div>))
		}
	</Box>);

	const editProfilePicture = () => { };  // TODO

	// TODO, un-disable input fields for implementation.
	const profileSettings = () => [
		{
			label: pictureLabel,
			inputColumnExtra: <ProfileUserPicture linkStyle={linkStyle} editProfilePicture={editProfilePicture} />,
			inputDescription: pictureRequirementsText,
		},
		{
			label: "NFT Collection",
			inputColumnExtra: <UserNftCollectionButton user={user} setUser={setUser} />,
		},
		{
			label: usernameLabel,
			inputFieldList: [{ defaultValue: user.name, disabled: true, }],
			inputDescription: usernameRequirementsText,
		},
		{
			label: emailLabel,
			inputFieldList: [{ defaultValue: user.email, disabled: true, }],
			inputColumnExtra: emailVerificationStatus,
			inputDescription: emailRequirementsText,
		},
		{
			label: passwordLabel,
			inputFieldList: [
				{ label: "Old password", required: false, type: "password", },
				{ label: "New password", required: false, type: "password", },
				{ label: "Repeat new password", required: false, type: "password", },
			],
			inputColumnExtra: <>{passwordChangeStatus}{changePasswordButton}</>,
			inputDescription: passwordRequirementsText,
		},
		{
			label: "Wallet status",
			inputColumnExtra: <WalletStatus user={user} setUser={setUser} />,
			inputDescription: "Connect your existing Metamask wallet to NFT The World account",
		},
		...userIsInPartnerTeam ? [{
			label: "Create new drop",
			inputColumnExtra: <CreateDropButton />,
		}] : [],
		{
			label: "Log out",
			inputColumnExtra: <LogoutButton setUser={setUser} changeRoute={changeRoute} />,
		},
	];

	// TODO live text input validation
	const pictureLabel = "Userpic";
	const pictureRequirementsText = "max 180x180";  // TODO
	const usernameLabel = "Username";
	const usernameRequirementsText = "";  // TODO
	const emailLabel = "Email";
	const emailRequirementsText = "";   // TODO
	const passwordLabel = "Change password";
	const passwordRequirementsText = "";  // TODO, I find password limitations useless


	const handleChangePassword = () => {
		const [oldPassword, newPassword, repeatedPassword] = [
			document.getElementById(`${passwordLabel}0`).value,
			document.getElementById(`${passwordLabel}1`).value,
			document.getElementById(`${passwordLabel}2`).value,
		];

		if (newPassword === repeatedPassword)
			appwriteApi.changePassword(oldPassword, newPassword)
				.then(() => {
					setHasPasswordChanged(true);
					setPasswordErrorText("");
				})
				.catch(err => setPasswordErrorText(err.message));
		else
			setPasswordErrorText("The repeated password does not coincide.");
	};

	const checkAndSaveProfile = (event) => {  // TODO, also emailVerification from utils/utils.js
		event.preventDefault();
	};

	const isEmailVerified = user.emailVerification;
	const emailVerificationStatus = <StatusMessage isSuccessful={isEmailVerified} successText="Email verified" otherText="Email not verified" />;
	const hasTriedPasswordChange = hasPasswordChanged || !!passwordErrorText;
	const passwordChangeStatus = hasTriedPasswordChange && <StatusMessage isSuccessful={hasPasswordChanged} successText="Password has changed" errorText={passwordErrorText} />;
	const changePasswordButton = (
		<ButtonLinkTypography 
			onClick={handleChangePassword} 
			style={{ color: textColor, opacity: 0.6, ...linkStyle, }} 
		>
			Save new password
		</ButtonLinkTypography>
	);

	return render();
}
