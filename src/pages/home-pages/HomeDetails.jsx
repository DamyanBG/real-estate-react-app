import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState, lazy } from "react";
import { toast } from "react-toastify";

import facebookLogo from "../../assets/images/facebook_logo.png";
import xLogo from "../../assets/images/x_logo.webp";

// import VisitationsTable from '../..//common/VisitationsTable';
import { UserContext } from "../../context/UserProvider";
import HomeSuggestions from "../../components/sections/HomeSuggestions";
import MapView from "../../components/map/MapView";
import { fetchHomeDetails } from "../../api/homeApi";

import styles from "./home-details.module.scss";
import HomeImage from "../../components/image/HomeImage";

export default function HomeDetails() {
    const { homeId } = useParams();

    const [homeDetails, setHomeDetails] = useState({});
    const [visitations, setVisitations] = useState([]);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const getHomeDetails = () => {
        fetchHomeDetails(homeId)
            .then((resp) => resp.json())
            .then((json) => {
                setHomeDetails(json.home_details);
                setVisitations(json.visitations);
            });
    };

    useEffect(getHomeDetails, [homeId]);

    const handleChatClick = () => {
        if (!user.token) {
            toast.error("You must be logged in to use chat!", {
                autoClose: 3000,
                pauseOnHover: false,
            });
            return;
        }
        if (user.id === homeDetails.owner_id) {
            toast.error("This home is added from you!", {
                autoClose: 3000,
                pauseOnHover: false,
            });
            return;
        }
        navigate(`/chat/${homeDetails.owner_id}`);
    };

    const handleRequestView = () => {
        navigate(`/meeting/${homeDetails.owner_id}`);
    };

    return (
        <section className={styles.homeDetails}>
            <section className={styles.topSection}>
                <article className={styles.imagesContainer}>
                    <article className="property-image-container">
                        <HomeImage src={homeDetails.photo_url} />
                    </article>
                </article>

                <article className={styles.mapAndButtons}>
                    {homeDetails.latitude && homeDetails.longitude && (
                        <MapView
                            latitude={homeDetails.latitude}
                            longitude={homeDetails.longitude}
                        />
                    )}
                    <article>
                        <button
                            type="button"
                            className={styles.contact}
                            onClick={handleRequestView}
                        >
                            REQUEST VIEW
                        </button>
                    </article>
                    <article>
                        <button
                            type="button"
                            className={styles.contact}
                            onClick={handleChatClick}
                        >
                            CHAT WITH SELLER
                        </button>
                    </article>
                    <article>
                        <button type="button" className={styles.favorites}>
                            ADD TO FAVORITES
                        </button>
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
                        <table className={styles.overviewTable}>
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
                    <h2>Share</h2>
                    <hr />
                    <button>
                        <img src={facebookLogo} alt="" />
                    </button>
                    <button>
                        <img src={xLogo} alt="" />
                    </button>
                </article>
            </section>

            <HomeSuggestions homeId={homeId} />
        </section>
    );
}
