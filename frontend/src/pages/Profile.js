// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>
// SPDX-FileCopyrightText: 2022 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>

import Wallet from "../components/Wallet";
import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import appwriteApi from "../api/appwriteApi";
import useChangeRoute from "../hooks/useChangeRoute";
import { textColor, activeTextColor, } from "../assets/jss/colorPalette";

import { Margin, Image, CenterBox, } from "../components/Common";
import ParagraphTypography from "../components/ParagraphTypography";
import HeaderTypography from "../components/HeaderTypography";
import ButtonLinkTypography from "../components/ButtonLinkTypography";
import ConditionalAlert from "../components/ConditionalAlert";


/**
 * Displays one row of related profile settings.
 * @param label name of the profile setting (displayed left), string only
 * @param inputFieldList list of TextField properties for default text input fields (displayed in mid).
 *    If the text field data is only a string, it's used as `defaultValue` property.
 *    The text field data JSON should have at least the `label` property, `defaultValue` is recommended.
 * @param inputColumnExtra additional JSX element(s) to display below text input fields
 * @param inputDescription string or JSX describing the input fields or format (displayed right)
 * @param boxProps properties for the frame of the entire profile setting
 * @returns {JSX.Element}
 */
const ProfileSetting = ({ label, inputFieldList = [], inputColumnExtra = "", inputDescription = "", boxProps = {}, }) => {
	const render = () => (<Box {...boxProps}>
		<ProfileSettingRow {...{ left, middle, right }} />
		{ !!inputColumnExtra &&  <Margin height="24px"/> }
		<ProfileSettingRow middle={inputColumnExtra} />
	</Box>);

	const ProfileSettingRow = ({ left="", middle="", right="", }) => (
		<Box sx={{ flexDirection: { xs: "column", md: "row", }, }} style={{ display: "flex", justifyContent: "space-between" }} >
			<Box sx={{ width: { xs: "100%", md: "25%", } }}>
				{left}
			</Box>

			{ !!left &&  <Margin sx={{ display: { xs: "block", md: "none", } }} height="24px" /> }

			<Box sx={{ width: { xs: "100%", md: "calc(37% - 46px)", }, display: { xs: "flex", md: "block", }, }} style={{ flexDirection: "column", alignItems: "center", }}>
				{middle}
			</Box>

			<Margin sx={{ display: { xs: "none", md: "inline", }, }} width="46px" />
			{ !!right &&  <Margin sx={{ display: { xs: "block", md: "none", }, }} height="8px" /> }

			<CenterBox row sx={{ width: { xs: "100%", md: "37%", } }} >
				{right}
			</CenterBox>
		</Box>
	);

	const textFieldProps = (textFieldData, id) => ({
		required: true,
		fullWidth: true,
		name: `${label}${id}`,
		id: `${label}${id}`,
		multiline: false,
		// TODO, it may use the "error" property
		...(
			typeof(textFieldData) === "string" ?
				{ defaultValue: textFieldData }
				: textFieldData 
		)
	});
	const textFieldColor = (alpha) => `rgba(255,255,255,${alpha})`;
	// TODO create a text field theme instead
	const textFieldStyle = { border: `1px solid ${textFieldColor(0.5)}`, borderRadius: "7px", fontWeight: "400", fontSize: "16px", };
	const textFieldSX = { input: { "-webkit-text-fill-color": `${textFieldColor(0.6)} !important`, "color": `${textFieldColor(0.6)} !important`, }, label: { color: textFieldColor(0.6) } };

	const left = (
		<HeaderTypography style={{ fontWeight: "700", fontSize: "18px", color: textColor }}>
			{label}
		</HeaderTypography>
	);

	let middle;
	if (inputFieldList.length)
		middle = inputFieldList.map((textFieldData, index) =>  (<div key={index.toString()}>
			{ (index > 0) &&  <Margin height="24px"/> }
			<TextField { ...textFieldProps(textFieldData, index) } style={textFieldStyle} sx={textFieldSX} />
		</div>));
	else {
		middle = inputColumnExtra;
		inputColumnExtra = null;
	}

	const right = (
		<div style={{ fontFamily: "Noto Sans", fontWeight: "400", fontSize: "18px", color: textColor, opacity: 0.7, }}>
			{inputDescription}
		</div>
	);

	return render();
};

import greenCheckmark from "../assets/img/green-checkmark.png";

