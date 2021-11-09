export const AppwriteServer = {
	endpoint : process.env.REACT_APP_ENDPOINT || "http://localhost:81/v1",
	project: process.env.REACT_APP_PROJECT || "618583cbf0506",
	collectionID : process.env.REACT_APP_COLLECTION_ID
};

export const domainName = process.env.REACT_APP_DOMAIN || "http://localhost:3000";