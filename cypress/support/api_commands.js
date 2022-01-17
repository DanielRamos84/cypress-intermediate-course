const accessToken = Cypress.env('gitlab_access_token')

Cypress.Commands.add('api_createProject', project => {
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/?private_token=${accessToken}`,
    body: {
      name: project.name,
      description: project.description,
      initialize_with_readme: true
    }
    }).then(res=>{
        expect(res.status).eq(201);
        cy.log(`Project name: ${res.body.name}`);
        cy.log(`Project description: ${res.body.description}`);
    });
});


