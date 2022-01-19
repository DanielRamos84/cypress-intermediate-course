const faker= require ('faker');

const issue= {
    title: `issue-${faker.datatype.uuid()}`,
    description: faker.random.words(3),
    project: {
        name: `project-${faker.datatype.uuid()}`,
        description: faker.random.words(5)
    }
};
    
describe('Create Issue', () => {
    it('Successfully creates an issue', () => {
        cy.api_createIssue(issue);
    });
});