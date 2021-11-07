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