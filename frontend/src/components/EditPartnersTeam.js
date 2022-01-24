// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import React from "react";
import { partnerTeamName } from "../utils/config";
import EditUserTeam from "./EditUserTeam";

/**
 * Component that can be used by admins to invite or remove other admins.
 * @param user user object of the currently logged in user/admin
 * @returns {JSX.Element}
 */
export default function EditPartnersTeam({ user }) {
	return <EditUserTeam user={user} userTeamName={partnerTeamName} />;
}