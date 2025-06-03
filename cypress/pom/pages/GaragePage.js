class GaragePage {

    get addCarButton() {
        return cy.get('app-garage .btn-primary');
    }

    get brandDropdown() {
        return cy.get('#addCarBrand');
    }

    get modelDropdown() {
        return cy.get('#addCarModel');
    }

    get mileageField() {
        return cy.get('#addCarMileage');
    }
    
    get submitAddCarButton() {
        return cy.get('app-add-car-modal .btn-primary');
    }

    get cancelAddCarButton() {
        return cy.get('app-add-car-modal .btn-secondary');
    }

    get addNewCarFormHeader() {
        return cy.get('.modal-header');
    }

    get addedCarNames() {
        return cy.get('p.car_name');
    }

    visit() {
        cy.visit('panel/garage');
    }

    verifyUrl() {
        cy.url().should('include', '/garage');
    }

    clickAddCarButton() {
        this.addCarButton.click();
    }

    selectBrand(brand) {
        this.brandDropdown.select(brand);
    }

    selectModel(model) {
        this.modelDropdown.select(model);
    }

    enterMileage(mileage) {
        this.mileageField.type(mileage);
    }

    clickSubmitAddCarButton() {
        this.submitAddCarButton.click();
    }

    clickCancelAddCarButton() {
        this.cancelAddCarButton.click();
    }

    addCar(brand, model, mileage) {
        this.clickAddCarButton();
        this.selectBrand(brand);
        this.selectModel(model);
        this.enterMileage(mileage);
        this.clickSubmitAddCarButton();
    }

    verifyLastAddedCar(carName) {
        this.addedCarNames.first().should('have.text', carName);
    }
}

export default new GaragePage();
