// e2e-run-tests.js
const cypress = require('cypress');

// cypress.run({
//     browser: 'chrome',
//     config: {
//         baseUrl: 'http://localhost:3000',
//     },
// });

cypress
    .run({
        browser: 'chrome',
        config: {
            baseUrl: 'http://localhost:3000',
            video: false
        },
    })
    .then((result) => {
        if (result.failures) {
            console.error('Could not execute tests');
            console.error(result.message);
            process.exit(result.failures);
        }

        // print test results and exit
        // with the number of failed tests as exit code
        process.exit(result.totalFailed);
    })
    .catch((err) => {
        console.error(err.message);
        process.exit(1);
    });
