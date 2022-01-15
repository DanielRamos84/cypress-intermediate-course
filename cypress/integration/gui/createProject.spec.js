const faker = require('faker')

describe('Create Project', () => {
    beforeEach(()=>{
        cy.login()
    });
    
    it('Successfully creates project', () => {
        const project= {
            name: `project-${faker.random.uuid()}`,
            description: faker.random.words(5)
        };

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
});