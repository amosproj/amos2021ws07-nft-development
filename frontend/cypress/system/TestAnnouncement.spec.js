// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Que Le <b.le@tu-berlin.de>

Cypress.config("defaultCommandTimeout", 10000);


function sharedSetup() {
	goToLandingPage();
}

function sharedDesktopSetup() {
	cy.setDesktopScreenSize();
	sharedSetup();
}

function goToLandingPage() {
	cy.visit("/");
}

function goToLoginPageAndWaitForUserAuth() {
	cy.get("[href=\"/login\"] > div").should("be.visible").click().pause();
}


describe("desktop window size", () => {
	beforeEach(() => {
		sharedDesktopSetup();
	});

	it("go to login page and enter auth data", () => {
		goToLoginPageAndWaitForUserAuth();
	});

	it("check if announcement links are clickable", () => {
		// Test the announcement link
		cy.get(".MuiButton-root > div > .MuiTypography-root").should("be.visible").click();
		cy.location().should((loc) => {
			expect(loc.href).to.eq(
				"http://localhost:3000/announcements"
			);
		});
		goToLandingPage();

		// Test the readme links of a announcement element
		cy.get("a[href*=\"announcements#\"]").first().click();
		cy.url().then(urlString => {
			let currentIdInURL;
			let userIsAdmin = false;
			currentIdInURL = urlString.split("#")[1];
			cy.get("body").then($body => {
				if ($body.find("[href=\"/user/admin\"] > div").length > 0) {
					userIsAdmin = true;
				}
				if (userIsAdmin) {
					cy.get("#c" + currentIdInURL)
						.find(".MuiCollapse-root")
						.should("have.length", 1);
				}
			});
		});
	});

	let now = new Date().valueOf();
	it("check adding, editing and deleting announcement", () => {
		goToLandingPage();
		cy.get(".MuiButton-root > div > .MuiTypography-root").contains("Announcements").click();
		// cy.wait(500);
		
		let userIsAdmin = false;
		let title = "this is title for test announcement, at roughly " + now;
		let shortContent = "short content, for quick test!";
		let content = "and this is a long content for the announcement. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
		let newAnnounceId = 0;

		cy.get("body").then($body => {
			if ($body.find("[href=\"/user/admin\"] > div").length > 0) {
				userIsAdmin = true;
			}
			if (userIsAdmin) {
				// Check clear button works
				cy.get("#titleInputText").type(title);
				cy.get("#contentInputText").type(shortContent);
				cy.get("button").contains("Clear").click();
				cy.get("#titleInputText").should("be.empty");
				cy.get("#contentInputText").should("be.empty");

				// Check submit button works
				cy.intercept({
					method: "POST",
					url: "/v1/database/collections/61af9f575b2b0/documents",
				}).as("apiPostNewAnnouncement");
				cy.get("#titleInputText").type(title);
				cy.get("#contentInputText").type(content);
				cy.get("button").contains("Submit").click();

				// Submission is done by sending a POST request
				cy.wait("@apiPostNewAnnouncement").then((interception) => {
					assert.equal(interception.response.statusCode, 201, "POST new announcement success!");
					newAnnounceId = interception.response.body["$id"];
					// cy.wait(500);	// wait for UI to update. 

					// After the request had return, we expect the input field to be cleared.
					cy.get("#titleInputText").should("be.empty");
					cy.get("#contentInputText").should("be.empty");

					// No support for live update announcements for now, so we have to reload page.
					// There is a bug, that reloading announcement page will not display the editing area,
					// so we have to return to laning page first.
					goToLandingPage();
					cy.get(".MuiButton-root > div > .MuiTypography-root").contains("Announcements").click();
					cy.get("h5").contains(title).should("be.visible");
					
					// Test edit
					goToLandingPage();
					// cy.wait(500);
					cy.get(".MuiButton-root > div > .MuiTypography-root").contains("Announcements").click();
					// cy.wait(500);
					cy.get("#c" + newAnnounceId).within(() => {
						// Prepare interception PATCH request to edit announcement
						cy.intercept({
							method: "PATCH",
							url: "/v1/database/collections/61af9f575b2b0/documents/" + newAnnounceId,
						}).as("apiPatchAnnouncement");
						// cy.wait(500);
						// Editing
						cy.get("button").contains("Edit").click();
						cy.get("#edit_title_" + newAnnounceId).type(". EDITED!");
						cy.get("button").contains("Submit").click();
					});
					// Check if edit success
					cy.wait("@apiPatchAnnouncement").then((interception) => {
						assert.equal(interception.response.statusCode, 200, "PATCH old announcement success!");
						// cy.wait(500);
					});
					goToLandingPage();
					// cy.wait(500);
					cy.get(".MuiButton-root > div > .MuiTypography-root").contains("Announcements").click();
					cy.get("h5").contains(title + ". EDITED!").should("be.visible");
					// Test delete
					cy.get("#c" + newAnnounceId).within(() => {
						cy.get("button").contains("Delete").click();
					});
					goToLandingPage();
					// cy.wait(500);
					cy.get(".MuiButton-root > div > .MuiTypography-root").contains("Announcements").click();
					cy.get("#c" + newAnnounceId).should("not.exist");
				});
			}
		});
	});
});