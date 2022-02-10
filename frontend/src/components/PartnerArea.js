// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>

import React from "react";
import { adminTeamName, partnerTeamName } from "../utils/config";
import RestrictedArea from "./RestrictedArea";

/**
 * Construct the partner area for partner user.
 * @param user Object user.
 * @param children JSX.Element child components.
 * @param options Options for this component's child component RestrictedArea.
 * @returns {JSX.Element}
 */
export default function PartnerArea({ user, children, ...options }) {
	return <RestrictedArea user={user} teams={[partnerTeamName, adminTeamName]} {...options}>{children}</RestrictedArea>;
}
