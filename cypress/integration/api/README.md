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