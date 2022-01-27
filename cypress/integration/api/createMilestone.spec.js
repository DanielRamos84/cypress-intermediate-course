const faker= require ('faker');

const project= {
    name: `project-${faker.datatype.uuid()}`,
    description: faker.random.words(5),
    initialize_with_readme: true,
        milestone: {
            title: faker.random.words(1),
            description: faker.random.words(2)
        }
};

describe('Creates a milestone', () => {
    beforeEach(()=>{
        cy.api_deleteAllProjects();
        cy.api_createProject(project)
            .then(res=>{
                cy.wrap(res.body.id)
                    .as('projectId')
            });
    });
    
    it('Successfully creates a milestone', function(){
        cy.api_createMilestone(project, this.projectId);
    });
});