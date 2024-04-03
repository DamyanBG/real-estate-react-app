import { useEffect, useState } from 'react';
import { hostUrl } from '../../utils/urls';
import HomeCard from '../common/HomeCard';

const HomeSuggestions = ({ homeId }) => {
    const [suggestions, setSuggestions] = useState([]);
    const fetchSuggestingHome = () => {
        fetch(`${hostUrl}/homes-suggestion/${homeId}`)
            .then((res) => res.json())
            .then((data) => {
                setSuggestions(data);
            });
    };

    useEffect(() => {
        fetchSuggestingHome();
    }, []);

    return (
        suggestions.length && (
            <section className="suggestions">
                <section className="properties-card-container">
                    {suggestions.map((homeSug) => (
                        <HomeCard
                            key={homeSug.id}
                            homeId={homeSug.id}
                            photoUrl={homeSug.photo_url}
                            city={homeSug.city}
                            neighborhood={homeSug.neighborhood}
                            title={homeSug.title}
                            description={homeSug.description}
                            price={homeSug.price}
                        />
                    ))}
                </section>
            </section>
        )
    );
};

export default HomeSuggestions;
