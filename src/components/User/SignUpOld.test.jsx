import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';

import SignUpPage from './SignUpPage';
import { fireEvent } from '@testing-library/dom';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it('check text content', () => {
    act(() => {
        render(<SignUpPage />, container);
    });
    expect(container.textContent).toBe(
        'First NameLast NameEmailPhone numberPasswordSign Up as sellerSubmit'
    );
});

it(`on change tests`, () => {
    act(() => {
        render(<SignUpPage />, container);
    });
    const firstNameInput = container.querySelector("[data-testid='first_name']");
    expect(firstNameInput.value).toBe('');
    fireEvent.change(firstNameInput, { target: { value: 'Good Day' } });
    expect(firstNameInput.value).toBe('Good Day');

    const lastNameInput = container.querySelector("[data-testid='last_name']");
    expect(lastNameInput.value).toBe('');
    fireEvent.change(lastNameInput, { target: { value: 'Good Day' } });
    expect(lastNameInput.value).toBe('Good Day');

    const emailInput = container.querySelector("[data-testid='email']");
    expect(emailInput.value).toBe('');
    fireEvent.change(emailInput, { target: { value: 'Good Day' } });
    expect(emailInput.value).toBe('Good Day');

    const phoneNumberInput = container.querySelector("[data-testid='phone_number']");
    expect(phoneNumberInput.value).toBe('');
    fireEvent.change(phoneNumberInput, { target: { value: 'Good Day' } });
    expect(phoneNumberInput.value).toBe('Good Day');

    const passwordInput = container.querySelector("[data-testid='password']");
    expect(passwordInput.value).toBe('');
    fireEvent.change(passwordInput, { target: { value: 'Good Day' } });
    expect(passwordInput.value).toBe('Good Day');
});

it(`Post request positive test`, async () => {
    await act(async () => {
        render(<SignUpPage />, container);
    });
    const fakeUser = {
        first_name: 'Stefan',
        last_name: 'Petrov',
        email: 'stefan_p@abv.bg',
        phone_number: '43545345',
    };
    jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeUser),
        })
    );
    const firstNameInput = container.querySelector("[data-testid='first_name']");
    fireEvent.change(firstNameInput, { target: { value: 'Stefan' } });

    const lastNameInput = container.querySelector("[data-testid='last_name']");
    fireEvent.change(lastNameInput, { target: { value: 'Petrov' } });

    const emailInput = container.querySelector("[data-testid='email']");
    fireEvent.change(emailInput, { target: { value: 'stefan_p@abv.bg' } });

    const phoneNumberInput = container.querySelector("[data-testid='phone_number']");
    fireEvent.change(phoneNumberInput, { target: { value: '43545345' } });

    const passwordInput = container.querySelector("[data-testid='password']");
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    const submitButton = container.querySelector("[data-testid='submit-button']");

    await act(async () => {
        fireEvent.click(submitButton);
    });

    // to finish

    // const toastifyMessage = getByText(container, "Successful Sign up!")
    // expect(toastifyMessage).toBeInTheDocument();
});

it(`Check validations for e-mail with other inputs`, async () => {
    await act(async () => {
        render(<SignUpPage />, container);
    });
    const firstNameInput = container.querySelector("[data-testid='first_name']");
    fireEvent.change(firstNameInput, { target: { value: 'Stefan' } });

    const lastNameInput = container.querySelector("[data-testid='last_name']");
    fireEvent.change(lastNameInput, { target: { value: 'Petrov' } });

    const emailInput = container.querySelector("[data-testid='email']");
    fireEvent.change(emailInput, { target: { value: 'stefan_p@abv.b' } });

    const phoneNumberInput = container.querySelector("[data-testid='phone_number']");
    fireEvent.change(phoneNumberInput, { target: { value: '43545345' } });

    const passwordInput = container.querySelector("[data-testid='password']");
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    const submitButton = container.querySelector("[data-testid='submit-button']");

    await act(async () => {
        fireEvent.click(submitButton);
    });

    const passwordValError = container.querySelector("[data-testid='valerror-email']");
    expect(passwordValError).toBeTruthy();
    expect(passwordValError).toHaveTextContent('Email required!');
});

