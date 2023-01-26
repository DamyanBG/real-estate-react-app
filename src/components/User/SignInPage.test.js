import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserProvider } from '../../context/UserContext';

import SignIn from './SignInPage';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

test('exists', async () => {
    const { debug } = render(
        <UserProvider>
            <SignIn />
        </UserProvider>
    );
    // console.log(screen);
    debug();
    const component = screen.getByTestId('sign-in-page-form');
    expect(component).toBeInTheDocument;
});
