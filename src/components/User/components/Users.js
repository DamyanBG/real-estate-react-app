import React, { useState, useEffect } from 'react';
import { hostUrl } from '../../../common/urls';

export default function Users() {
    const [userList, setUserList] = useState([]);

    const getUserInfo = () => {
        fetch(`${hostUrl}/users`)
            .then((resp) => resp.json())
            .then(setUserList);
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <div className="userList">
            {userList.map((user) => (
                <div className="userItem" key={user._id}>
                    <div>{user.first_name}</div>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            ))}
        </div>
    );
}
