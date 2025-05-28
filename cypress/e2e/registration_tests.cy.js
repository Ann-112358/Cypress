/// <reference types="cypress" />

const email = `bohachenko.anna+test${Date.now()}@gmail.com`;
const password = `Qwerty123456`;

describe("open registration form", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("button.hero-descriptor_btn").should("be.visible").click();
  });

  describe('Field "Name"', () => {
    context("Positive cases", () => {
      it("Name with 2 letters is valid", () => {
        cy.get("input#signupName").should("be.visible").type("Li").blur();
        cy.get("input#signupName").should("have.class", "ng-valid");
      });

      it("Name with 20 letters is valid", () => {
        cy.get("input#signupName")
          .should("be.visible")
          .type("A".repeat(20))
          .blur();
        cy.get("input#signupName").should("have.class", "ng-valid");
      });
    });

    context("Negative cases", () => {
      it("Name is required", () => {
        cy.get("input#signupName").focus().blur();
        cy.get("input#signupName")
          .should("have.css", "border-color", "rgb(220, 53, 69)")
          .and("have.class", "ng-invalid");
        cy.get(".invalid-feedback")
          .should("be.visible")
          .and("contain", "Name required");
      });

      it("Only English letters are allowed", () => {
        cy.get("input#signupName").type("Анна").blur();
        cy.get("input#signupName")
          .should("have.css", "border-color", "rgb(220, 53, 69)")
          .and("have.class", "ng-invalid");
        cy.get(".invalid-feedback")
          .should("be.visible")
          .and("contain", "Name is invalid");
      });

      it("Name with 1 letter is invalid", () => {
        cy.get("input#signupName").type("A").blur();
        cy.get("input#signupName")
          .should("have.css", "border-color", "rgb(220, 53, 69)")
          .and("have.class", "ng-invalid");
        cy.get(".invalid-feedback")
          .should("be.visible")
          .and("contain", "Name has to be from 2 to 20 characters long");
      });

      it("Name with 21 letters is invalid", () => {
        cy.get("input#signupName").type("A".repeat(21)).blur();
        cy.get("input#signupName")
          .should("have.css", "border-color", "rgb(220, 53, 69)")
          .and("have.class", "ng-invalid");
        cy.get(".invalid-feedback")
          .should("be.visible")
          .and("contain", "Name has to be from 2 to 20 characters long");
      });
    });
  });

  describe('Field "Last Name"', () => {
    context("Positive cases", () => {
      it("Last Name with 2 letters is valid", () => {
        cy.get("input#signupLastName").type("Pi").blur();
        cy.get("input#signupLastName").should("have.class", "ng-valid");
      });

      it("Last Name with 20 letters is valid", () => {
        cy.get("input#signupLastName").type("A".repeat(20)).blur();
        cy.get("input#signupLastName").should("have.class", "ng-valid");
      });
    });

    context("Negative cases", () => {
      it("Last Name is required", () => {
        cy.get("input#signupLastName").focus().blur();
        cy.get("input#signupLastName")
          .should("have.css", "border-color", "rgb(220, 53, 69)")
          .and("have.class", "ng-invalid");
        cy.get(".invalid-feedback")
          .should("be.visible")
          .and("contain", "Last name required");
      });

      it("Only English letters are allowed", () => {
        cy.get("input#signupLastName").type("Анна").blur();
        cy.get("input#signupLastName")
          .should("have.css", "border-color", "rgb(220, 53, 69)")
          .and("have.class", "ng-invalid");
        cy.get(".invalid-feedback")
          .should("be.visible")
          .and("contain", "Last name is invalid");
      });

      it("Last Name with 1 letter is invalid", () => {
        cy.get("input#signupLastName").type("A").blur();
        cy.get("input#signupLastName")
          .should("have.css", "border-color", "rgb(220, 53, 69)")
          .and("have.class", "ng-invalid");
        cy.get(".invalid-feedback")
          .should("be.visible")
          .and("contain", "Last name has to be from 2 to 20 characters long");
      });

      it("Last Name with 21 letters is invalid", () => {
        cy.get("input#signupLastName").type("A".repeat(21)).blur();
        cy.get("input#signupLastName")
          .should("have.css", "border-color", "rgb(220, 53, 69)")
          .and("have.class", "ng-invalid");
        cy.get(".invalid-feedback")
          .should("be.visible")
          .and("contain", "Last name has to be from 2 to 20 characters long");
      });
    });
  });

  describe('Field "Email"', () => {
    context("Positive cases", () => {
      it("Email is valid", () => {
        cy.get("input#signupEmail").type(`${email}`).blur();
        cy.get("input#signupEmail").should("have.class", "ng-valid");
      });
    });

    context("Negative cases", () => {
      it("Email is required", () => {
        cy.get("input#signupEmail").focus().blur();
        cy.get("input#signupEmail")
          .should("have.css", "border-color", "rgb(220, 53, 69)")
          .and("have.class", "ng-invalid");
        cy.get(".invalid-feedback")
          .should("be.visible")
          .and("contain", "Email required");
      });

      it("Email is invalid", () => {
        cy.get("input#signupEmail").type("anna.bohachenko").blur();
        cy.get("input#signupEmail")
          .should("have.css", "border-color", "rgb(220, 53, 69)")
          .and("have.class", "ng-invalid");
        cy.get(".invalid-feedback")
          .should("be.visible")
          .and("contain", "Email is incorrect");
      });
    });
  });

  describe('Field "Password"', () => {
    context("Positive cases", () => {
      it("Password with 15 letters is valid", () => {
        cy.get("input#signupPassword").type("Qwerty123456789").blur();
        cy.get("input#signupPassword").should("have.class", "ng-valid");
      });

      it("Password with 8 letters is valid", () => {
        cy.get("input#signupPassword").type("Qwerty12").blur();
        cy.get("input#signupPassword").should("have.class", "ng-valid");
      });
    });

    context("Negative cases", () => {
      it("Password is required", () => {
        cy.get("input#signupPassword").focus().blur();
        cy.get("input#signupPassword")
          .should("have.css", "border-color", "rgb(220, 53, 69)")
          .and("have.class", "ng-invalid");
        cy.get(".invalid-feedback")
          .should("be.visible")
          .and("contain", "Password required");
      });

      it("Password with 7 letters is invalid", () => {
        cy.get("input#signupPassword").type("Qwerty1").blur();
        cy.get("input#signupPassword")
          .should("have.css", "border-color", "rgb(220, 53, 69)")
          .and("have.class", "ng-invalid");
        cy.get(".invalid-feedback")
          .should("be.visible")
          .and(
            "contain",
            "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
          );
      });

      it("Password with 16 letters is invalid", () => {
        cy.get("input#signupPassword").type("Qwerty1234567890").blur();
        cy.get("input#signupPassword")
          .should("have.css", "border-color", "rgb(220, 53, 69)")
          .and("have.class", "ng-invalid");
        cy.get(".invalid-feedback")
          .should("be.visible")
          .and(
            "contain",
            "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
          );
      });

      it("1 integer is required", () => {
        cy.get("input#signupPassword").type("NoInteger").blur();
        cy.get("input#signupPassword")
          .should("have.css", "border-color", "rgb(220, 53, 69)")
          .and("have.class", "ng-invalid");
        cy.get(".invalid-feedback")
          .should("be.visible")
          .and(
            "contain",
            "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
          );
      });

      it("1 capital letter is required", () => {
        cy.get("input#signupPassword").type("nocapital1etter").blur();
        cy.get("input#signupPassword")
          .should("have.css", "border-color", "rgb(220, 53, 69)")
          .and("have.class", "ng-invalid");
        cy.get(".invalid-feedback")
          .should("be.visible")
          .and(
            "contain",
            "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
          );
      });

      it("1 small letter is required", () => {
        cy.get("input#signupPassword").type("NOSMALLLETTER1").blur();
        cy.get("input#signupPassword")
          .should("have.css", "border-color", "rgb(220, 53, 69)")
          .and("have.class", "ng-invalid");
        cy.get(".invalid-feedback")
          .should("be.visible")
          .and(
            "contain",
            "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
          );
      });
    });
  });

  describe('Field "Re-enter password"', () => {
    context("Positive cases", () => {
      it("Re-enter password is valid", () => {
        cy.get("input#signupPassword").type(`${password}`);
        cy.get("input#signupRepeatPassword").type(`${password}`).blur();
        cy.get("input#signupRepeatPassword").should("have.class", "ng-valid");
      });
    });

    context("Negative cases", () => {
      it("Re-enter password is required", () => {
        cy.get("input#signupRepeatPassword").focus().blur();
        cy.get("input#signupRepeatPassword")
          .should("have.css", "border-color", "rgb(220, 53, 69)")
          .and("have.class", "ng-invalid");
        cy.get(".invalid-feedback")
          .should("be.visible")
          .and("contain", "Re-enter password required");
      });

      it("Re-enter password is invalid", () => {
        cy.get("input#signupPassword").type(`${password}`);
        cy.get("input#signupRepeatPassword").type("12345Qwerty").blur();
        cy.get("input#signupRepeatPassword")
          .should("have.css", "border-color", "rgb(220, 53, 69)")
          .and("have.class", "is-invalid");
        cy.get(".invalid-feedback")
          .should("be.visible")
          .and("contain", "Passwords do not match");
      });
    });
  });

  describe("Sending form", () => {
    context("Positive cases", () => {
      it("New User is created when data is correct", () => {
        cy.get("input#signupName").type("Anna");
        cy.get("input#signupLastName").type("Bohachenko");
        cy.get("input#signupEmail").type(`${email}`);
        cy.get("input#signupPassword").type(`${password}`);
        cy.get("input#signupRepeatPassword").type(`${password}`).blur();
        cy.get("div.modal-footer>button.btn-primary").click();
        cy.get("div.alert-success")
          .should("be.visible")
          .and("contain", "Registration complete");
      });
    });

    context("Negative cases", () => {
      it("[Register] button is disabled when form is empty", () => {
        cy.get("button.btn-primary").should("be.disabled");
      });
      it("[Register] button is disabled when data is incorrect", () => {
        cy.get("input#signupName").type("Anna");
        cy.get("input#signupLastName").type("Bohachenko");
        cy.get("input#signupEmail").type(`${email}`);
        cy.get("input#signupPassword").type(`${password}`);
        cy.get("input#signupRepeatPassword").type(`qwerty54321`).blur();
        cy.get("button.btn-primary").should("be.disabled");
      });
    });
  });
});
