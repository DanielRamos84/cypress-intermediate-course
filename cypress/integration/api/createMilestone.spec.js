const faker= require ('faker');

const project= {
    name: `project-${faker.datatype.uuid()}`,
    description: faker.random.words(5),
    initialize_with_readme: true,
        milestone: {
            title: faker.random.words(2)
        }
};

describe('Creates a milestone', () => {
    beforeEach(()=>{
        cy.api_deleteAllProjects();
    });
    
    it('Successfully creates a milestone', () => {
        cy.api_createMilestone(project);
    });
});