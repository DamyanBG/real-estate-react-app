import './Homes.scss';
import exampleHomePhoto from '../../images/home-main-photo-example.jpg';
import { useContext, useEffect, useState } from 'react';
import { hostUrl } from '../../common/urls';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';
import VisitationsTable from 'common/VisitationsTable';

export default function HomeDetails() {
    const params = new URLSearchParams(window.location.search);
    const homeId = params.get('homeId');
    const [homeDetails, setHomeDetails] = useState({});
    const [visitations, setVisitations] = useState([])
    const { user } = useContext(UserContext);

    const fetchHomeDetails = () => {
        fetch(`${hostUrl}/home-details/${homeId}`)
            .then((resp) => resp.json())
            .then((json) => {
                console.log(json)
                setHomeDetails(json.home_details);
                setVisitations(json.visitations);
            });
    };

    useEffect(fetchHomeDetails, [homeId]);

    return (
        <section className="home-details">
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
                    {visitations.length > 0 && <VisitationsTable visitations={visitations} />}
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
                </div>
            </section>
            {homeDetails.latitude && homeDetails.longitude && (
                <article className='map-container'>
                    <MapContainer
                        center={[homeDetails.latitude, homeDetails.longitude]}
                        zoom={13}
                        scrollWheelZoom={false}
                        style={{ width: '100%', height: '50vh' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[homeDetails.latitude, homeDetails.longitude]}>
                            <Tooltip direction="bottom">Some text</Tooltip>
                        </Marker>
                    </MapContainer>
                </article>
            )}
        </section>
    );
}
