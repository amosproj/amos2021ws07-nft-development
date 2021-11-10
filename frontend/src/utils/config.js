export const AppwriteServer = {
	endpoint : process.env.REACT_APP_ENDPOINT || "http://localhost:80/v1",
	project: process.env.REACT_APP_PROJECT,
	collectionID : process.env.REACT_APP_COLLECTION_ID
};

export const domainName = process.env.REACT_APP_DOMAIN || "http://localhost:3000";