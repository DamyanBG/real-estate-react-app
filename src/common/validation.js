import { EMAIL_REGEX } from './utils';

const validations = {
    text: (value) => {
        if (!value) {
            return 'This field can not be empty!';
        }
        if (value.length < 3 || value.length > 150) {
            return 'Text field have to contains between 3 and 150 characters!';
        }
    },
    textarea: (value) => {
        if (!value) {
            return 'This field can not be empty!';
        }
        if (value.length < 3 || value.length > 150) {
            return 'Text field have to contains between 3 and 150 characters!';
        }
    },
    email: (value) => {
        if (!EMAIL_REGEX.test(value)) return 'Email required!';
    },
    password: (value) => {
        if (!value) {
            return 'Password field can not be empty!';
        }
        if (value.length < 6 || value.length > 150) {
            return 'Password field have to contains between 6 and 150 characters!';
        }
    },
    number: (value) => {
        if (!value) {
            return 'Number field can not be empty!';
        }
    }
};

export const validateField = (fieldType, value) => {
    return validations[fieldType](value);
};
