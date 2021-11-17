// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import { Appwrite } from "appwrite";
import { AppwriteServer, domainName } from "../utils/config";

/**
 * The api used to communicate with appwrite. Implements convenient wrappers to manage the communication with appwrite.
 */
let api = {
	sdk: null,

	provider: () => {
		if (api.sdk) {
			return api.sdk;
		}
		let appwrite = new Appwrite();
		appwrite.setEndpoint(AppwriteServer.endpoint).setProject(AppwriteServer.project);
		api.sdk = appwrite;
		return appwrite;
	},

	createAccount: (email, password, name) => {
		return api.provider().account.create(email, password, name);
	},

	getAccount: () => {
		return api.provider().account.get();
	},

	getMembershipsOfTeam: (teamName) => {
		return api.getTeamId(teamName)
			.then(teamID => api.provider().teams.getMemberships(teamID));
	},

	checkIfUserIsInTeam: (email, teamName) => {
		return api.getMembershipsOfTeam(teamName).then(response => {
			const usersWithMail = response.memberships.find(element => element.email === email);
			return usersWithMail !== undefined;
		});
	},

	sendEmailConfirmation:() => {
		return api.provider().account.createVerification(domainName + "/confirmEmail");
	},

	attemptEmailConfirmation: (userId, secret) => {
		return api.provider().account.updateVerification(userId, secret);
	},

	getTeamId: (teamName) => {
		return api.provider().teams.list(teamName).then(response => response.teams[0].$id);
	},

	getMembershipIdOfUser: (teamID, email) => {
		return api.provider().teams.getMemberships(teamID)
			.then(response => response.memberships.find(element => element.email === email).$id);
	},

	removeUserFromTeam: (teamName, email) => {
		return api.getTeamId(teamName)
			.then(teamID => api.getMembershipIdOfUser(teamID, email)
				.then(membershipId => api.provider().teams.deleteMembership(teamID, membershipId)));
	},

	inviteUserToTeam: (teamName, email, roles) => {
		return api.getTeamId(teamName).then(teamId => api.provider().teams.createMembership(teamId, email, roles, domainName + "/joinTeam"));
	},

	attemptJoinTeam: (membershipId, userId, teamId, secret) => {
		return api.provider().teams.updateMembershipStatus(teamId, membershipId, userId, secret);
	},

	requestPasswordReset: (email) => {
		return api.provider().account.createRecovery(email, domainName + "/resetPassword");
	},

	resetPassword: (userId, secret, password, passwordAgain) => {
		return api.provider().account.updateRecovery(userId, secret, password, passwordAgain);
	},

	changePassword: (oldPassword, newPassword) => {
		return api.provider().account.updatePassword(newPassword, oldPassword);
	},

	createSession: (email, password) => {
		return api.provider().account.createSession(email, password);
	},

	deleteCurrentSession: () => {
		return api.provider().account.deleteSession("current");
	},

	createDocument: (collectionId, data, read, write) => {
		return api
			.provider()
			.database.createDocument(collectionId, data, read, write);
	},

	userIsMemberOfTeam: (teamName) => {
		return api.listTeams().then(response => {
			for (let team of response.teams){
				if (team.name === teamName){
					return true;
				}
			}
			return false;
		});
	},

	listTeams: () => {
		return api.provider().teams.list();
	},

	listDocuments: (collectionId) => {
		return api.provider().database.listDocuments(collectionId);
	},

	updateDocument: (collectionId, documentId, data, read, write) => {
		return api
			.provider()
			.database.updateDocument(collectionId, documentId, data, read, write);
	},

	deleteDocument: (collectionId, documentId) => {
		return api.provider().database.deleteDocument(collectionId, documentId);
	},
};

export default api;