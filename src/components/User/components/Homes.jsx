import React, { useState, useEffect } from 'react';
import { hostUrl } from 'utils/urls';
import { api } from 'common/api';

const HOMES_URL = '/homes';
const HOME_URL = '/home';

export default function Homes() {
    const [homeList, setHomeList] = useState([]);
    const [loading, setLoading] = useState(false);

    const getHomeList = async () => {
        setLoading(true);
        const list = await api.getAll(`${hostUrl}${HOMES_URL}`);
        setHomeList(list);
        setLoading(false);
    };

    useEffect(() => {
        getHomeList();
    }, []);

    const deleteHome = async (homeId) => {
        const body = {
            body: JSON.stringify({
                home_id: homeId,
            }),
        };

        const result = await api.delete(`${hostUrl}${HOME_URL}`, body);
        if (result.ok) {
            const newHomeList = homeList.filter((home) => home._id !== homeId);
            setHomeList(newHomeList);
        }
    };

    return (
        <>
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
        </>
    );
}
