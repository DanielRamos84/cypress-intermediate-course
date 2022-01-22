const faker= require ('faker');
describe('Creates a label', () => {
    beforeEach(()=>{
        cy.api_deleteAllProjects();
    });

    it('Successfully creates a label', () => {
        const project= {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5),
                label: {
                    name: faker.name.firstName(5),
                    color: '#FFAABB',
                    description: faker.random.words(2)
                }
        };

        cy.api_createLabel(project)
    });
});