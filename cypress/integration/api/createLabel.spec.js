const faker= require ('faker');

const project= {
    name: `project-${faker.datatype.uuid()}`,
    description: faker.random.words(5),
    initialize_with_readme: true,
        label: {
            name: faker.name.firstName(5),
            color: '#FFAABB',
            description: faker.random.words(2)
        }
};

describe('Creates a label', () => {
    beforeEach(()=>{
        cy.api_deleteAllProjects();
        cy.api_createProject(project)
            .then(res=>{
                cy.wrap(res.body.id)
                    .as('projectId');
            });
    });

    it('Successfully creates a label', function(){
        cy.api_createLabel(project, this.projectId)
    });
});