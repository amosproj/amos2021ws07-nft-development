// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

const sdk = require("node-appwrite");
let client = new sdk.Client();

client
	.setEndpoint(Cypress.env("APP_ENDPOINT"))
	.setProject(Cypress.env("APP_PROJECT"))
	.setKey(Cypress.env("APP_KEY"))
;

const NEW_USERNAME = "testUser123";
const NEW_PASSWORD = "testPassword123";
const NEW_EMAIL = "newEmailAddress@example.io";

function sharedSetup() {
	cy.visit("/");
}

function sharedDesktopSetup() {
	cy.setDesktopScreenSize();
	sharedSetup();
}


describe("desktop window sizw", () => {
	beforeEach(() => {
		sharedDesktopSetup();
	});

	it("registers a new user", () => {
		cy.get("a").contains("Sign Up").click();
		cy.url().should("include", "/signup");

		cy.get("input").get("#username").type(NEW_USERNAME);
		cy.get("input").get("#email").type(NEW_EMAIL);
		cy.get("input").get("#password").type(NEW_PASSWORD);

		cy.get("main").get("button").contains("Sign Up").click();

		cy.get("main").contains("We sent you a confirmation email. Please confirm your registration!");
	});


	it("logs new user in and out", () => {
		cy.get("header").get("a").contains("Login").click();

		cy.get("input").get("#email").type(NEW_EMAIL);
		cy.get("input").get("#password").type(NEW_PASSWORD);

		cy.get("main").get("button").contains("Sign In").click();
		cy.url().should("eq", Cypress.config().baseUrl+"/");

		cy.get("header").get("a").contains("Profile").click();
		cy.get("main").get("button").contains("Logout").click();
		cy.url().should("eq", Cypress.config().baseUrl+"/");
	});


	after(async () => {
		// delete new user
		let users = new sdk.Users(client);
		await users.list(NEW_EMAIL.split("@")[0]).then(allFoundUsers => {
			let newUser = allFoundUsers.users[0];
			return users.delete(newUser.$id);
		});
	});
});

