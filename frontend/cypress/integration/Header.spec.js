// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import React from "react";
import { mount } from "@cypress/react";
import App from "../../src/App";

function sharedSetup() {
	mount(<App />);
}

function sharedDesktopSetup() {
	cy.setDesktopScreenSize();
	sharedSetup();
}
function sharedMobileSetup() {
	cy.setMobileScreenSize();
	sharedSetup();
}

const states = [
	{
		windowSize: "desktop window size",
		isMobileSize: false,
		setupFunction: sharedDesktopSetup
	},
	{
		windowSize: "mobile window size",
		isMobileSize: true,
		setupFunction: sharedMobileSetup
	}
];

describe("tests", () => {
	states.forEach((state) => {
		beforeEach(() => state.setupFunction());
		describe(state.windowSize, () => {

			context("non logged in user", () => {
				it(`does display a sign up and ${state.isMobileSize?"no ":""}login button`, () => {
					cy.get("header").get("a").contains("Sign Up");
					if (state.isMobileSize){
						cy.get("header").get("a").contains("Login").should("not.exist");
					} else {
						cy.get("header").get("a").contains("Login");
					}
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
	});

});


