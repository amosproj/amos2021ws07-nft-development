// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>, Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>

import React, { useEffect, useState } from "react";
import appwriteApi from "../api/appwriteApi";
import CenterFlexBox from "./CenterFlexBox";
import ParagraphTypography from "./ParagraphTypography";
import { Link } from "react-router-dom";
import { activeTextColor } from "../assets/jss/colorPalette";
import { arrayIntersection } from "../utils/utils";
import { adminTeamName, partnerTeamName } from "../utils/config";

const ErrorMessage = ({ children }) => (
	<CenterFlexBox>
		<ParagraphTypography>{children}</ParagraphTypography>
	</CenterFlexBox>
);

const noAccessMessage = <ErrorMessage>
	You are trying to access a user restricted area. Please <Link to="/login" style={{ textDecorationLine: "none", color: activeTextColor }}>login</Link>.
</ErrorMessage>;

const loadingMessage = <ErrorMessage>
	Loading...
</ErrorMessage>;

const noMemberAccessMessage = <ErrorMessage>
	You are trying to access a restricted area. If you believe you should have access to this area, please contact an admin directly.
</ErrorMessage>;

export function AdminArea({ user, children, ...options }) {
	return <RestrictedArea user={user} teams={[adminTeamName]} {...options}>{children}</RestrictedArea>;
}

export function PartnerArea({ user, children, ...options }) {
	return <RestrictedArea user={user} teams={[partnerTeamName, adminTeamName]} {...options}>{children}</RestrictedArea>;
}

export function LoggedInArea({ user, children, ...options }) {
	return <RestrictedArea user={user} teams={null} {...options}>{children}</RestrictedArea>;
}

/**
 * Displays children only if the user is member of a specific team,
 * otherwise wrapped components will not be shown.
 * @param children wrapped components that should only be shown to members of specified teams
 * @param user user object as maintained by the main application component.
 * @param teams list of team names whose members can access `children`. Any logged in user if no array.
 * @param enableAccessErrorMessage flag indicating whether error messages should be
 *    displayed when user is not allowed to access `children`.
 * @returns {JSX.Element}
 */
export default function RestrictedArea({ user, teams, children, enableAccessErrorMessage }) {

	const [userIsTeamMember, setUserIsTeamMember] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);

	const updateMemberStatus = async () => {
		if (!user || !Array.isArray(teams)) return;
	
		const teamsObject = await appwriteApi.listTeams();
		const isTeamMember = arrayIntersection(teamsObject.teams.map(team => team.name), teams);
		setUserIsTeamMember(isTeamMember.length !== 0);
		setIsLoaded(true);
	};

	useEffect(updateMemberStatus, [user, teams]);

	if (!user){
		return !enableAccessErrorMessage && noAccessMessage;
	}

	if (!Array.isArray(teams)){
		return <>{children}</>;
	}

	if (!isLoaded){
		return loadingMessage;
	}

	if (!userIsTeamMember){
		return !enableAccessErrorMessage && noMemberAccessMessage;
	}

	return <>{children}</>;
}