/// <reference types="cypress" />

describe('Login', () => {
  it('Successfully logs in', () => {
    cy.login();
  });
});