it(`Check validations for e-mail`, () => {
    act(() => {
        render(<SignUpPage />, container);
    });
    const emailInput = container.querySelector("[data-testid='email']");
    fireEvent.change(emailInput, { target: { value: 'stefan_p@abv.b' } });
    expect(emailInput.value).toBe('stefan_p@abv.b');

    let passwordValError = container.querySelector("[data-testid='valerror-email']");
    expect(passwordValError).toBeTruthy();
    expect(passwordValError).toHaveTextContent('Email required!');

    fireEvent.change(emailInput, { target: { value: 'stefan_pabv.bg' } });
    expect(emailInput.value).toBe('stefan_pabv.bg');

    passwordValError = container.querySelector("[data-testid='valerror-email']");
    expect(passwordValError).toBeTruthy();
    expect(passwordValError).toHaveTextContent('Email required!');

    fireEvent.change(emailInput, { target: { value: '' } });
    expect(emailInput.value).toBe('');

    passwordValError = container.querySelector("[data-testid='valerror-email']");
    expect(passwordValError).toBeTruthy();
    expect(passwordValError).toHaveTextContent('Email required!');
});

it(`Check validations for first_name`, () => {
    act(() => {
        render(<SignUpPage />, container);
    });
    const firstNameInput = container.querySelector("[data-testid='first_name']");
    fireEvent.change(firstNameInput, { target: { value: 'Ae' } });
    expect(firstNameInput.value).toBe('Ae');

    let firstNameValError = container.querySelector("[data-testid='valerror-first_name']");
    expect(firstNameValError).toBeTruthy();
    expect(firstNameValError).toHaveTextContent(
        'Text field have to contains between 3 and 150 characters!'
    );

    fireEvent.change(firstNameInput, {
        target: {
            value: 'ewafewa waef ewaf ewafwe afweaf 34qr43 f43f43wf 4we3 fe4fe4 fef4q a4f 4ef 4ef 43e 4ef4 3efwe4afas efdsa fsdaf443rtt34f34fe4r fddfs fdsgdfsggfsd fsdgdfsgdfsg',
        },
    });
    expect(firstNameInput.value).toBe(
        'ewafewa waef ewaf ewafwe afweaf 34qr43 f43f43wf 4we3 fe4fe4 fef4q a4f 4ef 4ef 43e 4ef4 3efwe4afas efdsa fsdaf443rtt34f34fe4r fddfs fdsgdfsggfsd fsdgdfsgdfsg'
    );

    firstNameValError = container.querySelector("[data-testid='valerror-first_name']");
    expect(firstNameValError).toBeTruthy();
    expect(firstNameValError).toHaveTextContent(
        'Text field have to contains between 3 and 150 characters!'
    );

    fireEvent.change(firstNameInput, { target: { value: '' } });
    expect(firstNameInput.value).toBe('');

    firstNameValError = container.querySelector("[data-testid='valerror-first_name']");
    expect(firstNameValError).toBeTruthy();
    expect(firstNameValError).toHaveTextContent('This field can not be empty!');
});

it(`Check validations for last_name`, () => {
    act(() => {
        render(<SignUpPage />, container);
    });
    const lastNameInput = container.querySelector("[data-testid='last_name']");
    fireEvent.change(lastNameInput, { target: { value: 'Ae' } });
    expect(lastNameInput.value).toBe('Ae');

    let lastNameValError = container.querySelector("[data-testid='valerror-last_name']");
    expect(lastNameValError).toBeTruthy();
    expect(lastNameValError).toHaveTextContent(
        'Text field have to contains between 3 and 150 characters!'
    );

    fireEvent.change(lastNameInput, {
        target: {
            value: 'ewafewa waef ewaf ewafwe afweaf 34qr43 f43f43wf 4we3 fe4fe4 fef4q a4f 4ef 4ef 43e 4ef4 3efwe4afas efdsa fsdaf443rtt34f34fe4r fddfs fdsgdfsggfsd fsdgdfsgdfsg',
        },
    });
    expect(lastNameInput.value).toBe(
        'ewafewa waef ewaf ewafwe afweaf 34qr43 f43f43wf 4we3 fe4fe4 fef4q a4f 4ef 4ef 43e 4ef4 3efwe4afas efdsa fsdaf443rtt34f34fe4r fddfs fdsgdfsggfsd fsdgdfsgdfsg'
    );

    lastNameValError = container.querySelector("[data-testid='valerror-last_name']");
    expect(lastNameValError).toBeTruthy();
    expect(lastNameValError).toHaveTextContent(
        'Text field have to contains between 3 and 150 characters!'
    );

    fireEvent.change(lastNameInput, { target: { value: '' } });
    expect(lastNameInput.value).toBe('');

    lastNameValError = container.querySelector("[data-testid='valerror-last_name']");
    expect(lastNameValError).toBeTruthy();
    expect(lastNameValError).toHaveTextContent('This field can not be empty!');
});

