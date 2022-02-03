// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2022 Dominic Heil <d.heil@campus.tu-berlin.de>

import React from "react";
import { mount } from "@cypress/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../../src/pages/Login";

function setupLoggedInUser() {
	mount(<div style={{ backgroundColor: "black" }}><BrowserRouter><Login /></BrowserRouter></div>);
}

Cypress.config("defaultCommandTimeout", 10000);

describe("non logged in user", () => {
	beforeEach(() => {
		cy.enableIntercepts();
		setupLoggedInUser();
	});

	it("should display two inputs and a sign in button", () => {
		cy.get("input").its("length").should("be.gte", 2);
		cy.get("#email").should("be.visible");
		cy.get("#password").should("be.visible");
		cy.get("button").contains("Sign In").should("be.visible");
		cy.contains("Sign in to").should("be.visible");
	});

});