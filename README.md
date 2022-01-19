# cypress-intermediate-course

An [intermediate course of test automation with Cypress](https://www.udemy.com/course/test-automation-with-cypress-intermediate/) from the Talking About Testing school.

Hide password from displaying in Cypress test runner command log

Even though we are not tracking our cypress.env.json which stores our credentials, when we run our test we can see in the test runner our login credentials which kind of defeats the purpose of hiding confidential information.

One approach I like to address this is to overwrite the type command, Cypress documentation has an excellent example Overwrite-Existing-Commands

In the index.json under support folder we can add the following code

    Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
    if (options && options.sensitive) {
        // turn off original log
        options.log = false
        // create our own log with masked message
        Cypress.log({
        $el: element,
        name: 'type',
        message: '*'.repeat(text.length),
        })
    }
    
    return originalFn(element, text, options)
    })


Then in our login custom command stored under gui_commands we use {sensitive:true} on the field we want to obfuscate the content.

    cy.get('[data-qa-selector="password_field"]')
        .type(Cypress.env('user_password'), {sensitive:true});