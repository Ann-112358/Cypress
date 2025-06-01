import GaragePage from "../pom/pages/GaragePage.js";
import HomePage from "../pom/pages/HomePage.js";
import SignInForm from "../pom/forms/SignInForm.js";
import ExpensesPage from "../pom/pages/ExpensesPage.js";

describe('Add new car', () => {
    
    beforeEach(() => {
        HomePage.visit();
        HomePage.openSignInForm();
        SignInForm.loginWithCredentials(Cypress.env('AUTH_EMAIL'), Cypress.env('AUTH_PASSWORD'));
        GaragePage.verifyUrl();
    })
    
    it('Add [Audi] [A6] [1000]', () => {
        GaragePage.addCar('Audi', 'A6', '1000');
        GaragePage.verifyLastAddedCar('Audi A6');
    })

    it('Add [BMW] [X5] [2000]', () => {
        GaragePage.addCar('BMW', 'X5', '2000');
        GaragePage.verifyLastAddedCar('BMW X5');
    })

    it('Add [Ford] [Fiesta] [3000]', () => { 
        GaragePage.addCar('Ford', 'Fiesta', '3000');
        GaragePage.verifyLastAddedCar('Ford Fiesta');
    })

    it('Add [Porsche] [Panamera] [4000]', () => {
        GaragePage.addCar('Porsche', 'Panamera', '4000');
        GaragePage.verifyLastAddedCar('Porsche Panamera');
    })

    it('Add [Fiat] [Panda] [5000]', () => {
        GaragePage.addCar('Fiat', 'Panda', '5000');
        GaragePage.verifyLastAddedCar('Fiat Panda');
    })
})

describe('Add fuel expenses', () => {
    beforeEach(() => {
        HomePage.visit();
        HomePage.openSignInForm();
        SignInForm.loginWithCredentials(Cypress.env('AUTH_EMAIL'), Cypress.env('AUTH_PASSWORD'));
    })

    context('Add valid expense', () => {
        it('Add valid expense for [Audi] [A6]', () => {
          ExpensesPage.addFuelExpense('Audi', 'A6', '1050', '70', '100');
          ExpensesPage.verifyLastAddedExpense('1050', '70L', '100.00 USD');
        })
    })

    context('Add invalid expense', () => {
        it('Wrong mileage for [BMW] [X5]', () => {
            ExpensesPage.addFuelExpense('BMW', 'X5', '2000', '70', '100');
            ExpensesPage.mileageError.should('be.visible');
        })

        it('Wrong date for [Fiat] [Panda]', () => {
            ExpensesPage.addFuelExpense('Fiat', 'Panda', '5050', '70', '100', '01.01.2025');
            ExpensesPage.WrongDateError.should('be.visible');
        })

        it('Wrong number of liters for [Ford] [Fiesta]', () => {
            ExpensesPage.addFuelExpense('Ford', 'Fiesta', '3050', '0', '100');
            ExpensesPage.WrongNumberOfLitersError.should('be.visible');
        })

        it('Wrong total cost for [Porsche] [Panamera]', () => {
            ExpensesPage.addFuelExpense('Porsche', 'Panamera', '4050', '70', '1000001');
            ExpensesPage.WrongTotalCostError.should('be.visible');
        })
    })
})

