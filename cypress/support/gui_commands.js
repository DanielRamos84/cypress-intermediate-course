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
Cypress.Commands.add('gui_login', ()=>{
    cy.visit('/');
    
    cy.get('[data-qa-selector="login_field"]')
        .type(Cypress.env('user_name'));

    cy.get('[data-qa-selector="password_field"]')
        .type(Cypress.env('user_password'), {sensitive:true});

    cy.get('[data-qa-selector="sign_in_button"]')
        .click();
});

Cypress.Commands.add('gui_logout', ()=>{
    cy.get('.header-user-avatar')
        .should('be.visible')
        .click();

    cy.get('[data-qa-selector="sign_out_link"]')
        .click();

    cy.url()
        .should('eq', `${Cypress.config('baseUrl')}users/sign_in`)
});

Cypress.Commands.add('gui_createProject', project=>{
    cy.get('#js-onboarding-new-project-link')
        .should('be.visible')
        .click();

    cy.contains('.qa-global-new-project-link', 'New project')
    .click();

    cy.url()
        .should('eq', `${Cypress.config('baseUrl')}projects/new`);

    cy.get('#project_name')
        .type(project.name);

    cy.get('#project_description')
        .type(project.description);

    cy.get('#project_initialize_with_readme')
        .click();

    cy.get('[class="btn btn-success project-submit"]')
        .eq('0')
        .click();
});

Cypress.Commands.add('gui_createIssue', issue => {
    cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/new`)
  
    cy.get('.qa-issuable-form-title').type(issue.title);
    
    cy.get('.qa-issuable-form-description').type(issue.description);
    
    cy.contains('Submit issue').click();
  });
  