const GreenCheck = () => (<Image src={greenCheckmark} alt="✓" height="24px"/>);

const linkStyle = { textDecoration: "underline", cursor: "pointer", };

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
	const changeRoute = useChangeRoute();

	useEffect(() => {
		appwriteApi.userIsMemberOfTeam(partnerTeamName).then((isInPartnerTeam) => setUserIsInPartnerTeam(isInPartnerTeam));
	}, []);

	const render = () => (<Box component="form" onSubmit={checkAndSaveProfile} >
		<EmailStatusBanner isVerified={isEmailVerified}/>

		<Margin height="39px"/>

		<HeaderTypography style={{ fontWeight: "700", fontSize: "22px", }}>
			Profile Settings
		</HeaderTypography>

		<Margin height="48px"/>

		{
			profileSettings().map((settingProperties, index) => (<div key={index.toString()}>
				{ index > 0 &&  <Margin height="34px" borderMargin="34px"/> }

				<ProfileSetting {...settingProperties} />
			</div>))
		}
	</Box>);

	// TODO, un-disable input fields for implementation.
	const profileSettings = () => [
		{
			label: pictureLabel,
			inputColumnExtra: <ProfileUserPicture user={user} />,
			inputDescription: pictureRequirementsText,
		},
		{
			label: usernameLabel,
			inputFieldList: [ { defaultValue: user.name, disabled: true, } ],
			inputDescription: usernameRequirementsText,
		},
		{
			label: emailLabel,
			inputFieldList: [ { defaultValue: user.email, disabled: true, } ],
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
		... userIsInPartnerTeam ? [{
			label: "Create new drop",
			inputColumnExtra: <CreateDropButton/>,
		}] : [],
		{
			label: "Log out",
			inputColumnExtra: <LogoutButton setUser={setUser} changeRoute={changeRoute} />, 
		},
		{
			inputColumnExtra: saveButton,
		}
	];

	// TODO live text input validation
	const pictureLabel = "Userpic";
	const pictureRequirementsText = "max 180x180";  // TODO
	const usernameLabel = "Username";
	const usernameRequirementsText = "letters, digits, punctuation";  // TODO
	const emailLabel = "Email";
	const emailRequirementsText = "letters, digits, .+-@ ";
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

	const changePasswordButton = (<ButtonLinkTypography onClick={handleChangePassword} style={{ color: textColor, opacity: 0.6, ...linkStyle, }} >
		Save new password
	</ButtonLinkTypography>);

	const EmailStatusBanner = ({ isVerified }) => {
		const emailStatusBannerStyle = {
			paddingTop: "11px", paddingLeft: "20px", paddingBottom: "11px", paddingRight: "20px",
			borderRadius: "11px",
		};

		return (isVerified)?
			(<div style={{ visibility: "hidden", background: "#D7FFDD", ...emailStatusBannerStyle, display: "flex", alignItems: "center", }}>
				<GreenCheck/>

				<Margin width="13px"/>

				<ParagraphTypography style={{ display: "inline", fontWeight: "400", fontSize: "15px", color: "#456548", }}>
					Your email was successfully confirmed
				</ParagraphTypography>
			</div>)

			:
			(<div style={{ fontWeight: "400", fontSize: "15px", background: "rgba(255,255,255,0.1)", ...emailStatusBannerStyle, }}>
				Email verification unsuccessful,&ensp;
				<ButtonLinkTypography style={{ display: "inline", ...linkStyle, }} onClick={appwriteApi.sendEmailConfirmation}>
					resent&nbsp;email&nbsp;Verification
				</ButtonLinkTypography>
			</div>);
	};

	const saveButton = (<CenterBox>
		<RoundedEdgesButton type="submit" style={{ backgroundColor: activeTextColor, width: "151px" }} >
			Save profile
		</RoundedEdgesButton>
	</CenterBox>);

	return render();
}


const statusStyle = { display: "inline", font: "Noto Sans", fontWeight: "400", fontSize: "18px", color: textColor, opacity: 0.9 };
const StatusMessage = ({ isSuccessful, successText = "", errorText = "", otherText = "" }) => (
	(isSuccessful)?
		(<div style={{ display: "flex", alignItems: "center", }}>
			<GreenCheck/>

			<Margin width="17px" />

			<div style={statusStyle}>
				{successText}
			</div>
		</div>)
		:
		(<div style={statusStyle}>
			<ConditionalAlert severity="info" text={otherText}/>
			<ConditionalAlert severity="error" text={errorText}/>
		</div>)
);

