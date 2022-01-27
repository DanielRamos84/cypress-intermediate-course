describe('Logout', () => {
    beforeEach(()=>{cy.gui_login()});
    
    it('Successfully logs out', () => {
        cy.gui_logout();
    });
});