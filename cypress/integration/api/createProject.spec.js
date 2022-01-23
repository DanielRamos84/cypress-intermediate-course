const faker= require('faker');

describe('Create a project', () => {
    beforeEach(()=>{
        cy.api_deleteAllProjects();
    });
    it('Successfully creates project', () => {
        const project= {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5),
            initialize_with_readme: true
        };

        cy.api_createProject(project);
    });
});