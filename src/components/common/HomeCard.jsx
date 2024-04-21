import { Link } from 'react-router-dom';

const HomeCard = ({ homeId, photoUrl, city, neighborhood, title, description, price }) => {
    return (
        <article className="property-card">
            <article className="property-image-container">
                <img src={photoUrl || `../../../public/images/house-image-mirror.png`} alt="Property Image" onError={(e) => {
                    e.target.onerror = null; // prevents looping
                    e.target.src = '../../../public/images/house-image-mirror.png';
                }} />
            </article>

            <article className="property-address">
                {city}, {neighborhood}
            </article>

            <article className="property-info">
                <h3>{title}</h3>
                <p>{description}</p>
            </article>

            <article className="property-card-footer">
                <span className="property-price">{price}</span>
                <Link to={`/home-details?homeId=${homeId}`}>View Details</Link>
            </article>
        </article>
    );
};

export default HomeCard;
