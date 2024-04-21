import { Link } from 'react-router-dom';
import './HomeCard.scss';
import { HiMiniMapPin } from "react-icons/hi2";

const HomeCard = ({ homeId, photoUrl, city, neighborhood, title, description, price }) => {
    return (
        <article className="property-card">
            <article className="property-image-container">
                <img src={photoUrl} alt="Property Image" />
            </article>

            <section className='grid-card-container'>
                <article className="property-price-container">
                    <h5 className="property-price">{price}</h5>
                </article>

                <article className="property-info">
                    <h3 className="property-info-title">{title}</h3>
                </article>

                <article className="property-address">
                    <HiMiniMapPin color='#8d8741'/>
                    <div className="property-address-field">
                        {city}, {neighborhood}
                    </div>
                </article>

                <article className="description-card">
                    <p>{description}</p>
                </article>

                <article className="property-card-footer">
                    <Link to={`/details?homeId=${homeId}`}>View Details</Link>
                </article>
            </section>
        </article>
    );
};

export default HomeCard;
