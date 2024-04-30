import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const localStorageUser = JSON.parse(localStorage.getItem('user'));

        if (localStorageUser) {
            setUser(localStorageUser);
        }
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
