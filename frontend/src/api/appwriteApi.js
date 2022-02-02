// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import { Appwrite } from "appwrite";
import { AppwriteServer, domainName, adminTeamName } from "../utils/config";

/**
 * The api used to communicate with appwrite. 
 * Implements convenient wrappers to manage the communication with appwrite.
 */
let api = {
	sdk: new Appwrite().setEndpoint(AppwriteServer.endpoint).setProject(AppwriteServer.project),

	provider() {
		return this.sdk;
	},

	createAccount: (email, password, name) => {
		return api.provider().account.create(email, password, name);
	},

	getAccount: () => {
		return api.provider().account.get();
	},

	deleteAccount: () => {
		return api.provider().account.delete();
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
		return api.provider().teams.list(teamName).then(response => response.teams.length > 0 ? response.teams[0].$id : null);
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

	/**
	 * APIs for Announcements 
	 */
	createAnnouncement: async (data) => {
		console.log("create Announcement:", data);
		return api
			.provider()
			.database.createDocument(
				AppwriteServer.announcementCollectionID,
				data,
				["*"], 										// read permission
				["team:" + await api.getTeamId(adminTeamName)]	// write permission
			);
	},

	updateAnnouncement: (data, announcementId) => {
		return api
			.provider()
			.database.updateDocument(
				AppwriteServer.announcementCollectionID, 
				announcementId, 
				data,
			);
	},

	deleteAnnouncement: (announcementId) => {
		return api.provider().database.deleteDocument(AppwriteServer.announcementCollectionID, announcementId);
	},

	getAnnouncements: () => {
		return api.provider().database.listDocuments(AppwriteServer.announcementCollectionID);
	},

	/**
	 * APIs for ETH address 
	 */
	getOwnEthAddress: (userId) => {
		return api.provider().database.listDocuments(AppwriteServer.walletCollectionID, ["userId="+userId]);
	},

	setEthAddress: (address) => {
		return api.provider().functions.createExecution(
			AppwriteServer.walletFunctionID, 
			JSON.stringify({ "walletAddress": address })
		);
	},

	getDrops: (filter="", limit=10, orderField = "DropTime", orderType = "DESC") => {
		return api.provider().database.listDocuments(AppwriteServer.dropCollectionID, filter, limit, 0, orderField, orderType).catch(() => {
			return { documents: [] }; 
		});
	},

	getDropContractAddress: () => {
		return api.provider().database.listDocuments(AppwriteServer.abiCollectionID, ["contract_name=MAIN-Contract"], 1).then((res) => {
			return res.documents[0]["contract_address"];
		});
	},

	getDropContractAbi: () => {
		return api.provider().database.listDocuments(AppwriteServer.abiCollectionID, ["contract_name=MAIN-Contract"], 1).then((res) => {
			return JSON.parse(res.documents[0]["contract_abi"]);
		});
	},

	getERC721Abi: () => {
		return api.provider().database.listDocuments(AppwriteServer.abiCollectionID, ["contract_name=ERC721"], 1).then((res) => {
			return JSON.parse(res.documents[0]["contract_abi"]);
		});
	},

	/**
	 * Storage API
	 **/
	imageToFileID(imageID) {
		return imageID && `img${imageID}`;
	},

	async loadImageFromDatabase(imageID) {
		const fileID = this.imageToFileID(imageID);
		try {
			return await this.sdk.storage.getFile(fileID);
		} catch(e) {
			console.error(`Couldn't load image with ID ${fileID} from database! Likely does not exist or was deleted.`);
			return null;
		}
	},

	async saveImageToDatabase(image, imageID) {
		const fileID = this.imageToFileID(imageID);
		
		this.sdk.storage.deleteFile(fileID)
			.catch(() => console.log(`No image to update. Create new image ${fileID}!`));

		try {
			const readPermissions = ["*"];
			console.debug("save file with ID", fileID);
			await this.sdk.storage.createFile(fileID, image, readPermissions);
			return true;
		} catch(e) {
			console.error(`Cannot save image with ID ${fileID}, likely no write permissions.`);
			return false;
		}
	},

	removeImageFromDatabase(imageID) {
		const fileID = this.imageToFileID(imageID);
		return this.sdk.storage.deleteFile(fileID)
			.catch(() => console.error(`Couldn't delete image with ID ${fileID}. Either doesn't exist or no proper permissions.`));
  },
};

export default api;