import React, { useState, useEffect } from 'react';
import { hostUrl } from 'common/urls';

export default function Users() {
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(false);

    const getUserList = () => {
        setLoading(true);
        fetch(`${hostUrl}/users`)
            .then((resp) => resp.json())
            .then((list) => {
                setUserList(list);
                setLoading(false);
            });
    };

    useEffect(() => {
        getUserList();
    }, []);

    const deleteUser = (userId) => {
        fetch(`${hostUrl}/user`, {
            method: 'DELETE',
            body: JSON.stringify({
                user_id: userId,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((resp) => {
            if (resp.ok) {
                const newUserList = userList.filter((ul) => ul._id !== userId);
                setUserList(newUserList);
            }
        });
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
