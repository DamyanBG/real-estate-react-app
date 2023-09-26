// customMatchers.js

export function toHaveValidationError(received, expectedFieldName) {
    const validationError = received[expectedFieldName];
    const pass = validationError !== undefined;
    if (pass) {
        return {
            message: () =>
                `Expected field "${expectedFieldName}" to have a validation error, but it didn't.`,
            pass: true,
        };
    } else {
        return {
            message: () =>
                `Expected field "${expectedFieldName}" to have a validation error, but it didn't.`,
            pass: false,
        };
    }
}
