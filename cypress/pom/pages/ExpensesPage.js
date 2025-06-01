class ExpensesPage {


    get openExpensesTab() {
        return cy.get('a[routerlink="expenses"]');
    }

    get addExpenseButton() {
        return cy.get('.item-group .btn-primary');
    }

    get carDropdown() {
        return cy.get('#addExpenseCar');
    }

    get numberOfLitersField() {
        return cy.get('#addExpenseLiters');
    }

    get totalCostField() {
        return cy.get('#addExpenseTotalCost');
    }
    
    get mileageField() {
        return cy.get('#addExpenseMileage');
    }


    get reportDateField() {
        return cy.get('#addExpenseDate');
    }

    get submitExpenseButton() {
        return cy.get('app-add-expense-modal .btn-primary');
    }

    get cancelExpenseButton() {
        return cy.get('app-add-expense-modal .btn-secondary');
    }

    get addedExpense() {
        return cy.get('tbody tr').first();
    }

    get mileageError() {
        return cy.get('.alert.alert-danger').contains('First expense mileage must not be less or equal to car initial mileage.');
    }

    get WrongDateError() {
        return cy.get('.alert.alert-danger').contains('New expense date must not be less than car creation date.');
    }

    get WrongNumberOfLitersError() {
        return cy.get('.invalid-feedback').contains('Liters has to be from 0.01 to 9999');
    }

    get WrongTotalCostError() {
        return cy.get('.invalid-feedback').contains('Total cost has to be from 0.01 to 1000000');
    }

    OpenFuelExpenseForm() {
        this.openExpensesTab.click();
        this.addExpenseButton.click();
    }

    SelectCar(brand, model) {
        this.carDropdown.select(`${brand} ${model}`);
    }

    enterNumberOfLiters(liters) {
        this.numberOfLitersField.type(liters);
    }

    enterTotalCost(cost) {
        this.totalCostField.type(cost);
    }

    enterMileage(mileage) {
        this.mileageField.clear().type(mileage);
    }

    selectReportDate(date) {
        this.reportDateField.clear().type(date);
    }

    submitExpense() {
        this.submitExpenseButton.click({force: true});
    }

    cancelExpense() {
        this.cancelExpenseButton.click();
    }

    addFuelExpense(brand, model, mileage, liters, cost, date = null) {
        this.OpenFuelExpenseForm();
        this.SelectCar(brand, model);
        this.enterNumberOfLiters(liters);
        this.enterTotalCost(cost);
        this.enterMileage(mileage);
        if (date) {
            this.selectReportDate(date);
        }
        this.submitExpense();
    }

    verifyLastAddedExpense(mileage, liters, cost) {
        this.addedExpense.within(() => {
            cy.get('td').eq(1).should('contain', mileage);
            cy.get('td').eq(2).should('contain', liters);
            cy.get('td').eq(3).should('contain', cost);
        });
    }
}

export default new ExpensesPage();
