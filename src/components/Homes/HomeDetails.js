import './Homes.scss';
import exampleHomePhoto from '../../images/home-main-photo-example.jpg';
import { useContext, useEffect, useState } from 'react';
import { hostUrl } from '../../common/urls';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

export default function HomeDetails() {
    const params = new URLSearchParams(window.location.search);
    const homeId = params.get('homeId');
    const [homeDetails, setHomeDetails] = useState({});
    const { user } = useContext(UserContext);

    const fetchHomeDetails = () => {
        fetch(`${hostUrl}/home/${homeId}`)
            .then((resp) => resp.json())
            .then((json) => {
                console.log(json);
                setHomeDetails(json);
            });
    };

    useEffect(fetchHomeDetails, [homeId]);

    return (
        <section className="home-details-container">
            <div className="home-details-image-container">
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
                <p>
                    Owner: {homeDetails.owner_names}{' '}
                    {user._id && user._id !== homeDetails.owner_id && (
                        <Link
                            to={`/chat?interlocutorId=${homeDetails.owner_id}&names=${homeDetails.owner_names}`}
                        >
                            <button>Start chat</button>
                        </Link>
                    )}
                    {user._id && user._id !== homeDetails.owner_id && (
                        <Link to={`/create-meeting?createWithId=${homeDetails.owner_id}`}>
                            <button>Request meeting</button>
                        </Link>
                    )}
                </p>
                {user._id === homeDetails.owner_id && (
                    <Link to={`/edit-home?homeId=${homeId}`}>
                        <button>Edit</button>
                    </Link>
                )}
            </div>
        </section>
    );
}
