// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

export const mobileScreenSettings = {
	viewportHeight: 812,
	viewportWidth: 375
};

export const desktopScreenSettings = {
	viewportHeight: 1080,
	viewportWidth: 1920
};

Cypress.Commands.add("setDesktopScreenSize", () => cy.viewport(1920, 1080));

Cypress.Commands.add("setMediumScreenSize", () => cy.viewport(540, 960));

Cypress.Commands.add("setMobileScreenSize", () => cy.viewport(375, 812)); // iPhone X resolution