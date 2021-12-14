// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import React from "react";
import { mount } from "@cypress/react";
import App from "../../src/App";

function sharedMobileSetup() {
	mount(<App />);
}

describe("mobile window size", {
	viewportHeight: 812,
	viewportWidth: 375
},() => {

	context("non logged in user", () => {

		beforeEach(() => sharedMobileSetup());

		it("does display a sign up and no login button", () => {
			cy.get("header").get("a").contains("Sign Up");
			cy.get("header").get("a").get("Login").should("not.exist");
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
			sharedMobileSetup();
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

