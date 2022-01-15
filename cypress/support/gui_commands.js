// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', ()=>{
    cy.visit('/');
    
    cy.get('[data-qa-selector="login_field"]')
        .type(Cypress.env('user_name'));

    cy.get('[data-qa-selector="password_field"]')
        .type(Cypress.env('user_password'), {sensitive:true});

    cy.get('[data-qa-selector="sign_in_button"]')
        .click();
});

Cypress.Commands.add('logout', ()=>{
    cy.get('.header-user-avatar')
        .should('be.visible')
        .click();

    cy.get('[data-qa-selector="sign_out_link"]')
        .click();

    cy.url()
        .should('eq', `${Cypress.config('baseUrl')}users/sign_in`)
});