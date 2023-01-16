import React, { useState, useEffect } from 'react';
import { hostUrl } from 'common/urls';
import { api } from 'common/api';

const LANDS_URL = '/lands';
const LAND_URL = '/land';

export default function Lands() {
    const [landList, setLandList] = useState([]);
    const [loading, setLoading] = useState(false);

    const getHomeList = async () => {
        setLoading(true);
        const list = await api.getAll(`${hostUrl}${LANDS_URL}`);
        setLandList(list);
        setLoading(false);
    };

    useEffect(() => {
        getHomeList();
    }, []);

    const deleteLand = async (landId) => {
        const body = {
            body: JSON.stringify({
                land_id: landId,
            }),
        };

        const result = await api.delete(`${hostUrl}${LAND_URL}`, body);
        if (result.ok) {
            const newLandList = landList.filter((land) => land._id !== landId);
            setLandList(newLandList);
        }
    };

    return (
        <>
            {loading
                ? 'downloading'
                : landList.map((land) => (
                      <div className="listItem" key={land._id}>
                          <div>{land.name}</div>
                          <div className="listItem__buttons">
                              <button>Edit</button>
                              <button type="button" onClick={() => deleteLand(land._id)}>
                                  Delete
                              </button>
                          </div>
                      </div>
                  ))}
        </>
    );
}
