import { Link } from 'react-router-dom';
import styles from './RoundedHomeCard.module.css';
import defaultImage from '../../../assets/images/house-image-mirror.png';

export default function RoundedHomeCard({ homeId, photoUrl, city, neighborhood, title, description, price }){
   return(
    <section className={styles.wrapContainer}>
        <article className={styles.extraCardImageContainer}>
        <img src={photoUrl} alt="Property Image" onError={(e) => {
                    e.target.onerror = null; // prevents looping
                    e.target.src = defaultImage;
                }} />
        </article>

        <article className={styles.extraDescriptionContainer}>
            <article className={styles.extraDescriptionTownContainer}><span className={styles.extraDescriptionTown}>{city}</span></article>
            <h2 className={styles.extraDescriptionTitle}>{title}</h2>
            <p className={styles.extraDescriptionNeighborhood}>{neighborhood}</p>
            <p className={styles.extraDescriptionDescription}>{description}</p>
            <article className={styles.extraDescriptionViewMoreContainer}>
                <span className={styles.extraDescriptionPrice}>{price}</span>
                <article className={styles.extraDescriptionViewMore}>
                <Link className={styles.extraDescriptionViewMoreLink} to={`/home-details?homeId=${homeId}`}>View Details</Link>
                </article>
            </article>
        </article>

    </section>
   );
}