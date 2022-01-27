# cypress-intermediate-course

An [intermediate course of test automation with Cypress](https://www.udemy.com/course/test-automation-with-cypress-intermediate/) from the Talking About Testing school.

## General housekeeping
Turn on intellisense globally -  Create a new folder `jsconfig.json` in the root directory and paste the following:

`{
    "include": ["./node_modules/cypress", "cypress/**/*.js"]
}`

The code above allows us to implicitly declare the triple-slash directive ///<types="Cypress">/ that turns on intellisense without having to declare it in each spec file.

The course covers two main sections GUI & API testing using Gitlab application and focuses on teaching how to test via GUI once and then when there are certain preconditions needed for our test use API calls for those. From our network calls, we can extract data from our response and save it as alias values to be used in our test.

To get the most value from this course, I strongly advise you to read Gitlab's API documentation, familiarize yourself with it, and run some tests before even diving into the course.  Experiment going through the flow of creating records in the application while monitoring the network tab to see what requests.  If you find yourself struggling to understand how to structure the network requests you might not benefit so much from this course.  Of course, you can still follow through with the examples but I'd recommend understanding the API portion before attempting the course.  After all, this is an intermediate course, and it's expected that we're familiar with concepts such as using API testing in Cypress.

## [GUI section](https://github.com/DanielRamos84/cypress-intermediate-course/blob/createProject-feature/cypress/integration/gui/GUI-section.md)

## [API section](https://github.com/DanielRamos84/cypress-intermediate-course/blob/master/cypress/integration/api/README.md)

