import React, { useState, useEffect } from 'react';
import './NewsList.scss';
import { hostUrl } from '../../common/urls';

function NewsList() {
    const [loading, setLoading] = useState(false);
    const [news, setNews] = useState([]);

    useEffect(() => {
        const loadNews = async () => {
            setLoading(true);

            const res = await fetch(`${hostUrl}/news`);

            const data = await res.json();
            setNews(data);

            setLoading(false);
        };

        loadNews();
    }, []);

    return (
        <>
            <div className="container">


                {loading ? (
                    <h4>Getting the latest news...</h4>
                ) : (
                    news.map((item) => (
                        <div className="block" key={item.source_id}>
                            <h4 className="news-title">{item.title}</h4>
                            <p>
                                <i>{item.content}</i>
                            </p>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default NewsList;
