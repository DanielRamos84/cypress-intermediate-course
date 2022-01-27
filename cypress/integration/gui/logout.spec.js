describe('Logout', () => {
    beforeEach(()=>{gui_login()});
    
    it('Successfully logs out', () => {
        cy.gui_logout();
    });
});