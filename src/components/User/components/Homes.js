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

    return (
        <div className="list">
            {loading
                ? 'downloading...'
                : homeList.map((home) => (
                      <div className="listItem" key={home._id}>
                          <div>{home.title}</div>
                          <div className="listItem__buttons">
                              <button>Edit</button>
                              <button>Delete</button>
                          </div>
                      </div>
                  ))}
        </div>
    );
}
