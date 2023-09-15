import { render, unmountComponentAtNode } from 'react-dom';
import CreateLand from './CreateLand';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import { UserProvider, UserContext } from 'context/UserContext';
import { fireEvent } from '@testing-library/dom';

jest.mock('utils/urls', () => {
    return {
        hostUrl: "www.somehost.com"
    }
})

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

it('Check context', async () => {
    const MockedUserProvider = ({ children }) => {
        const user = {
            id: "320",
            token: "3234frg*dg34t4e"
        }

        return (
            <UserContext.Provider value={{user}}>
                {children}
            </UserContext.Provider>
        )
    }

    await act(async () => {
        render((
            <MockedUserProvider>
                <CreateLand />
            </MockedUserProvider>
        ), container);
    });

    const fetchMock = jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.reject({})
    );

    const landInfo = {
        name: "Zemedelska zemya",
        place: "Dobrich",
        price: "15000",
        size: "150",
        description: "Hey hey hey bla bla bal",
        longitude: "22",
        latitude: "22",
    }


    const nameField = container.querySelector("[data-testid='name']")
    fireEvent.change(nameField, { target: { value: landInfo.name } });
    
    const placeField = container.querySelector("[data-testid='place']")
    fireEvent.change(placeField, { target: { value: landInfo.place } });

    const priceField = container.querySelector("[data-testid='price']")
    fireEvent.change(priceField, { target: { value: landInfo.price } });

    const sizeField = container.querySelector("[data-testid='size']")
    fireEvent.change(sizeField, { target: { value: landInfo.size } });

    const descriptionField = container.querySelector("[data-testid='description']")
    fireEvent.change(descriptionField, { target: { value: landInfo.description } });

    const lonField = container.querySelector("[data-testid='longitude']")
    fireEvent.change(lonField, { target: { value: landInfo.longitude } });

    const latField = container.querySelector("[data-testid='latitude']")
    fireEvent.change(latField, { target: { value: landInfo.latitude } });

    const submitButton = container.querySelector("[data-testid='submit-button']");

    await act(async () => {
        fireEvent.click(submitButton);
    })

    expect(fetchMock).toHaveBeenCalledWith(`www.somehost.com/land`, {
        method: 'POST',
        body: JSON.stringify({
          owner_id: "320",
          ...landInfo,
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${"3234frg*dg34t4e"}`
        },
      });
})