import examplePicture from "../assets/img/mockup-user-pic.png";
import photoSymbol from "../assets/img/photo-symbol.png";

const editProfilePicture = () => {};  // TODO

const ProfileUserPicture = (/*{ user }*/) => {
	const render = () => (<>
		{picturePreview}

		<Margin height="20px"/>

		<ParagraphTypography style={{ fontWeight: "400", fontSize: "15px", opacity: "55%" }}>
			Click on picture to <span style={linkStyle} onClick={editProfilePicture} >edit</span>
		</ParagraphTypography>

		<Margin sx={{ display: { xs: "block", md: "none", } }} height="10px"/>
	</>);

	const profileHeight = 122;
	const profilePicture = examplePicture;  // TODO, "user" argument could be used
	const pictureBackgroundColor = (alpha) => `rgba(255,255,255,${alpha})`;
	const picturePreviewStyle = {
		background: pictureBackgroundColor(0.1),
		borderRadius: `${profileHeight/2}px`,
		width: `${profileHeight}px`,
		height: `${profileHeight}px`,
		boxShadow: `2px -2px 0px 0px ${pictureBackgroundColor(0.3)}`,
		cursor: "pointer",
		overflow: "hidden",
	};
	const picturePreview = (<div style={picturePreviewStyle} onClick={editProfilePicture}>
		<div style={{ backgroundImage: `url(${profilePicture})`, backgroundSize: "cover", width: "100%", height: "100%", }}>
			<CenterBox style={{ background: "rgba(0,0,0,0.19)", width: "100%", height: "100%", }}>
				<Image src={photoSymbol} height="34px" />
			</CenterBox>
		</div>
	</div>);

	return render();
};

import RoundedEdgesButton from "../components/RoundedEdgesButton";
import metaMaskLogo from "../assets/img/metaMask-fox-blue.png";
import { partnerTeamName } from "../utils/config";
import { Link } from "react-router-dom";

export const ConnectWalletButton = ({ style, onClick }) => {
	const connectWalletColor = (alpha) => `rgba(0, 141, 212, ${alpha})`;
	const connectWalletStyle = { border: `1px solid ${connectWalletColor(0.4)}`, color: connectWalletColor(1.0), paddingLeft: "24px", paddingRight: "24px", height: "47px", };
	return (
		<RoundedEdgesButton style={{ ...connectWalletStyle, ...style, }} onClick={onClick} >
			<CenterBox>
				<Image src={metaMaskLogo} height="1.8em" />

				<Margin width="12px" />

				<ButtonLinkTypography style={{ display: "inline",  fontWeight: "700", fontSize: "14px", }}>
					Connect MetaMask Wallet
				</ButtonLinkTypography>

				<Margin width="12px" />
			</CenterBox>
		</RoundedEdgesButton>
	);
};

const WalletStatus = ({ user, setUser, }) => {
	const render = () => (
		<CenterBox>
			<Wallet {...{ ConnectWalletButton, user, setUser, }}/>
		</CenterBox>
	);

	return render();
};

const LogoutButton = ({ setUser, changeRoute }) => {
	const clearUser = () => {
		setUser(null);
		changeRoute("/");
	};

	const logoutColor = (alpha) => `rgba(255, 107, 107, ${alpha})`;
	const logoutRoutine = () => appwriteApi.deleteCurrentSession().then(clearUser);
	const logoutStyle = { width: "151px", height: "47px", border: `1px solid ${logoutColor(0.4)}`, color: logoutColor(1.0), fontWeight: "700", fontSize: "14px", };
	return (<CenterBox>
		<RoundedEdgesButton style={logoutStyle} onClick={logoutRoutine}>
			Logout
		</RoundedEdgesButton>
	</CenterBox>);
};


const CreateDropButton = () => {
	const createDropButtonStyle = { backgroundColor: "transparent", width: "192px", height: "47px", fontSize: "14px", border: "1px solid #FFFFFF99", color: "#FFFFFF99" };
	return (<CenterBox>
		<RoundedEdgesButton component={Link} to="/createNewDrop" style={createDropButtonStyle}>
			Create new drop
		</RoundedEdgesButton>
	</CenterBox>);
};
