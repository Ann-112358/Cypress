/// <reference types="cypress" />


describe('open page', () => {
    beforeEach(() => {
      cy.visit('/')
    })
  
    //Використання CSS селекторів
    it('displays logo', () => {
        cy.get('.header_logo').should('be.visible')
    })

    //Використання CSS селекторів з текстом
    it('displays "Contacts" button', () => {
        cy.contains('button','Contacts').should('exist')
    })

    //Використання комбінованого вибору і invoke()
    it('displays Insta link', () => {
     cy.get('.contacts_socials a:nth-child(4)')
     .invoke('attr', 'href')
     .should('include', 'https://www.instagram.com/hillel_itschool/')
    })

    //Використання find()
    it('displays "Sign up" button', () => {
        cy.get('.hero-descriptor')
        .find('button')
        .contains('Sign up')
        .should('not.be.disabled')
    })

    //Використання each()
    it('click on every header button', () => {
        cy.get('.header_left').each(($item) => {
            cy.wrap($item).click()
        })
    })

    //Використання children i then()
    it('displays img', () => {
        cy.get('.about-block_picture')
        .children('img')
        .then(($img) => {
            expect($img[0].naturalHeight).to.be.greaterThan(0)
        })
    })

    //Використання its()
    it('img has correct source', () => {
        cy.get('[alt="Instructions"]')
        .its('1.src')
        .should('include', '/assets/images/homepage/info_2.jpg')
    })
       
})