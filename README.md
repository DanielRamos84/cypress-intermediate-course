# cypress-intermediate-course

An [intermediate course of test automation with Cypress](https://www.udemy.com/course/test-automation-with-cypress-intermediate/) from the Talking About Testing school.

## General housekeeping
Turn on intellisense globally -  Create a new folder `jsconfig.json` in the root directory and paste the following:

`{
    "include": ["./node_modules/cypress", "cypress/**/*.js"]
}`

The code above allows us to implicitly declare the triple-slash directive ///<types="Cypress">/ that turns on intellisense without having to declare it in each spec file.

The course covers two main sections: testing Gitlab application via GUI & API.  At a glance, this course explains the importance of testing features via GUI once and for successive tests that require you to go through the same workflow rather than retesting via the GUI, we instead use Cypress API testing and set them up as a precondition.

To get the most from this course, I strongly advise you to read Gitlab's API documentation, familiarize yourself with it and run some tests before even diving into the lessons.  Experiment going through the flow of creating records in the application while at the same time monitoring the network tab to see the requests taking place and the payload format.  
If you have a hard time understanding how to structure the network requests, you might want to brush up on your API skills and spend some time playing around with Gitlabs API.  After all, this is an intermediate course, and the expectation is to be familiar with Cypress API tests.
## [GUI section](https://github.com/DanielRamos84/cypress-intermediate-course/blob/createProject-feature/cypress/integration/gui/GUI-section.md)

## [API section](https://github.com/DanielRamos84/cypress-intermediate-course/blob/master/cypress/integration/api/README.md)
