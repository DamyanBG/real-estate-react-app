import React, { useState, useEffect } from 'react';
import { hostUrl } from '../../../common/urls';

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

    return (
        <div className="list">
            {loading
                ? 'downloading'
                : landList.map((land) => (
                      <div className="listItem" key={land._id}>
                          <div>{land.name}</div>
                          <div className="listItem__buttons">
                              <button>Edit</button>
                              <button>Delete</button>
                          </div>
                      </div>
                  ))}
        </div>
    );
}
