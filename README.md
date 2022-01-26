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
- Our custom command `createProject.spec.js` makes a POST request using our access token, always a good idea to log relevant information to Cypress test runner, in this case:
    
    ```cy.log(`Project id: ${res.body.id}`);```

    ``cy.log(`Project name: ${res.body.name}`);``
    
    ``cy.log(`Project description: ${res.body.description}`);``

### Create issue
- In our `createIssue.spec.js` under the integration/api folder we call a custom command in which we pass in an object project created via faker data that consists of an object "issue" with properties: title and description.  Withing the object there's a nested object named "project" with properties: name and description.
- The properties we are passing to the object are the minimum requirements when making api calls using the create new project and issue end point, reference gitlab documentation for the particular request you are making taking note of the Required column and values distinguished as "yes".
- Our custom command `cy.api_createIssue(issue)` makes a POST request using our access token, withing this custom command we first call our previous `createProject.spec.js` custom command passing in issue.project object and from that response we take the project id use it in query parameters in our request.

### Create label issue
- In our `createLabel.spec.js` under the integration/api folder we call a custom command in which we pass in an object project created via faker data that consists of an object "project" with properties: name and description.  Withing the object there's a nested object named "label" with properties: name, color and description.
- The properties we are passing to the object are the minimum requirements when making api calls using the create new project and issue end point, reference gitlab documentation for the particular request you are making taking note of the Required column and values distinguished as "yes".
- Our custom command `cy.api_createLabel(project)` makes a POST request using our access token, withing this custom command we first call our previous `createProject.spec.js` custom command passing in the project object and from that response we take the project id use it in query parameters in our request for the label creation.
- Note: At this point we've only created the label under the project but this isn't linked to the issue.  We'll be tackling on next but first.
- Doing all these tests is making a mess creating new projects every time and this is unnecessary.  I couldn't find an api endpoint to delete all projects so what we'll do is get all projects wrap the response id and pass this to a for each loop where we use a DELETE request, this will be saved under a re-usable custom command `api_deleteAllProjects`.  Finally we want to run this in a beforeEach hook on each of our spec files to clean things up.

### Set label on issue
-  In our `setLabelOnIssue.spec.js` under the integration/api folder we create an object issue that has two nested objects: project and name.  We call out `cy._assignLabelToIssue` custom command in which we pass in the issue object.  The custom command first calls `cy.api_createIssue(issue)` which in turn creates both project and issue, then we do a POST request that creates the label and finally through a PUT request we update the label in that project with the label name.
- This approach works, however we are not really isolating parts of the test and our custom command `cy.api_assignLabelToIssue` really should only do a single function which is implied in its name.  So lets fix this.
- The larger problem at hand is that I took the approach that anytime we had to create a precondition that a project had to be created which is true, but we already have individual custom commands to target each function and shouldn't have to mix them.
- Fixing our preconditions for `setLabelOnIssue.spec.js` looks as follows:

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

        beforeEach(()=>{
        cy.api_deleteAllProjects();
        cy.api_createIssue(issue)
            .then(res=>{
                expect(res.status).eq(201);
                cy.api_createLabel(issue, res.body.project_id)
            });
    });

- Now the only thing left is the actual implementation of assigning the label to the issue because at this point they're not linked.  We accomplish this via custom command a single custom command in our it block `cy.api_assignLabelToIssue(issue, this.projectId, this.issueId);`.  In a beforeEach hook we clear the application from any existing project and create an issue via api as our single precondition.  From its response we get the issue and project id that are passed to the custom command in question.
- We face a new problem, how can we share the variables from our response into our it block?  To solve this we wrap both responses we're interested and then change our it block from arrow expression to function expression, then we can make use of `this` keyword. 