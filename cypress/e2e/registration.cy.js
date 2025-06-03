/// <reference types="cypress" />
import SignUpForm from "../pom/forms/SignUpForm.js";
import HomePage from "../pom/pages/HomePage.js";

describe("open registration form", () => {
  beforeEach(() => {
    HomePage.visit();
    SignUpForm.openSignUpForm();
  });

  describe('Field "Name"', () => {
    context("Positive cases", () => {
      it("Name with 2 letters is valid", () => {
        SignUpForm.enterName("Li")  ;
        SignUpForm.verifyDataIsValid(SignUpForm.nameField);
      });

      it("Name with 20 letters is valid", () => {
        SignUpForm.enterName("A".repeat(20));
        SignUpForm.verifyDataIsValid(SignUpForm.nameField);
      });
    });

    context("Negative cases", () => {
      it("Name is required", () => {
        SignUpForm.generateErrorByFocusAndBlur(SignUpForm.nameField);
        SignUpForm.verifyDataIsInvalid(SignUpForm.nameField);
        SignUpForm.NameRequiredError();
      });

      it("Only English letters are allowed", () => {
        SignUpForm.enterName("Анна");
        SignUpForm.verifyDataIsInvalid(SignUpForm.nameField);
        SignUpForm.NameIsInvalidError();
      });

      it("Name with 1 letter is invalid", () => {
        SignUpForm.enterName("A");
        SignUpForm.verifyDataIsInvalid(SignUpForm.nameField);
        SignUpForm.NameLengthError();
      });

      it("Name with 21 letters is invalid", () => {
        SignUpForm.enterName("A".repeat(21));
        SignUpForm.verifyDataIsInvalid(SignUpForm.nameField);
        SignUpForm.NameLengthError();
      });
    });
  });

  describe('Field "Last Name"', () => {
    context("Positive cases", () => {
      it("Last Name with 2 letters is valid", () => {
        SignUpForm.enterLastName("Pi")  ;
        SignUpForm.verifyDataIsValid(SignUpForm.lastNameField);
      });

      it("Last Name with 20 letters is valid", () => {
        SignUpForm.enterLastName("A".repeat(20));
        SignUpForm.verifyDataIsValid(SignUpForm.lastNameField);
      });
    });

    context("Negative cases", () => {
      it("Last Name is required", () => {
        SignUpForm.generateErrorByFocusAndBlur(SignUpForm.lastNameField);
        SignUpForm.verifyDataIsInvalid(SignUpForm.lastNameField);
        SignUpForm.LastNameRequiredError();
      });

      it("Only English letters are allowed", () => {
        SignUpForm.enterLastName("Анна");
        SignUpForm.verifyDataIsInvalid(SignUpForm.lastNameField);
        SignUpForm.LastNameIsInvalidError();
      });

      it("Last Name with 1 letter is invalid", () => {
        SignUpForm.enterLastName("A");
        SignUpForm.verifyDataIsInvalid(SignUpForm.lastNameField);
        SignUpForm.LastNameLengthError();
      });

      it("Last Name with 21 letters is invalid", () => {
        SignUpForm.enterLastName("A".repeat(21));
        SignUpForm.verifyDataIsInvalid(SignUpForm.lastNameField);
        SignUpForm.LastNameLengthError();
      });
    });
  });

  describe('Field "Email"', () => {
    context("Positive cases", () => {
      it("Email is valid", () => {
        SignUpForm.enterEmail(Cypress.env('AUTH_EMAIL'));
        SignUpForm.verifyDataIsValid(SignUpForm.emailField);
      });
    });

    context("Negative cases", () => {
      it("Email is required", () => {
        SignUpForm.generateErrorByFocusAndBlur(SignUpForm.emailField);
        SignUpForm.verifyDataIsInvalid(SignUpForm.emailField);
        SignUpForm.EmailRequiredError();
      });

      it("Email is invalid", () => {
        SignUpForm.enterEmail("anna.bohachenko");
        SignUpForm.verifyDataIsInvalid(SignUpForm.emailField);
        SignUpForm.EmailIsInvalidError();
      });
    });
  });

  describe('Field "Password"', () => {
    context("Positive cases", () => {
      it("Password with 15 letters is valid", () => {
        SignUpForm.enterPassword("Qwerty123456789");
        SignUpForm.verifyDataIsValid(SignUpForm.passwordField);
      });

      it("Password with 8 letters is valid", () => {
        SignUpForm.enterPassword("Qwerty12");
        SignUpForm.verifyDataIsValid(SignUpForm.passwordField);
      });
    });

    context("Negative cases", () => {
      it("Password is required", () => {
        SignUpForm.generateErrorByFocusAndBlur(SignUpForm.passwordField);
        SignUpForm.verifyDataIsInvalid(SignUpForm.passwordField);
        SignUpForm.PasswordRequiredError();
      });

      it("Password with 7 letters is invalid", () => {
        SignUpForm.enterPassword("Qwerty1");
        SignUpForm.verifyDataIsInvalid(SignUpForm.passwordField);
        SignUpForm.PasswordRequirementsError();
      });

      it("Password with 16 letters is invalid", () => {
        SignUpForm.enterPassword("Qwerty1234567890");
        SignUpForm.verifyDataIsInvalid(SignUpForm.passwordField);
        SignUpForm.PasswordRequirementsError();
      });

      it("1 integer is required", () => {
        SignUpForm.enterPassword("NoInteger");
        SignUpForm.verifyDataIsInvalid(SignUpForm.passwordField);
        SignUpForm.PasswordRequirementsError();
      });

      it("1 capital letter is required", () => {
        SignUpForm.enterPassword("nocapital1etter");
        SignUpForm.verifyDataIsInvalid(SignUpForm.passwordField);
        SignUpForm.PasswordRequirementsError();
      });

      it("1 small letter is required", () => {
        SignUpForm.enterPassword("NOSMALLLETTER1");
        SignUpForm.verifyDataIsInvalid(SignUpForm.passwordField);
        SignUpForm.PasswordRequirementsError();
      });
    });
  });

  describe('Field "Re-enter password"', () => {
    context("Positive cases", () => {
      it("Re-enter password is valid", () => {
        SignUpForm.enterPassword(Cypress.env('AUTH_PASSWORD'));
        SignUpForm.enterRepeatPassword(Cypress.env('AUTH_PASSWORD'));
        SignUpForm.verifyDataIsValid(SignUpForm.repeatPasswordField);
      });
    });

    context("Negative cases", () => {
      it("Re-enter password is required", () => {
        SignUpForm.generateErrorByFocusAndBlur(SignUpForm.repeatPasswordField);
        SignUpForm.verifyDataIsInvalid(SignUpForm.repeatPasswordField);
        SignUpForm.ReEnterPasswordRequiredError();
      });

      it("Re-enter password is invalid", () => {
        SignUpForm.enterPassword(Cypress.env('AUTH_PASSWORD'));
        SignUpForm.enterRepeatPassword("12345Qwerty");
        SignUpForm.verifyPasswordIsInvalid(SignUpForm.repeatPasswordField);
        SignUpForm.ReEnterPasswordMatchError();
      });
    });
  });

  describe("Sending form", () => {
    context("Positive cases", () => {
      it("New User is created when data is correct", () => {
        SignUpForm.signUpWithCredentials("Anna", "Bohachenko", Cypress.env('AUTH_EMAIL'), Cypress.env('AUTH_PASSWORD'));
        SignUpForm.verifySuccessMessage
      });
    });

    context("Negative cases", () => {
      it("[Register] button is disabled when form is empty", () => {
        SignUpForm.ConfirmSignUpButtonIsDisabled();
      });
      it("[Register] button is disabled when data is incorrect", () => {
        SignUpForm.enterName("Anna");
        SignUpForm.enterLastName("Bohachenko");
        SignUpForm.enterEmail(Cypress.env('AUTH_EMAIL'));
        SignUpForm.enterPassword(Cypress.env('AUTH_PASSWORD'));
        SignUpForm.enterRepeatPassword(`Qwerty54321`);
        SignUpForm.ReEnterPasswordMatchError();
        SignUpForm.ConfirmSignUpButtonIsDisabled();
      });
    });
  });
});
