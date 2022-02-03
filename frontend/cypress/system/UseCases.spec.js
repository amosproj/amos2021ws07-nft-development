// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

const sdk = require("node-appwrite");
const { domainName } = require("../../src/utils/config");
let client = new sdk.Client();

client
	.setEndpoint(Cypress.env("APP_ENDPOINT"))
	.setProject(Cypress.env("APP_PROJECT"))
	.setKey(Cypress.env("APP_KEY"))
;

const APP_ANNOUNCEMENTS_COLLECTION_ID = Cypress.env("CYPRESS_APP_ANNOUNCEMENTS_COLLECTION_ID");

const NEW_USERNAME = "testUser123";
const NEW_PASSWORD = "testPassword123";
const SECOND_NEW_PASSWORD = "newTestPw123";
const NEW_EMAIL = "newEmailAddress@example.io";
const NEW_SECOND_EMAIL = "newEmailAddress2@example.io";

// const NON_EXISTING_USER_EMAIL = "nonexistentMail@example.com";


Cypress.config("defaultCommandTimeout", 10000);


async function addUserToTeam(teamName,userMail) {
	let teams = new sdk.Teams(client);
	let teamId = await teams.list(teamName);
	let adminId = teamId.teams[0].$id;

	// we allow this to fail as we only want to make sure the user is part of the team
	await teams.createMembership(adminId, userMail, ["owner"], domainName + "/joinTeam").catch(() => {});
}


function sharedSetup() {
	goToLandingPage();
}

function sharedDesktopSetup() {
	cy.setDesktopScreenSize();
	sharedSetup();
}

function goToProfile() {
	cy.get("header").get("a").contains("Profile").should("be.visible").click();
}

function goToAdminPage() {
	cy.get("header").contains("Admin").should("be.visible").click();
	cy.url().should("eq", Cypress.config().baseUrl+"/user/admin");
}

function goToLandingPage() {
	cy.visit("/");
}

function loginUser(password=NEW_PASSWORD) {
	cy.get("header").get("a").contains("Login").should("be.visible").click();

	cy.get("input").get("#email").should("be.visible").type(NEW_EMAIL);
	cy.get("input").get("#password").should("be.visible").type(password);

	cy.get("main").get("button").contains("Sign In").should("be.visible").click();

	cy.url().should("eq", Cypress.config().baseUrl+"/");
}

function logoutUser() {
	goToProfile();
	cy.get("main").get("button").contains("Logout").should("be.visible").click();
	cy.url().should("eq", Cypress.config().baseUrl+"/");
}


