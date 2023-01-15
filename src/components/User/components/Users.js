import React, { useState, useEffect } from 'react';
import { hostUrl } from 'common/urls';
import { api } from 'common/api';

const USERS_URL = '/users';
const USER_URL = '/user';

export default function Users() {
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(false);

    const getUserList = async () => {
        setLoading(true);
        const list = await api.getAll(`${hostUrl}${USERS_URL}`);
        setUserList(list);
        setLoading(false);
    };

    useEffect(() => {
        getUserList();
    }, []);

    const deleteUser = async (userId) => {
        const body = {
            body: JSON.stringify({
                user_id: userId,
            }),
        };

        const result = await api.delete(`${hostUrl}${USER_URL}`, body);
        if (result.ok) {
            const newUserList = userList.filter((user) => user._id !== userId);
            setUserList(newUserList);
        }
    };

    return (
        <>
            {loading
                ? 'downloading...'
                : userList.map((user) => (
                      <div className="listItem" key={user._id}>
                          <div>{user.first_name}</div>
                          <div className="listItem__buttons">
                              <button>Edit</button>
                              <button type="button" onClick={() => deleteUser(user._id)}>
                                  Delete
                              </button>
                          </div>
                      </div>
                  ))}
        </>
    );
}
