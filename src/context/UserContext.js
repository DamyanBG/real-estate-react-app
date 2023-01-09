import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { hostUrl } from '../common/urls';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userInfo, setUserInfo] = useState({});

    const getUserInfo = async (userId) => {
        await fetch(`${hostUrl}/user/${userId}`)
            .then((resp) => resp.json())
            .then(setUserInfo);
    };

    useEffect(() => {
        const localStorageUser = localStorage.getItem('userId');

        if (localStorageUser) {
            setUser(localStorageUser);
            getUserInfo(localStorageUser);
        }
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                userInfo,
                setUserInfo,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.object,
};
