// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {//This allows that instead of using
    //{log:false} after a type command where it simply remove the type entry completely from the command log
    //substitute {sensitive:true} instead and we'll now see type **********
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


// Import commands.js using ES2015 syntax:
import './gui_commands'
import './api_commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
