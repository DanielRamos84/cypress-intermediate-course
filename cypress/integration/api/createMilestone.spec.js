const faker= require ('faker');

const issue= {
    title: faker.random.words(3),
    description: faker.random.words(2),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(2),
            initialize_with_readme: true,
        },
        milestone: {
            title: faker.random.words(1)
        }
}

describe('Creates a milestone', () => {
    beforeEach(()=>{
        cy.api_deleteAllProjects();
        cy.api_createProject(issue.project)
            .then(res=>{
                cy.log(res)
                cy.wrap(res.body.id)
                    .as('projectId')
            });
    });
    
    it('Successfully creates a milestone', function(){
        cy.api_createMilestone(issue, this.projectId);
    });
});