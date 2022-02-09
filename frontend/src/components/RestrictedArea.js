// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>, 
// SPDX-FileCopyrightText: 2021 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>

import React, { useEffect, useState } from "react";
import appwriteApi from "../api/appwriteApi";
import CenterFlexBox from "./CenterFlexBox";
import { Link } from "react-router-dom";
import { activeTextColor } from "../assets/jss/colorPalette";
import { arrayIntersection } from "../utils/utils";
import { adminTeamName } from "../utils/config";

const ErrorMessage = ({ children }) => (
	<CenterFlexBox>
		<div style={{ fontFamily: "Noto Sans", }}>{children}</div>
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

export function useTeamMembership(user, teams = [adminTeamName]) {
	const [userIsTeamMember, setUserIsTeamMember] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);

	const updateMemberStatus = async () => {
		if (!user || !Array.isArray(teams)) return;
		try {
			const teamsObject = await appwriteApi.listTeams();
			const isTeamMember =
				arrayIntersection(teamsObject.teams.map(team => team.name), teams)
					.length != 0 ?? false;
			setUserIsTeamMember(isTeamMember);
			setIsLoaded(true);
		} catch(e) {
			return;
		}
	};
	useEffect(() => updateMemberStatus(), [user, teams]);

	return [userIsTeamMember, isLoaded];
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
	const [userIsTeamMember, isLoaded] = useTeamMembership(user, teams);

	const render = () => <>{children}</>;

	if (!user){
		return enableAccessErrorMessage ? noAccessMessage : <></>;
	}

	if (!Array.isArray(teams)){
		return render();
	}

	if (!isLoaded){
		return loadingMessage;
	}

	if (!userIsTeamMember){
		return enableAccessErrorMessage ? noMemberAccessMessage : <></>;
	}

	return render();
}