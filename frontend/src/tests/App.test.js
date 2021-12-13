// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import React from "react";
import { mount } from "@cypress/react";
import App from "../App";

it("renders learn react link", () => {
	cy.viewport(1920, 1080);
	mount(<App />);
	cy.get("a").contains("Sign Up");
	cy.get("a").contains("Profile").should("not.exist");
});