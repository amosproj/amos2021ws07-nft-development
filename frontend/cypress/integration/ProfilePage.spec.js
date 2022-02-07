// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2022 Dominic Heil <d.heil@campus.tu-berlin.de>

import React from "react";
import { mount } from "@cypress/react";
import { BrowserRouter } from "react-router-dom";
import Profile from "../../src/pages/Profile";

function setupLoggedInUser() {
	mount(<div style={{ backgroundColor: "black" }}><BrowserRouter><Profile user={{ email: "test@mail.com", name: "testName" }} setUser={() => {}}/></BrowserRouter></div>);
}

Cypress.config("defaultCommandTimeout", 10000);

describe("non logged in user", () => {
	beforeEach(() => {
		cy.enableIntercepts();
		cy.setDesktopScreenSize();
		setupLoggedInUser();
	});

	context("redirect to announcements", () => {

		it("username, email and change password info texts are displayed", () => {
			cy.contains("Username").should("be.visible");
			cy.contains("Email").should("be.visible");
			cy.contains("Change password").should("be.visible");

		});

		it("username, email and change password inputs are displayed", () => {
			cy.get("input").get("#Username0");
			cy.get("input").get("#Email0");
			cy.get("input").get("#Change\\ password0");
		});

		it("should display connect MetaMask Wallet button", function () {
			cy.get("button").contains("Connect MetaMask Wallet");
		});

		it("should display connect logout button", function () {
			cy.get("button").contains("Logout");
		});

		it("should redirect to logout after logout was pressed", function () {
			cy.get("button").contains("Logout").click();
			cy.url().should("not.include", "/user/profile");
		});

		it("should redirect to nft collection after clicking nft collection button", function () {
			cy.get("a").contains("NFT collection").click();
			cy.url().should("include", "/user/myCollection");
		});

	});

});





