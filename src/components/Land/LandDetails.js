import exampleLandPhoto from '../../images/3333214_105132040_big.jpg';
import { useContext, useEffect, useState } from 'react';
import { hostUrl } from '../../common/urls';
import { UserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import './LandDetails.scss';
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';

export default function LandDetails() {
    const params = new URLSearchParams(window.location.search);
    const landId = params.get('landId');
    const { user } = useContext(UserContext);
    const [landDetails, setLandDetails] = useState({});

    const fetchLandDetails = () => {
        fetch(`${hostUrl}/land/${landId}`)
            .then((resp) => resp.json())
            .then((json) => {
                setLandDetails(json);
            });
    };

    useEffect(fetchLandDetails, [landId]);

    return (
        <section className='home-details'>
            <section className="home-details-container">
                <div className="home-details-image-container">
                    <img src={exampleLandPhoto} alt="Land" />
                </div>
                <div className="home-details-text">
                    <h2>{landDetails.name}</h2>
                    <p>Location: {landDetails.place}</p>
                    <p>Price: {landDetails.price}</p>
                    <p>
                        Owner: {landDetails.owner_names}{' '}
                        {user._id && user._id !== landDetails.owner && (
                            <Link
                                to={`/chat?interlocutorId=${landDetails.owner}&names=${landDetails.owner_names}`}
                            >
                                <button>Start chat</button>
                            </Link>
                        )}{' '}
                        {user._id && user._id !== landDetails.owner && (
                            <Link to={`/create-meeting?createWithId=${landDetails.owner}`}>
                                <button>Request meeting</button>
                            </Link>
                        )}
                    </p>
                    <p>Information: {landDetails.description}</p>
                    {user._id === landDetails.owner ? (
                        <>
                            <Link to={`/edit-land?landId=${landId}`} className="land-details_edit">
                                Edit
                            </Link>
                        </>
                    ) : (
                        ''
                    )}
                    {user._id === landDetails.owner ? (
                        <>
                            <Link to={`/create-visitation?landId=${landId}`}>
                                <button>Create visitation</button>
                            </Link>
                        </>
                    ) : (
                        ''
                    )}
                </div>
            </section>
            {landDetails.latitude && landDetails.longitude && (
                <article className='map-container'>
                    <MapContainer
                        center={[landDetails.latitude, landDetails.longitude]}
                        zoom={13}
                        scrollWheelZoom={false}
                        style={{ width: '100%', height: '50vh' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[landDetails.latitude, landDetails.longitude]}>
                            <Tooltip direction="bottom">Some text</Tooltip>
                        </Marker>
                    </MapContainer>
                </article>
            )}
        </section>
    );
}
