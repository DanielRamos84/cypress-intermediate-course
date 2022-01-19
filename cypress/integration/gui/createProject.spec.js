const faker = require('faker')

describe('Create Project', () => {
    beforeEach(()=>{cy.gui_login()});
    
    it('Successfully creates project', () => {
        const project= {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        };

        cy.gui_createProject(project);

        cy.url()
            .should('eq', `${Cypress.config('baseUrl')}${Cypress.env('user_name')}/${project.name}`);
    });
});