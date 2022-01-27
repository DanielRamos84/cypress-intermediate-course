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
<<<<<<< Updated upstream
- Doing all these tests is making a mess creating new projects every time and this is unnecessary.  I couldn't find an api endpoint to delete all projects so what we'll do is get all projects wrap the response id and pass this to a for each loop where we use a DELETE request, this will be saved under a re-usable custom command `api_deleteAllProjects`.  Finally we want to run this in a beforeEach hook on each of our spec files to clean things up.
=======
- Doing all these tests is making a mess creating new projects every time and this is unnecessary.  I couldn't find an api endpoint to delete all projects so what we'll do is get all projects wrap the response id and pass this to a for each loop where we use a DELETE request, this will be saved under a re-usable custom command `api_deleteAllProjects`.  Finally we want to run this in a beforeEach hook on each of our spec files to clean things up.
