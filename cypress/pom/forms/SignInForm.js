class SignInForm {

    get emailField() {
        return cy.get('#signinEmail');
    }

    get passwordField() {
        return cy.get('#signinPassword');
    }

    get signInButton() {
        return cy.get('app-signin-modal .btn-primary');
    }

    get wrongDataMessage() {
        return cy.contains('Wrong email or password');
    }

    get incorrectEmailMessage() {
        return cy.contains('Email is incorrect');
    }

    get requiredEmailMessage() {
        return cy.contains('Email is required');
    }

    enterEmail(email) {
        this.emailField.type(email);
    }

    enterPassword(password) {
        this.passwordField.type(password);
    }

    clickSignInButton() {
        this.signInButton.click();
    }

    loginWithCredentials(email, password) {
        this.enterEmail(email);
        this.enterPassword(password);
        this.clickSignInButton();
    }
}

export default new SignInForm();