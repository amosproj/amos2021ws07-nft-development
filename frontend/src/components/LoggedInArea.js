// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>

import React from "react";
import RestrictedArea from "./RestrictedArea";

/**
 * Construct the logged-in area for user.
 * @param user Object user.
 * @param children JSX.Element child components.
 * @param options Options for this component's child component RestrictedArea.
 * @returns {JSX.Element}
 */
export default function LoggedInArea({ user, children, ...options }) {
	return <RestrictedArea user={user} teams={null} {...options}>{children}</RestrictedArea>;
}
