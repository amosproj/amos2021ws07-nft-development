// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import React from "react";
import { mount } from "@cypress/react";
import App from "../../src/App";

it("does not display a profile button for a non logged in user ", () => {
	// cy.setMobileScreenSize();
	mount(<App />);
	cy.get("a").contains("Sign Up");
	cy.get("a").contains("Profile").should("not.exist");
});