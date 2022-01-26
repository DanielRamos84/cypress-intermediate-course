const faker= require('faker');

const issue= {
    title: `issue-${faker.datatype.uuid()}`,
    description: faker.random.words(3),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5),
            initialize_with_readme: true
        },
        label: {
            name: faker.name.firstName(5),
            color: '#FFAABB',
            description: faker.random.words(2)
        },
};

describe('Set label on issue', () => {
    beforeEach(()=>{
        cy.api_deleteAllProjects();
        cy.api_createIssue(issue)
            .then(res=>{
                expect(res.status).eq(201);
                cy.api_createLabel(issue, res.body.project_id)
                cy.wrap(res.body.iid).as('issueId')
                cy.wrap(res.body.project_id).as('projectId')
            });
    });

    it('Successfully set label on issue', function(){
        cy.api_assignLabelToIssue(issue, this.projectId, this.issueId);
    });
});