/// <reference types="cypress" />

let token;

describe("Car API", () => {
  before(() => {
    cy.request({
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

  //Create a new car
  it("Create a new car [Audi R8]", () => {
    cy.request({
      method: "POST",
      url: "/api/cars",
      headers: {
        Cookie: token,
      },
      body: {
        carBrandId: 1,
        carModelId: 2,
        mileage: 1000,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.status).to.eq("ok");
      expect(response.body).to.have.property("data");
      expect(response.body.data.brand).to.eq("Audi");
      expect(response.body.data.model).to.eq("R8");
      expect(response.body.data.mileage).to.eq(1000);
    });
  });

  it("Create a new car [Audi Q7]", () => {
    cy.request({
      method: "POST",
      url: "/api/cars",
      headers: {
        Cookie: token,
      },
      body: {
        carBrandId: 1,
        carModelId: 3,
        mileage: 2000,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.status).to.eq("ok");
      expect(response.body).to.have.property("data");
      expect(response.body.data.brand).to.eq("Audi");
      expect(response.body.data.model).to.eq("Q7");
      expect(response.body.data.mileage).to.eq(2000);
    });
  });

  //Edit existing car
  it("Edit existing car [Audi R8] to [Audi TT]", () => {
    cy.request({
      method: "POST",
      url: "/api/cars",
      headers: {
        Cookie: token,
      },
      body: {
        carBrandId: 1,
        carModelId: 1,
        mileage: 3000,
      },
    }).then((response) => {
      cy.request({
        method: "PUT",
        url: `/api/cars/${response.body.data.id}`,
        headers: {
          Cookie: token,
        },
        body: {
          carModelId: 4,
          mileage: 8000,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.status).to.eq("ok");
        expect(response.body.data.model).to.eq("TT");
        expect(response.body.data.mileage).to.eq(8000);
      });
    });
  });

  //Get current user cars
  it("Get current user cars", () => {
    cy.request({
      method: "GET",
      url: "/api/cars",
      headers: {
        Cookie: token,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq("ok");
      expect(response.body).to.have.property("data");
      expect(response.body.data.length).to.eq(3);
    });
  });

  //Delete all cars
  it("Delete all cars", () => {
    cy.request({
      method: "GET",
      url: "/api/cars",
      headers: {
        Cookie: token,
      },
    }).then((response) => {
      response.body.data.forEach((car) => {
        cy.request({
          method: "DELETE",
          url: `/api/cars/${car.id}`,
          headers: {
            Cookie: token,
          },
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.status).to.eq("ok");
        });
      });
    });
  });
});
