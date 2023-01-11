import React, { useState, useEffect } from 'react';
import { hostUrl } from '../../../common/urls';

export default function Homes() {
    const [homeList, setHomeList] = useState([]);
    const [loading, setLoading] = useState(false);

    const getHomeList = () => {
        setLoading(true);
        fetch(`${hostUrl}/homes`)
            .then((resp) => resp.json())
            .then((list) => {
                setHomeList(list);
                setLoading(false);
            });
    };

    useEffect(() => {
        getHomeList();
    }, []);

    const deleteHome = (homeId) => {
        fetch(`${hostUrl}/home`, {
            method: 'DELETE',
            body: JSON.stringify({
                home_id: homeId,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((resp) => {
            if (resp.ok) {
                const newHomeList = homeList.filter((hl) => hl._id !== homeId);
                setHomeList(newHomeList);
            }
        });
    };

    return (
        <div className="list">
            {loading
                ? 'downloading...'
                : homeList.map((home) => (
                      <div className="listItem" key={home._id}>
                          <div>{home.title}</div>
                          <div className="listItem__buttons">
                              <button>Edit</button>
                              <button type="button" onClick={() => deleteHome(home._id)}>
                                  Delete
                              </button>
                          </div>
                      </div>
                  ))}
        </div>
    );
}
