import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { hostUrl } from '../../utils/urls';
import './HomeCard.scss';

const HomeCard = ({ homeId }) => {
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
        <section className="wrapper-suggestions">
            {suggesting.length > 0 ? (
                suggesting.slice(0, 3).map((item) => (
                  <>
                      <article className="property-card" key={item.id}>
                        <article className="property-image-container">
                            <img src={item.photo_url} alt="Property Image" />
                        </article>

                        <article className="property-address">
                            {item.city}, {item.neighborhood}
                        </article>

                        <article className="property-info">
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </article>

                        <article className="property-card-footer">
                            <span className="property-price">{item.price}</span>
                            <Link href="/details">View Details</Link>
                        </article>
                    </article>
                  </>
                ))
            ) : (
                <span></span>
            )}
        </section>
    );
};

export default HomeCard;
