// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2022 Dominic Heil <d.heil@campus.tu-berlin.de>

import React from "react";
import { mount } from "@cypress/react";
import LandingPage from "../../src/pages/LandingPage";
import { BrowserRouter } from "react-router-dom";

function setupNonLoggedInUser() {
	mount(<div style={{ backgroundColor: "black" }}><BrowserRouter><LandingPage /></BrowserRouter></div>);
}

function setupLoggedInUser() {
	mount(<div style={{ backgroundColor: "black" }}><BrowserRouter><LandingPage user={{ user: "asd" }}/></BrowserRouter></div>);
}
Cypress.config("defaultCommandTimeout", 10000);

describe("non logged in user", () => {
	beforeEach(() => {
		cy.enableIntercepts();
		setupNonLoggedInUser();
	});

	context("redirect to announcements", () => {

		it("is possible to redirect to announcements", () => {
			cy.get("a").contains("Announcements").get("[href=\"/announcements\"]").should("be.visible").click();
			cy.url().should("include", "/announcements");
		});

		it("is possible to redirect to sign up", () => {
			cy.contains("Sign Up").click();
			cy.url().should("include", "/signup");
		});

		it("is possible not to redirect to profile", () => {
			cy.contains("Profile").should("not.exist");
		});

		it("displays a banned with welcome info", () => {
			cy.contains("Welcome to NFT The World!");
		});

	});

});



describe("logged in user", () => {
	beforeEach(() => {
		cy.intercept("/v1/account", { user: "asd" });
		cy.intercept("/v1/teams", { "sum":1,"teams":[{ "$id":"6191549c46fd5","name":"Admins","dateCreated":1636914332,"sum":30 }] });
		cy.intercept("/v1/database/collections/**", { documents:[] });
		cy.setDesktopScreenSize();
		setupLoggedInUser();
	});

	context("redirect to announcements", () => {

		it("is possible to redirect to profile when logged in", () => {
			cy.contains("Profile").click();
			cy.url().should("include", "/user/profile");
		});

		it("displays a banned with welcome info", () => {
			cy.contains("Welcome to NFT The World!");
		});
	});

});



