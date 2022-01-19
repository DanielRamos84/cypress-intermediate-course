const faker = require('faker')

describe('Create Issue', () => {
    const issue= {
        title: `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(3),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
    };
  
    beforeEach(()=>{
        cy.gui_login();
        cy.api_createProject(issue.project)
            
    });

    it('Successfully creates issue', ()=>{
        cy.gui_createIssue(issue);
    });
});