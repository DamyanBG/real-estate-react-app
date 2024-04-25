import { Link, useSearchParams } from 'react-router-dom';
import { useContext, useEffect, useState, lazy } from 'react';

import { hostUrl } from '@/utils/urls';
import exampleHomePhoto from '../../images/home-main-photo-example.jpg';
import VisitationsTable from '../..//common/VisitationsTable';
import { UserContext } from '../../context/UserContext';
import HomeSuggestions from './HomeSuggestions';

import styles from "./home-details.module.scss"

const MapView = lazy(() => import('../../common/MapView'));

export default function HomeDetails() {
    const searchParams = useSearchParams()[0]
    const homeId = searchParams.get('homeId');

    const [homeDetails, setHomeDetails] = useState({});
    const [visitations, setVisitations] = useState([]);
    const { user } = useContext(UserContext);

    const fetchHomeDetails = () => {
        fetch(`${hostUrl}/home-details/${homeId}`)
            .then((resp) => resp.json())
            .then((json) => {
                setHomeDetails(json.home_details);
                setVisitations(json.visitations);
            });
    };

    useEffect(fetchHomeDetails, [homeId]);

    return (
        <section className={styles.homeDetails}>
            <section className={styles.topSection}>
                <article className={styles.imagesContainer}>
                    <article className='property-image-container'>
                        <img
                            src={homeDetails.photo_url}
                            alt="Home"
                            onError={(e) => {
                                e.target.onError = null;
                                e.target.src = exampleHomePhoto;
                            }}
                        />
                    </article>
                </article>

                <article className={styles.mapAndButtons}>
                    {homeDetails.latitude && homeDetails.longitude && (
                        <MapView latitude={homeDetails.latitude} longitude={homeDetails.longitude} />
                    )}
                    <article>
                        <button className={styles.contact}>CONTACT SELLER</button>
                    </article>
                    <article>
                        <button className={styles.contact}>CHAT WITH SELLER</button>
                    </article>
                    <article>
                        <button className={styles.favorites}>ADD TO FAVORITES</button>
                    </article>
                </article>

                {/* <div className="home-details-image-container">
                    <img
                        src={homeDetails.photo_url}
                        alt="Home"
                        onError={(e) => {
                            e.target.onError = null;
                            e.target.src = exampleHomePhoto;
                        }}
                    />
                </div>
                <div className="home-details-text">
                    <h2>{homeDetails.title}</h2>
                    <p>Location: {homeDetails.city}</p>
                    <p>Neighborhood: {homeDetails.neighborhood}</p>
                    <p>Address: {homeDetails.address}</p>
                    <p>Price: {homeDetails.price}</p>
                    <p>Year: {homeDetails.year}</p>
                    <p>Information: {homeDetails.description}</p>
                    <p className="views-counter">Views: {homeDetails.home_views}</p>
                    <p>
                        Owner: {homeDetails.owner_names}{' '}
                        {user.id && user.id !== homeDetails.owner_id && (
                            <Link
                                to={`/chat?interlocutorId=${homeDetails.owner_id}&names=${homeDetails.owner_names}`}
                            >
                                <button>Start chat</button>
                            </Link>
                        )}
                        {user.id && user.id !== homeDetails.owner_id && (
                            <Link to={`/create-meeting?createWithId=${homeDetails.owner_id}`}>
                                <button>Request meeting</button>
                            </Link>
                        )}
                    </p>
                    {visitations.length > 0 && (
                        <VisitationsTable visitations={visitations} />
                    )}
                    {user.id === homeDetails.owner_id && (
                        <>
                            <Link to={`/edit-home?homeId=${homeId}`}>
                                <button>Edit</button>
                            </Link>
                            <Link to={`/create-visitation?homeId=${homeId}`}>
                                <button>Create Visitation</button>
                            </Link>
                        </>
                    )}
                </div> */}
            </section>

            <section className={styles.middleSection}>
                <article className={styles.homeInfo}>
                    <article>
                        <h2>Overview</h2>
                        <hr />
                        <table>
                            <tbody>
                                <tr>
                                    <td>City</td>
                                    <td>{homeDetails.city}</td>
                                </tr>
                                <tr>
                                    <td>Neighborhood</td>
                                    <td>{homeDetails.neighborhood}</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td>{homeDetails.address}</td>
                                </tr>
                                <tr>
                                    <td>Area</td>
                                    <td>{homeDetails.area}</td>
                                </tr>
                                <tr>
                                    <td>Price</td>
                                    <td>{homeDetails.price}</td>
                                </tr>
                                <tr>
                                    <td>Bedrooms</td>
                                    <td>{homeDetails.bedrooms}</td>
                                </tr>
                                <tr>
                                    <td>Bathrooms</td>
                                    <td>{homeDetails.bathrooms}</td>
                                </tr>
                                <tr>
                                    <td>Garages</td>
                                    <td>{homeDetails.garages}</td>
                                </tr>
                                <tr>
                                    <td>Year Build</td>
                                    <td>{homeDetails.year}</td>
                                </tr>
                                <tr>
                                    <td>Views</td>
                                    <td>{homeDetails.home_views}</td>
                                </tr>
                            </tbody>
                        </table>
                        
                    </article>
                    <article>
                        <h2>Description</h2>
                        <hr />
                        <p>{homeDetails.description}</p>
                    </article>
                </article>
                <article className={styles.share}>

                </article>
            </section>
            
            <HomeSuggestions homeId={homeId} />
        </section>
    );
}
