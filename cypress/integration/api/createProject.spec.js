const faker= require('faker');

const project= {
    name: `project-${faker.datatype.uuid()}`,
    description: faker.random.words(5),
    initialize_with_readme: true
};

describe('Create a project', () => {
    beforeEach(()=>{
        cy.api_deleteAllProjects();
    });
    it('Successfully creates project', () => {
        cy.api_createProject(project);
    });
});