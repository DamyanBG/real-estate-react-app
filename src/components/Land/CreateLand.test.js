import { render, unmountComponentAtNode } from 'react-dom';
import CreateLand from './CreateLand';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import { UserProvider } from 'context/UserContext';
import { fireEvent, waitForElementToBeRemoved  } from '@testing-library/dom';

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
        render((
            <UserProvider>
                <CreateLand />
            </UserProvider>
        ), container);
    });
    expect(container.textContent).toBe(
        'NamePlacePriceSizeDescriptionLongitudeLatitudeSubmit'
    );
});

// Handle failures with test in async code, using Promise, using async/await, callback
it('test fail request', async () => {
    await act(async () => {
        render((
            <UserProvider>
                <CreateLand />
            </UserProvider>
        ), container);
    });

    jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.reject({})
    );

    const nameField = container.querySelector("[data-testid='name']")
    fireEvent.change(nameField, { target: { value: 'Zemedelska zemq' } });
    
    const placeField = container.querySelector("[data-testid='place']")
    fireEvent.change(placeField, { target: { value: 'Dobrudza' } });

    const priceField = container.querySelector("[data-testid='price']")
    fireEvent.change(priceField, { target: { value: '100000' } });

    const sizeField = container.querySelector("[data-testid='size']")
    fireEvent.change(sizeField, { target: { value: '200' } });

    const descriptionField = container.querySelector("[data-testid='description']")
    fireEvent.change(descriptionField, { target: { value: 'MNogo hubava zemedelska zemq, dobra lokaciq' } });

    const lonField = container.querySelector("[data-testid='longitude']")
    fireEvent.change(lonField, { target: { value: '22' } });

    const latField = container.querySelector("[data-testid='latitude']")
    fireEvent.change(latField, { target: { value: '22' } });

    const submitButton = container.querySelector("[data-testid='submit-button']");

    await act(async () => {
        fireEvent.click(submitButton);
    })

    expect(nameField.value).toBe('Zemedelska zemq');
    expect(placeField.value).toBe('Dobrudza');
    expect(priceField.value).toBe('100000');
    expect(sizeField.value).toBe('200');
    expect(descriptionField.value).toBe('MNogo hubava zemedelska zemq, dobra lokaciq');
    expect(lonField.value).toBe('22');
    expect(latField.value).toBe('22');
})