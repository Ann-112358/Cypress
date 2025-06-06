/// <reference types="cypress" />
import 'cypress-plugin-api'

let token;
let carId;

describe("API Plugin", () => {
  before(() => {
    cy.api({
      method: "POST",
      url: "/api/auth/signin",
      body: {
        email: Cypress.env("AUTH_EMAIL"),
        password: Cypress.env("AUTH_PASSWORD"),
      },
    }).then((response) => {
      token = response.headers["set-cookie"][0].split(";")[0];
    });
  });

  //POST
  it("Created a new car", () => {
    cy.api({
      method: "POST",
      url: "/api/cars",
      headers: {
        Cookie: token,
      },
      body: {
        carBrandId: 1,
        carModelId: 1,
        mileage: 9000,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.data.brand).to.eq("Audi");
      expect(response.body.data.model).to.eq("TT");
      carId = response.body.data.id;
    });
  });

  //GET
  it("Get current user car", () => {
    cy.api({
      method: "GET",
      url: "/api/cars",
      headers: {
        Cookie: token,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("Get user profile data", () => {
    cy.api({
      method: "GET",
      url: "/api/users/profile",
      headers: {
        Cookie: token,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.lastName).to.eq("Bohachenko");
    });
  });

  //PUT
  it("Update a car", () => {
    cy.api({
      method: "PUT",
      url: `/api/cars/${carId}`,
      headers: {
        Cookie: token,
      },
      body: {
        carBrandId: 1,
        carModelId: 3,
        mileage: 10000,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.brand).to.eq("Audi");
      expect(response.body.data.model).to.eq("Q7");
    });
  });

  it("Update user profile", () => {
    cy.api({
      method: "PUT",
      url: "/api/users/profile",
      headers: {
        Cookie: token,
      },
      body: {
        name: "Hanna",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.name).to.eq("Hanna");
    });
  });
  
  //DELETE
  it("Delete a car", () => {
    cy.api({
      method: "DELETE",
      url: `/api/cars/${carId}`,
      headers: {
        Cookie: token,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});