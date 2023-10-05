import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';

import { UserProvider } from '../../context/UserContext';

import SignIn from './SignInPage';


const testUser = {
    email: 'test@test.co',
    password: 'test111',
};

const unvalidate = {
    email: 'unvalidate',
    password: '',
};

const mockedUsedNavigate = jest.fn();

expect.extend({
    toHaveValidationError(received, expectedFieldName) {
        let validationError
        try {
            validationError = received.getByTestId(expectedFieldName);
        } catch {
            return {
                message: () =>
                    `Expected field "${expectedFieldName}" to have a validation error, but it didn't.`,
                pass: false,
            };
        }
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
})

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

const setup = () => {
    const screen = render(
        <UserProvider>
            <SignIn />
        </UserProvider>
    );

    const emailField = screen.getByTestId('email');
    const passwordField = screen.getByTestId('password');
    return {
        emailField,
        passwordField,
        ...screen,
    };
};

test('exists', async () => {
    setup();

    const component = screen.getByTestId('sign-in-page-form');
    expect(component).toBeInTheDocument();
});

test('checks submit button disabled', async () => {
    setup();

    expect(screen.getByTestId('submit-button')).toHaveAttribute('disabled');
});

test('checks email validates', async () => {
    const { emailField } = setup();

    fireEvent.change(emailField, { target: { value: unvalidate.email } });
    expect(screen.getByTestId('valerror-email')).toBeVisible();
});

test('checks email validates with custom matcher', async () => {
    const { emailField } = setup();
  
    // Trigger validation error by providing an invalid email
    fireEvent.change(emailField, { target: { value: 'invalid-email' } });
  
    // Use the custom matcher to check for validation error
    expect(screen).toHaveValidationError('valerror-email');
});

test('unvalidate and validate email field', async () => {
    const { emailField } = setup();
  
    // Trigger validation error by providing an invalid email
    fireEvent.change(emailField, { target: { value: 'invalid-email' } });
  
    // Use the custom matcher to check for validation error
    expect(screen).toHaveValidationError('valerror-email');

    fireEvent.change(emailField, { target: { value: testUser.email } });
    expect(screen).not.toHaveValidationError('valerror-email');
});

test('submits form, setItem to localstorage and navigates to home', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(testUser),
            ok: true,
        })
    );
    Object.defineProperty(window, 'localStorage', {
        value: {
            getItem: jest.fn(() => null),
            setItem: jest.fn(() => null),
        },
        writable: true,
    });

    const promise = Promise.resolve();
    const { emailField, passwordField, debug } = setup();

    fireEvent.change(emailField, { target: { value: testUser.email } });
    fireEvent.change(passwordField, { target: { value: testUser.password } });

    const submitButton = screen.getByTestId('submit-button');

    expect(submitButton).not.toHaveAttribute('disabled');

    fireEvent.click(submitButton);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${import.meta.env.REACT_APP_URL}/user/login`, {
        method: 'POST',
        body: JSON.stringify(testUser),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    await act(async () => {
        await promise;
    });

    expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(window.localStorage.setItem).toBeCalledWith('user', JSON.stringify(testUser));

    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
});
