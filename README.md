## API SECTION
For this course we make use of Gitlab rest API [gitlab rest api](https://docs.gitlab.com/ee/api/index.html#rest-api). Highly recommend reading this index page to get familiar with the application, the rest should be straightforward following the documentation to create the actual requests [gitlab api resources](https://docs.gitlab.com/ee/api/api_resources.html)

We have generated a personal token therefore our requests will be formatted 
as curl `"https://localhost/api/v4/projects?private_token=<your_access_token>"`

In our `api_commands` file assign your token to a constant so we can easily make reference of the access token in our api requests

`const accessToken = Cypress.env('gitlab_access_token')`

Our api requests will be formatted such as the example below used to create a project

`/api/v4/projects/?private_token=${accessToken}`


### Our workflow will be the following:
- Create project
- Create issue, we'll need as precondition an existing project so we can use that project's ID in our issue request
- Create a milestone and assign this to the issues project
- Create a label and assign this to the issues project

### Create project
- There's no need to login to the application for this test because we're creating the project via API endpoint
- In our `createProject.spec.js` under the integration/api folder we call a custom command in which we pass in an object project crated via faker data that consists of two properties: name and description.
- Our custom command `cy.api_createProject(project)` makes a POST request using our access token, always a good idea to log relevant information to Cypress test runner, in this case:
    
    ```cy.log(`Project id: ${res.body.id}`);```

    ``cy.log(`Project name: ${res.body.name}`);``
    
    ``cy.log(`Project description: ${res.body.description}`);``
