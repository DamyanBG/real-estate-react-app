import { EMAIL_REGEX } from "./utils";

const validations = {
    text: (value) => {
        if (!value) {
            return 'This field can not be empty!';
        }
        if (value.length < 3 || value.length > 150) {
            return 'Text field have to contain between 3 and 150 characters';
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
            return 'Password field have to contain between 6 and 150 characters';
        } 
    }
};

export const validateField = (fieldType, value) => {
    return validations[fieldType](value);
};
