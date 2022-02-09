// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>

import React from "react";
import { adminTeamName } from "../utils/config";
import RestrictedArea from "./RestrictedArea";

/**
 * Construct the admin area for admin user.
 * @param user Object user.
 * @param children JSX.Element child components.
 * @param options Options for this component's child component RestrictedArea.
 * @returns {JSX.Element}
 */
export default function AdminArea({ user, children, ...options }) {
	return <RestrictedArea user={user} teams={[adminTeamName]} {...options}>{children}</RestrictedArea>;
}
