// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2022 Dominic Heil <d.heil@campus.tu-berlin.de>

import React from "react";
import { mount } from "@cypress/react";
import { BrowserRouter } from "react-router-dom";
import SignUp from "../../src/pages/SignUp";

function setupLoggedInUser() {
	mount(<div style={{ backgroundColor: "black" }}><BrowserRouter><SignUp /></BrowserRouter></div>);
}

Cypress.config("defaultCommandTimeout", 10000);

describe("non logged in user", () => {
	beforeEach(() => {
		cy.enableIntercepts();
		setupLoggedInUser();
	});

	it("should display three inputs and a sign up button", () => {
		cy.get("input").its("length").should("be.gte", 3);
		cy.get("#email").should("be.visible");
		cy.get("#password").should("be.visible");
		cy.get("#username").should("be.visible");
		cy.get("button").contains("Sign Up").should("be.visible");
		cy.contains("Sign up to").should("be.visible");
	});

});





