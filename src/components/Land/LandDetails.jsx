/* eslint-disable */

import exampleLandPhoto from '../../images/3333214_105132040_big.jpg';
import { useContext, useEffect, useState } from 'react';
import { hostUrl } from '../../utils/urls';
import { UserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import './LandDetails.scss';
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';
import VisitationsTable from '@/common/VisitationsTable';
import { useLocation  } from 'react-router-dom';

export default function LandDetails() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const landId = params.get('landId');
    const { user } = useContext(UserContext);
    const [landDetails, setLandDetails] = useState({});
    const [visitations, setVisitations] = useState([])

    const fetchLandDetails = () => {
        if (!landId) return
        fetch(`${hostUrl}/land-details/${landId}`)
            .then((resp) => {
                return resp.json()
            })
            .then((json) => {
                console.log(json)
                setLandDetails(json.land)
                setVisitations(json.visitations)
            });
    };

    useEffect(fetchLandDetails, [landId]);

    return (
        <section className='home-details'>
            <section className="home-details-container">
                <div className="home-details-image-container">
                    <img src={landDetails.photo_url} alt="Land" />
                </div>
                <div className="home-details-text">
                    <h2>{landDetails.name}</h2>
                    <p>Location: {landDetails.place}</p>
                    <p>Price: {landDetails.price}</p>
                    <p>
                        Owner: {landDetails.owner_names}{' '}
                        {user.id && user._d !== landDetails.owner_id && (
                            <Link
                                to={`/chat?interlocutorId=${landDetails.owner_id}&names=${landDetails.owner_names}`}
                            >
                                <button>Start chat</button>
                            </Link>
                        )}{' '}
                        {user.id && user.id !== landDetails.owner_id && (
                            <Link to={`/create-meeting?createWithId=${landDetails.owner_id}`}>
                                <button>Request meeting</button>
                            </Link>
                        )}
                    </p>
                    <p>Information: {landDetails.description}</p>
                    {user.id === landDetails.owner_id ? (
                        <>
                            <Link to={`/edit-land?landId=${landId}`} className="land-details_edit">
                                Edit
                            </Link>
                        </>
                    ) : (
                        ''
                    )}
                    {visitations.length > 0 && <VisitationsTable visitations={visitations} />}
                    {user.id === landDetails.owner_id ? (
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
            {(landDetails.latitude && landDetails.longitude) && (
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
