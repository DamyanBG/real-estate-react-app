import React, { useState, useEffect } from 'react';
import { hostUrl } from 'common/urls';

export default function Lands() {
    const [landList, setLandList] = useState([]);
    const [loading, setLoading] = useState(false);

    const getHomeList = () => {
        setLoading(true);
        fetch(`${hostUrl}/lands`)
            .then((resp) => resp.json())
            .then((list) => {
                setLandList(list);
                setLoading(false);
            });
    };

    useEffect(() => {
        getHomeList();
    }, []);

    const deleteLand = (landId) => {
        fetch(`${hostUrl}/land`, {
            method: 'DELETE',
            body: JSON.stringify({
                land_id: landId,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((resp) => {
            if (resp.ok) {
                const newLandList = landList.filter((hl) => hl._id !== landId);
                setLandList(newLandList);
            }
        });
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
