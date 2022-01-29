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
const SECOND_NEW_PASSWORD = "newTestPw123";
const NEW_EMAIL = "newEmailAddress@example.io";

// const NON_EXISTING_USER_EMAIL = "nonexistentMail@example.com";

function sharedSetup() {
	goToLandingPage();
}

function sharedDesktopSetup() {
	cy.setDesktopScreenSize();
	sharedSetup();
}

function goToProfile() {
	cy.get("header").get("a").contains("Profile").click();
}

function goToLandingPage() {
	cy.visit("/");
}

function loginUser(password=NEW_PASSWORD) {
	cy.get("header").get("a").contains("Login").click();

	cy.get("input").get("#email").type(NEW_EMAIL);
	cy.get("input").get("#password").type(password);

	cy.get("main").get("button").contains("Sign In").click();
	cy.url().should("eq", Cypress.config().baseUrl+"/");
}

function logoutUser() {
	goToProfile();
	cy.get("main").get("button").contains("Logout").click();
	cy.url().should("eq", Cypress.config().baseUrl+"/");
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
			cy.get("#Change\\ password0").type(NEW_PASSWORD);
			cy.get("#Change\\ password1").type(SECOND_NEW_PASSWORD);
			cy.get("#Change\\ password2").type(SECOND_NEW_PASSWORD);

			cy.get("p").contains("Save new password").click();
			cy.get("div").contains("Password has changed");

			logoutUser();
			loginUser(SECOND_NEW_PASSWORD);
			goToProfile();

			cy.get("#Change\\ password0").type(SECOND_NEW_PASSWORD);
			cy.get("#Change\\ password1").type(NEW_PASSWORD);
			cy.get("#Change\\ password2").type(NEW_PASSWORD);

			cy.get("p").contains("Save new password").click();
			cy.get("div").contains("Password has changed");
		});
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

