const faker= require('faker');

describe('Create a project', () => {
    it('Successfully creates project', () => {
        const project= {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        };

        cy.api_createProject(project);
    });
});