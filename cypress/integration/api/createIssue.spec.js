const faker= require ('faker');

const issue= {
    title: `issue-${faker.datatype.uuid()}`,
    description: faker.random.words(3),
    project: {
        name: `project-${faker.datatype.uuid()}`,
        description: faker.random.words(5),
        initialize_with_readme: true
    }
};

beforeEach(()=>{
    cy.api_deleteAllProjects();
});
    
describe('Create Issue', () => {
    it('Successfully creates an issue', () => {
        cy.api_createIssue(issue);
    });
});