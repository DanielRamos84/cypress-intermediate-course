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
