class SignUpForm {

    get signUpButton() {
        return cy.get("button.hero-descriptor_btn")
    }

    get nameField() {
        return cy.get("input#signupName")
    }

    get lastNameField() {
        return cy.get("input#signupLastName")
    }

    get emailField() {
        return cy.get("input#signupEmail")
    }

    get passwordField() {
        return cy.get("input#signupPassword")
    }

    get repeatPasswordField() {
        return cy.get("input#signupRepeatPassword")
    }
    
    get confirmSignUpButton() {
        return cy.get("div.modal-footer>button.btn-primary")
    }

    get successMessage() {
        return cy.get("div.alert-success")
    }

    get error(){
        return cy.get(".invalid-feedback")
    }


    openSignUpForm() {
        this.signUpButton.click();
    }
    
    enterName(name) {
        this.nameField.type(name).blur();
    }

    enterLastName(lastName) {
        this.lastNameField.type(lastName).blur();
    }

    enterEmail(email) {
        this.emailField.type(email).blur();
    }

    enterPassword(password) {
        this.passwordField.type(password).blur();
    }

    enterRepeatPassword(password) {
        this.repeatPasswordField.type(password).blur();
    }   

    clickSignUpButton() {
        this.signUpButton.click();
    }

    signUpWithCredentials(name, lastName, email, password) {
        this.enterName(name);
        this.enterLastName(lastName);
        this.enterEmail(email);
        this.enterPassword(password);
        this.enterRepeatPassword(password);
        this.confirmSignUpButton.click();
    }

    verifySuccessMessage() {
        this.successMessage.should("be.visible").and("contain", "Registration complete");
    }

    verifyDataIsValid(data){
        data.should("have.class", "ng-valid")
    }

    generateErrorByFocusAndBlur(data){
        data.focus().blur();
    }

    verifyDataIsInvalid(data){
        data.should("have.css", "border-color", "rgb(220, 53, 69)")
        .and("have.class", "ng-invalid");
    }

    verifyPasswordIsInvalid(data){
        data.should("have.css", "border-color", "rgb(220, 53, 69)")
        .and("have.class", "is-invalid");
    }

    NameRequiredError(){
        this.error.should("be.visible")
          .and("contain", "Name required");
    }

    NameIsInvalidError(){
        this.error.should("be.visible")
          .and("contain", "Name is invalid");
    }

    NameLengthError(){
        this.error.should("be.visible")
          .and("contain", "Name has to be from 2 to 20 characters long");
    }

    LastNameRequiredError(){
        this.error.should("be.visible")
          .and("contain", "Last name required");
    }

    LastNameIsInvalidError(){
        this.error.should("be.visible")
          .and("contain", "Last name is invalid");
    }

    LastNameLengthError(){
        this.error.should("be.visible")
          .and("contain", "Last name has to be from 2 to 20 characters long");
    }

    EmailRequiredError(){
        this.error.should("be.visible")
          .and("contain", "Email required");
    }

    EmailIsInvalidError(){
        this.error.should("be.visible")
          .and("contain", "Email is incorrect");
    }

    PasswordRequiredError(){
        this.error.should("be.visible")
          .and("contain", "Password required");
    }

    PasswordRequirementsError(){
        this.error.should("be.visible")
          .and("contain", "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter");
    }

    ReEnterPasswordRequiredError(){
        this.error.should("be.visible")
          .and("contain", "Re-enter password required");
    }

    ReEnterPasswordMatchError(){
        this.error.should("be.visible")
          .and("contain", "Passwords do not match");
    }

    ConfirmSignUpButtonIsDisabled(){
        this.confirmSignUpButton.should("be.disabled");
    }           



    



}

export default new SignUpForm();