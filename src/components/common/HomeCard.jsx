import { Link } from "react-router-dom";

const HomeCard = ({
    imgLink,
    city,
    neightborhood,
    title,
    description,
    price,
}) => {
    return (
        <article className="property-card">
            <article className="property-image-container">
                <img src={imgLink} alt="Property Image" />
            </article>

            <article className="property-address">
                {city}, {neightborhood}
            </article>

            <article className="property-info">
                <h3>{title}</h3>
                <p>{description}</p>
            </article>

            <article className="property-card-footer">
                <span className="property-price">{price}</span>
                <Link href="/details">View Details</Link>
            </article>
        </article>
    );
};

export default HomeCard;