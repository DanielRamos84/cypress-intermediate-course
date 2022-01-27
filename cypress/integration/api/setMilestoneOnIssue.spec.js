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
            title: faker.random.words(1),
            description: faker.random.words(2)
        }
};

describe('Set milestone on issue', () => {
    beforeEach(()=>{
        cy.api_deleteAllProjects();
        cy.api_createIssue(issue)
            .then(res=>{
                cy.wrap(res.body.project_id, {log:false})                
                    .as('projectId', {log:false});
                
                cy.wrap(res.body.iid, {log:false})
                    .as('issueId', {log:false});

                cy.api_createMilestone(issue, res.body.project_id)
                    .then(res=>{
                        cy.wrap(res.body.id, {log:false})
                            .as('milestoneId', {log:false})
                    });
            });
    });
    
    it('Successfully sets milestone on issue', function(){
        cy.api_assignMilestoneToIssue(this.issueId, this.projectId, this.milestoneId);
    });
});