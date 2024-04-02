import { useEffect, useState } from 'react';
import { hostUrl } from './../../utils/urls';
import './SuggestingProperties.scss';

export default function SuggestingProperties({ homeId }) {
    const [suggesting, setSuggesting] = useState([]);
    const fetchSuggestingHome = () => {
        fetch(`${hostUrl}/homes-suggestion/${homeId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data, 'from suggesting Houses');
                setSuggesting(data);
            });
    };

    useEffect(() => {
        fetchSuggestingHome();
    }, []);

    return (
        <div className="suggestings-container">
            {suggesting.length > 0 ? (
                suggesting.slice(0, 3).map((item) => (
                    <article className="sugestings-wrapper" key={item.id}>
                        <img className="suggersting-span-image" src={item.photo_url} />
                        <span className="suggersting-span-city">{item.city}</span>
                        <span className="suggersting-span-neighborhood">{item.neighborhood}</span>
                        <span className="suggersting-span-title">{item.title}</span>
                        <span className="suggersting-span-description">{item.description}</span>
                        <span className="suggersting-span-price">{item.price}</span>
                    </article>
                ))
            ) : (
                <span></span>
            )}
        </div>
    );
}
