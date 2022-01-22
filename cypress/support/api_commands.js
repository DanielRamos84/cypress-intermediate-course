const accessToken = Cypress.env('gitlab_access_token')

Cypress.Commands.add('api_deleteAllProjects', ()=>{
    cy.request({
        method: 'GET',
        url: `/api/v4/projects/?private_token=${accessToken}`,
        }).then(res=>{
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
            cy.request({
                method: 'POST',
                url: `api/v4/projects/${res.body.id}/issues/?private_token=${accessToken}`,
                body: {
                    title: issue.title
                }       
            });
        });
});

Cypress.Commands.add('api_createLabel', project=>{
    cy.api_createProject(project)
        .then(res=>{
        cy.request({
            method: 'POST',
            url: `${Cypress.config('baseUrl')}api/v4/projects/${res.body.id}/labels/?private_token=${accessToken}`,
            body: project.label
            }).then(res=>{
                expect(res.status).eq(201);
                cy.log(`New Project Label created, name: ${res.body.name} | Description: ${res.body.description}`);
            });
        });
});

