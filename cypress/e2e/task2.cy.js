/// <reference types="cypress" />
import HomePage from "../pom/pages/HomePage";
import SignInForm from "../pom/forms/SignInForm";

describe("Interception", () => {
  beforeEach(() => {
    const fakeResponse = {
      "status": "ok",
      "data": {
        "userId": 1,
        "photoFilename": "default-user.png",
        "name": "Polar",
        "lastName": "Bear"
      }
    };

    cy.intercept("GET", "/api/users/profile", fakeResponse).as("getUser");
  });

  it("Changing user name", () => {
    HomePage.visit();
    HomePage.openSignInForm();
    SignInForm.loginWithCredentials(Cypress.env("AUTH_EMAIL"), Cypress.env("AUTH_PASSWORD"));
    cy.wait(1000);
    
    cy.visit("panel/profile");
    
    cy.wait("@getUser").then((interception) => {
      expect(interception.response.body.data.name).to.eq("Polar");
      expect(interception.response.body.data.lastName).to.eq("Bear");
    });
  });
});