// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2022 Dominic Heil <d.heil@campus.tu-berlin.de>

import React from "react";
import { mount } from "@cypress/react";
import { BrowserRouter } from "react-router-dom";
import RequestPasswordResetPage from "../../src/pages/RequestPasswordResetPage";

function setupLoggedInUser() {
	mount(<div style={{ backgroundColor: "black" }}><BrowserRouter><RequestPasswordResetPage /></BrowserRouter></div>);
}

Cypress.config("defaultCommandTimeout", 10000);

describe("non logged in user", () => {
	beforeEach(() => {
		cy.enableIntercepts();
		setupLoggedInUser();
	});
	
	it("should display email inputs and a request reset button", () => {
		cy.get("input").its("length").should("be.gte", 1);
		cy.get("#email").should("be.visible");
		cy.get("button").contains("Request password reset").should("be.visible");
		cy.contains("Request Password Reset");
	});

});