describe("desktop window size", () => {
	beforeEach(() => {
		sharedDesktopSetup();
	});

	it("registers a new user", () => {
		cy.get("a").contains("Sign Up").should("be.visible").click();
		cy.url().should("include", "/signup");

		cy.get("input").get("#username").should("be.visible").type(NEW_USERNAME);
		cy.get("input").get("#email").should("be.visible").type(NEW_EMAIL);
		cy.get("input").get("#password").should("be.visible").type(NEW_PASSWORD);

		cy.get("main").get("button").contains("Sign Up").should("be.visible").click();

		cy.get("main").contains("We sent you a confirmation email. Please confirm your registration!");
	});

	it("logs in a user", () => {
		loginUser();
	});

	it("checks if a logged in user can access the profile", () => {
		loginUser();
		goToProfile();
	});

	it("logs a user in and out", () => {
		loginUser();
		logoutUser();
	});

	it("is possible to request a password change", () => {
		cy.get("header").get("a").contains("Login").should("be.visible").click();
		cy.contains("Forgot password?").click();
		cy.contains("Request Password Reset");
		cy.get("#email").should("be.visible").type(NEW_EMAIL);
		cy.get("button").contains("Request password reset").click();

		cy.contains("You will receive an email shortly explaining how you can reset your password.");
	});

	it("is possible to go from the login page to the sign up page", () => {
		cy.get("header").get("a").contains("Login").should("be.visible").click();
		cy.contains("Don't have an account?").click();

		cy.url().should("eq", Cypress.config().baseUrl+"/signup");
	});


	context("profile", () => {
		beforeEach(() => {
			loginUser();
			goToProfile();
		});

		it("checks if the username is as specified", () => {
			cy.get("#Username0").should("have.value", NEW_USERNAME);
		});

		it("checks if the email is as specified", () => {
			cy.get("#Email0").should("have.value", NEW_EMAIL.toLowerCase());
		});

		it("is possible to change the password in the profile and login with the new password", () => {

			cy.get("#Change\\ password0").should("be.visible").type(NEW_PASSWORD);
			cy.get("#Change\\ password1").should("be.visible").type(SECOND_NEW_PASSWORD);
			cy.get("#Change\\ password2").should("be.visible").type(SECOND_NEW_PASSWORD);

			cy.get("p").contains("Save new password").should("be.visible").click();
			cy.get("div").contains("Password has changed");

			logoutUser();
			loginUser(SECOND_NEW_PASSWORD);
			goToProfile();

			cy.get("#Change\\ password0").should("be.visible").type(SECOND_NEW_PASSWORD);
			cy.get("#Change\\ password1").should("be.visible").type(NEW_PASSWORD);
			cy.get("#Change\\ password2").should("be.visible").type(NEW_PASSWORD);

			cy.get("p").contains("Save new password").should("be.visible").click();
			cy.get("div").contains("Password has changed");
		});
	});

	context("Admin", () => {
		before(() => {
			addUserToTeam("Admins", NEW_EMAIL);
		});

		beforeEach(() => {
			loginUser();
		});

		it("makes sure the user was added as an admin", () => {
			cy.get("header").contains("Admin").should("be.visible");
		});

		it("is possible to go to the admin area", () => {
			goToAdminPage();
		});

		it("is possible to go to the announcement page from admin page", () => {
			goToAdminPage();
			cy.contains("Write new announcement").click();
			cy.get("div").contains("Create and edit announcements").click();
			cy.url().should("eq", Cypress.config().baseUrl+"/announcements");
		});


		it("it is not possible to go to drop create page from admin page", () => {
			goToAdminPage();
			cy.contains("Create/schedule new drop").click();
			cy.get("div").contains("You are not in the Partner team and thus cannot create a new drop. If you think this is a mistake, please message an Admin.");
		});

		it("is possible to add new admins", () => {
			goToAdminPage();
			cy.contains("Edit Admins team").click();

			cy.get(".MuiPaper-root.Mui-expanded").within(() => {
				cy.get("#email").should("be.visible").type(NEW_SECOND_EMAIL);
				let searchUserButton = cy.get("button").contains("Search user");
				searchUserButton.click();

				cy.contains(`The user with the email "${NEW_SECOND_EMAIL}" is not in the Admins team. You can invite them to the Admins team below.`);
				cy.get("div").contains("Are you sure you want to invite this user to the Admins team?").click();

				cy.get("button").contains("Send invite").click();

				cy.contains(`An invitation to the user with email ${NEW_SECOND_EMAIL} was sent out. It might take a moment until the email is received`);
				return false;
			});
		});

		it("is not possible to add new partner (because user is not in partner team)", () => {
			goToAdminPage();
			cy.contains("Edit Partner team").click();
			cy.contains("You are not in the Partner team and thus cannot add anybody to the Partner team. If you think this is a mistake, please message another Admin.");
		});


		it("is possible to add new partner (after being added to partner team)", () => {
			addUserToTeam("Partner", NEW_EMAIL);
			goToAdminPage();
			cy.contains("Edit Partner team").click();
			cy.get(".MuiPaper-root.Mui-expanded").within(() => {
				cy.get(" #email").should("be.visible").type(NEW_SECOND_EMAIL);

				let searchUserButton = cy.get("button").contains("Search user");
				searchUserButton.click();

				cy.contains(`The user with the email "${NEW_SECOND_EMAIL}" is not in the Partner team. You can invite them to the Partner team below.`);
				cy.get("div").contains("Are you sure you want to invite this user to the Partner team?").click();

				cy.get("button").contains("Send invite").click();

				cy.contains(`An invitation to the user with email ${NEW_SECOND_EMAIL} was sent out. It might take a moment until the email is received`);
				return false;
			});
		});

		it("it is possible to go to drop create page from admin page (after being added to partner team)", () => {
			goToAdminPage();
			cy.contains("Create/schedule new drop").click();
			cy.get("div").contains("Create new drop").click();
			cy.url().should("eq", Cypress.config().baseUrl+"/createNewDrop");
		});
	});

	
	context("Drop creation", () => {
		before(() => {
			addUserToTeam("Admins", NEW_EMAIL);
			addUserToTeam("Partner", NEW_EMAIL);
		});

		beforeEach(() => {
			loginUser();
		});

		it("is possible to review the entered data", () => {
			let NEW_NFT_NAME = "testNFT";
			let NEW_NFT_TOKEN_NAME = "TSTNFT";
			let NEW_NFT_PRICE = "0.01";
			let NEW_NFT_BUY_TIMEOUT = "3600";
			let NEW_NFT_URI_LIST = ["uri1", "uri2", "uri3"];

			cy.visit("/createNewDrop");
			cy.contains("Create new drop");
			cy.get("#newNftName").type(NEW_NFT_NAME);
			cy.get("#newNftTokenName").type(NEW_NFT_TOKEN_NAME);
			cy.get("#newNftPrice").type(NEW_NFT_PRICE);
			cy.get("#reservationTimeoutSeconds").type(NEW_NFT_BUY_TIMEOUT);
			cy.get("#nftUriList").type(NEW_NFT_URI_LIST.join("\n"));

			cy.get("button").contains("Confirm entered data").click();

			cy.contains("Confirm the creation of the drop").should("be.visible");

			cy.contains("3").should("be.visible"); // 3 uris
			cy.contains(NEW_NFT_BUY_TIMEOUT + " seconds").should("be.visible");
			cy.contains(NEW_NFT_PRICE + " ETH").should("be.visible");
			cy.contains(NEW_NFT_NAME).should("be.visible");
			cy.contains(NEW_NFT_TOKEN_NAME).should("be.visible");
			NEW_NFT_URI_LIST.forEach(element => cy.contains(element).should("be.visible"));

		});
	});

	context("Test announcement", () => {
		before(() => {
			addUserToTeam("Admins", NEW_EMAIL);
		});

		beforeEach(() => {
			loginUser();
		});
	
		let now = new Date().valueOf();
		it("check adding, editing and deleting announcement", () => {
			goToLandingPage();
			cy.get(".MuiButton-root > div > .MuiTypography-root").contains("Announcements").click();
			// cy.wait(500);
			
			let userIsAdmin = false;
			let title = "this is title for test announcement, at roughly " + now;
			let shortContent = "short content, for quick test!";
			let content = "and this is a long content for the announcement. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
			let newAnnounceId = 0;
	
			cy.get("body").then($body => {
				if ($body.find("[href=\"/user/admin\"] > div").length > 0) {
					userIsAdmin = true;
				}
				if (userIsAdmin) {
					// Check clear button works
					cy.get("#titleInputText").type(title);
					cy.get("#contentInputText").type(shortContent);
					cy.get("button").contains("Clear").click();
					cy.get("#titleInputText").should("be.empty");
					cy.get("#contentInputText").should("be.empty");
	
					// Check submit button works
					cy.intercept({
						method: "POST",
						url: "/v1/database/collections/" + APP_ANNOUNCEMENTS_COLLECTION_ID + "/documents",
					}).as("apiPostNewAnnouncement");
					cy.get("#titleInputText").type(title);
					cy.get("#contentInputText").type(content);
					cy.get("button").contains("Submit").click();
	
					// Submission is done by sending a POST request
					cy.wait("@apiPostNewAnnouncement").then((interception) => {
						assert.equal(interception.response.statusCode, 201, "POST new announcement success!");
						newAnnounceId = interception.response.body["$id"];
						// cy.wait(500);	// wait for UI to update. 
	
						// After the request had return, we expect the input field to be cleared.
						cy.get("#titleInputText").should("be.empty");
						cy.get("#contentInputText").should("be.empty");
	
						// No support for live update announcements for now, so we have to reload page.
						// There is a bug, that reloading announcement page will not display the editing area,
						// so we have to return to laning page first.
						goToLandingPage();
						cy.get(".MuiButton-root > div > .MuiTypography-root").contains("Announcements").click();
						cy.get("h5").contains(title).should("be.visible");
						
						// Test edit
						goToLandingPage();
						// cy.wait(500);
						cy.get(".MuiButton-root > div > .MuiTypography-root").contains("Announcements").click();
						// cy.wait(500);
						cy.get("#c" + newAnnounceId).within(() => {
							// Prepare interception PATCH request to edit announcement
							cy.intercept({
								method: "PATCH",
								url: "/v1/database/collections/" + APP_ANNOUNCEMENTS_COLLECTION_ID + "/documents/" + newAnnounceId,
							}).as("apiPatchAnnouncement");
							// cy.wait(500);
							// Editing
							cy.get("button").contains("Edit").click();
							cy.get("#edit_title_" + newAnnounceId).type(". EDITED!");
							cy.get("button").contains("Submit").click();
						});
						// Check if edit success
						cy.wait("@apiPatchAnnouncement").then((interception) => {
							assert.equal(interception.response.statusCode, 200, "PATCH old announcement success!");
							// cy.wait(500);
						});
						goToLandingPage();
						// cy.wait(500);
						cy.get(".MuiButton-root > div > .MuiTypography-root").contains("Announcements").click();
						cy.get("h5").contains(title + ". EDITED!").should("be.visible");
						// Test delete
						cy.get("#c" + newAnnounceId).within(() => {
							cy.get("button").contains("Delete").click();
						});
						goToLandingPage();
						// cy.wait(500);
						cy.get(".MuiButton-root > div > .MuiTypography-root").contains("Announcements").click();
						cy.get("#c" + newAnnounceId).should("not.exist");
					});
				}
			});
		});
	});
	
	after(async () => {
		// delete new user
		let users = new sdk.Users(client);
		await users.list(NEW_EMAIL.split("@")[0]).then(allFoundUsers => {
			let newUser = allFoundUsers.users[0];
			return users.delete(newUser.$id);
		});
		await users.list(NEW_SECOND_EMAIL.split("@")[0]).then(allFoundUsers => {
			let newUser = allFoundUsers.users[0];
			return users.delete(newUser.$id);
		});
	});
});

