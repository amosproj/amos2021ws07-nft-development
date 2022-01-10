// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

/**
 * Appwrite config object
 */
export const AppwriteServer = {
	endpoint : process.env.REACT_APP_ENDPOINT || "http://localhost:80/v1",
	project: process.env.REACT_APP_PROJECT,
	announcementCollectionID: process.env.REACT_APP_ANNOUNCEMENT_COLLECTION_ID,
	announcementFunctionID: process.env.REACT_APP_ANNOUNCEMENT_FUNCTION_ID,
	walletCollectionID: process.env.REACT_APP_WALLET_COLLECTION_ID,
	walletFunctionID: process.env.REACT_APP_WALLET_FUNCTION_ID,
	collectionID : process.env.REACT_APP_COLLECTION_ID
};

/**
 * domain name from which the frontend is served.
 */
export const domainName = process.env.REACT_APP_DOMAIN || "http://localhost:3000";

export const adminTeamName = "Admins";
export const partnerTeamName = "Partner";