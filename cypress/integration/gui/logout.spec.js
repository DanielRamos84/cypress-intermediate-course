///<reference types="Cypress"/>
describe('Logout', () => {
    beforeEach(()=>{cy.login()});
    
    it('Successfully logs out', () => {
        cy.logout();
    });
});