it(`Check validations for phone_number`, () => {
    act(() => {
        render(<SignUpPage />, container);
    });
    const phoneNumberInput = container.querySelector("[data-testid='phone_number']");
    fireEvent.change(phoneNumberInput, { target: { value: 'Ae' } });
    expect(phoneNumberInput.value).toBe('Ae');

    let phoneNumberValError = container.querySelector("[data-testid='valerror-phone_number']");
    expect(phoneNumberValError).toBeTruthy();
    expect(phoneNumberValError).toHaveTextContent(
        'Text field have to contains between 3 and 150 characters!'
    );

    fireEvent.change(phoneNumberInput, {
        target: {
            value: 'ewafewa waef ewaf ewafwe afweaf 34qr43 f43f43wf 4we3 fe4fe4 fef4q a4f 4ef 4ef 43e 4ef4 3efwe4afas efdsa fsdaf443rtt34f34fe4r fddfs fdsgdfsggfsd fsdgdfsgdfsg',
        },
    });
    expect(phoneNumberInput.value).toBe(
        'ewafewa waef ewaf ewafwe afweaf 34qr43 f43f43wf 4we3 fe4fe4 fef4q a4f 4ef 4ef 43e 4ef4 3efwe4afas efdsa fsdaf443rtt34f34fe4r fddfs fdsgdfsggfsd fsdgdfsgdfsg'
    );

    phoneNumberValError = container.querySelector("[data-testid='valerror-phone_number']");
    expect(phoneNumberValError).toBeTruthy();
    expect(phoneNumberValError).toHaveTextContent(
        'Text field have to contains between 3 and 150 characters!'
    );

    fireEvent.change(phoneNumberInput, { target: { value: '' } });
    expect(phoneNumberInput.value).toBe('');

    phoneNumberValError = container.querySelector("[data-testid='valerror-phone_number']");
    expect(phoneNumberValError).toBeTruthy();
    expect(phoneNumberValError).toHaveTextContent('This field can not be empty!');
});

it(`Check validations for password`, () => {
    act(() => {
        render(<SignUpPage />, container);
    });
    const passwordInput = container.querySelector("[data-testid='password']");
    fireEvent.change(passwordInput, { target: { value: 'Ae' } });
    expect(passwordInput.value).toBe('Ae');

    let passwordValError = container.querySelector("[data-testid='valerror-password']");
    expect(passwordValError).toBeTruthy();
    expect(passwordValError).toHaveTextContent(
        'Password field have to contains between 6 and 150 characters!'
    );

    fireEvent.change(passwordInput, {
        target: {
            value: 'ewafewa waef ewaf ewafwe afweaf 34qr43 f43f43wf 4we3 fe4fe4 fef4q a4f 4ef 4ef 43e 4ef4 3efwe4afas efdsa fsdaf443rtt34f34fe4r fddfs fdsgdfsggfsd fsdgdfsgdfsg',
        },
    });
    expect(passwordInput.value).toBe(
        'ewafewa waef ewaf ewafwe afweaf 34qr43 f43f43wf 4we3 fe4fe4 fef4q a4f 4ef 4ef 43e 4ef4 3efwe4afas efdsa fsdaf443rtt34f34fe4r fddfs fdsgdfsggfsd fsdgdfsgdfsg'
    );

    passwordValError = container.querySelector("[data-testid='valerror-password']");
    expect(passwordValError).toBeTruthy();
    expect(passwordValError).toHaveTextContent(
        'Password field have to contains between 6 and 150 characters!'
    );

    fireEvent.change(passwordInput, { target: { value: '' } });
    expect(passwordInput.value).toBe('');

    passwordValError = container.querySelector("[data-testid='valerror-password']");
    expect(passwordValError).toBeTruthy();
    expect(passwordValError).toHaveTextContent('Password field can not be empty!');
});