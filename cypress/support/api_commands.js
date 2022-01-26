const accessToken = Cypress.env('gitlab_access_token')

Cypress.Commands.add('api_deleteAllProjects', ()=>{
    cy.request({
        method: 'GET',
        url: `/api/v4/projects/?private_token=${accessToken}`,
        }).then(res=>{
            expect(res.status).eq(200);
            cy.wrap(res.body)
                .each(project=>{
                    cy.request({
                        method: 'DELETE',
                        url: `/api/v4/projects/${project.id}/?private_token=${accessToken}`
                    });
                });
        });    
})

Cypress.Commands.add('api_createProject', project => {
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/?private_token=${accessToken}`,
    body: project
    }).then(res=>{
        expect(res.status).eq(201);
        cy.log(`Project name: ${res.body.name} | Project description: ${res.body.description} `);
    });
});

Cypress.Commands.add('api_createIssue', issue=>{
    cy.api_createProject(issue.project)
        .then(res=>{
            expect(res.status).eq(201);
            cy.request({
                method: 'POST',
                url: `api/v4/projects/${res.body.id}/issues/?private_token=${accessToken}`,
                body: {
                    title: issue.title,
                    description: issue.description
                }       
            }).then(res=>{
                expect(res.status).eq(201)
                cy.log(`New Issue title: ${res.body.title} | Description: ${res.body.description}`);
            })
        });
});

Cypress.Commands.add('api_createLabel', (issue, project)=>{
        cy.request({
            method: 'POST',
            url: `/api/v4/projects/${project}/labels/?private_token=${accessToken}`,
            body: issue.label
            }).then(res=>{
                expect(res.status).eq(201);
                cy.log(`New Project Label created, name: ${res.body.name} | Description: ${res.body.description}`);
            });
});

Cypress.Commands.add('api_assignLabelToIssue', (issue, projectId, issueId)=>{
    cy.request({
        method: 'PUT',
        url: `/api/v4/projects/${projectId}/issues/${issueId}/?private_token=${accessToken}`,
        body: {
            "labels" : [
                issue.label.name
                    ],
                }
                }).then(res=>{
                    expect(res.status).eq(200);
                })
});
  

Cypress.Commands.add('api_createMilestone', project=>{
    cy.api_createProject(project)
        .then(res=>{
            cy.request({
                method: 'POST',
                url: `/api/v4/projects/${res.body.id}/milestones/?private_token=${accessToken}`,
                body: {
                    title: project.milestone.title
                }
                }).then(res=>{
                    cy.log(`Milestone title: ${res.body.title}`);
            });
        })
});

Cypress.Commands.add('api_assignMilestoneToIssue', issue=>{


});