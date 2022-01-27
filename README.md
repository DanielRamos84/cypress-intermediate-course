### Set project milestone on issue
- For our preconditions in beforeEach hook we'll call custom command `cy.api_createIssue(issue)` and save the responses project issue and issue id, next we pass our issue object and issue id our next precondition that creates the milestone `cy.api_createMilestone(issue, res.body.project_id)`.  
- Within this second response we retried the milestone id.  We save the above variables in alias form and pass those to our it block that's using function expression instead of arrow expression allowing us to make use of `this` keyword and refer back to our variables.
- Finally our custom command `cy.api_assignMilestoneToIssue(this.issueId, this.projectId, this.milestoneId);` takes the aliases and executed a PUT request that set the milestone id on the issue.
