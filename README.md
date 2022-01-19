# Login

Simple test in which we use a custom command `gui_login`, were we pass our credentials using environment variables `Cypress.env` anc click the sign in button.

General cleanup of the `login.spec.js`, even though we are not tracking our cypress.env.json which stores our credentials, when we run our test we can see in the test runner our login credentials which kind of defeats the purpose of hiding confidential information.

One approach I like to address this is to overwrite the type command, Cypress documentation has an excellent example [Overwrite-Existing-Commands](https://docs.cypress.io/api/cypress-api/custom-commands#Dual-Commands)

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

![img](../../../screenshots/Snip_01.png)

# Logout
Similarly for this test we use a custom command `gui_logout`, in order to logout we first call our `gui_login` in a beforeEach hook.

Note: We're not storing our custom commands in `cypress/support/commands` folder.  Instead, we've created to new `commands.js` files under the support folder: `api_commands` and `gui_commands`.

For Cypress to find these test we have to reference the new files in `cypress/support/index` folder as follows:

`import './gui_commands'`

`import './api_commands'`
