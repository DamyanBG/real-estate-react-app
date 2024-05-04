import { Link } from 'react-router-dom';
import './ExtraHomeCard.scss';

export default function ExtraHomeCard({ homeId, photoUrl, city, neighborhood, title, description, price }){
   return(
    <section className='wrap-container'>
        <div className='extra-card-image-container'>
        <img src={photoUrl} alt="Property Image" onError={(e) => {
                    e.target.onerror = null; // prevents looping
                    e.target.src = defaultImage;
                }} />
        </div>

        <div className='extra-description-container'>
            <div className='extra-description-town-container'><span className='extra-description-town'>{city}</span></div>
            <h2 className='extra-description-title'>{title}</h2>
            <p className='extra-description-neighborhood'>{neighborhood}</p>
            <p className='extra-description-description'>{description}</p>
            <div className='extra-description-view-more-container'>
                <span className='extra-description-price'>{price}</span>
                <div className='extra-description-view-more'>
                <Link className='extra-description-view-more-link' to={`/home-details?homeId=${homeId}`}>View Details</Link>
                </div>
            </div>
        </div>

    </section>
   );
}