// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import { Appwrite } from "appwrite";
import { AppwriteServer } from "../utils/config";

let api = {
	sdk: null,

	provider: () => {
		if (api.sdk) {
			return api.sdk;
		}
		let appwrite = new Appwrite();
		console.log(AppwriteServer);
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

	sendEmailConfirmation:() => {
		return api.provider().account.createVerification("http://localhost:3000/confirm");
	},

	attemptEmailConfirmation: (userId, secret) => {
		return api.provider().account.updateVerification(userId, secret);
	},

	requestPasswordReset: (email) => {
		return api.provider().account.createRecovery(email, "http://localhost:3000/resetPassword");
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