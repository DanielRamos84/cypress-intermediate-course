### Create project
- There's no need to login to the application for this test because we're creating the project via API endpoint
- In our `createProject.spec.js` under the integration/api folder we call a custom command in which we pass in an object project crated via faker data that consists of two properties: name and description.
- Our custom command `cy.api_createProject(project)` makes a POST request using our access token, always a good idea to log relevant information to Cypress test runner, in this case:
    
    ```cy.log(`Project id: ${res.body.id}`);```

    ``cy.log(`Project name: ${res.body.name}`);``
    
    ``cy.log(`Project description: ${res.body.description}`);``
