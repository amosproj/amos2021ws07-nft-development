// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import React from "react";
import { mount } from "@cypress/react";
import App from "../../src/App";
import { desktopScreenSettings } from "../support/commands";

function sharedSetup() {
	mount(<App />);
}

describe("desktop window size", desktopScreenSettings,() => {

	context("non logged in user", () => {
		beforeEach(() => sharedSetup());
		it("does display a sign up and login button", () => {
			cy.get("header").get("a").contains("Sign Up");
			cy.get("header").get("a").contains("Login");
		});

		it("redirects user to login page if login button is pressed", () => {
			cy.get("header").get("a").contains("Login").click();

			cy.url().should("include", "/login");
		});

		it("redirects user to signup page if signup button is pressed", () => {
			cy.get("header").get("a").contains("Sign Up").click();

			cy.url().should("include", "/signup");
		});

		it("does not display profile button", () => {
			cy.get("header").get("a").contains("Profile").should("not.exist");
		});
	});

	describe("user is logged in (mocked)", () => {
		beforeEach(() => {
			cy.intercept("/v1/account", { user: "asd" });
			sharedSetup();
		});

		it("does not display signup/login buttons", () => {
			cy.get("header").get("a").contains("Login").should("not.exist");
			cy.get("header").get("a").contains("Sign Up").should("not.exist");
		});

		it("does display a profile button that redirects to the profile page", () => {
			cy.get("header").get("a").contains("Profile").click();

			cy.url().should("include", "/user/profile");
		});
	});

});
