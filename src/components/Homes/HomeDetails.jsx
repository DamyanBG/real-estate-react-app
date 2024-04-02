import './Homes.scss';
import exampleHomePhoto from '../../images/home-main-photo-example.jpg';
import { useContext, useEffect, useState, lazy } from 'react';
import './HomeDetails.scss';
import { hostUrl } from '@/utils/urls';
import { Link } from 'react-router-dom';
import VisitationsTable from '../..//common/VisitationsTable';
import { UserContext } from '../../context/UserContext';
import HomeCard from '../common/HomeCard';
import SuggestingProperties from './SuggestingProperties';

// Temporory mocking
const fakeVisitations = [
    {
        id: '1',
        date: '26.12.1988',
        start_hour: '12:36',
        end_hour: '20:00',
        address: 'Dobrich street test',
    },
    {
        id: '2',
        date: '26.12.1988',
        start_hour: '12:36',
        end_hour: '20:00',
        address: 'Dobrich street test',
    },
    {
        id: '3',
        date: '26.12.1988',
        start_hour: '12:36',
        end_hour: '20:00',
        address: 'Dobrich street test',
    },
];

const MapView = lazy(() => import('@/common/MapView'));

export default function HomeDetails() {
    const params = new URLSearchParams(window.location.search);
    const homeId = params.get('homeId');

    const [homeDetails, setHomeDetails] = useState({});
    const [visitations, setVisitations] = useState([]);
    const { user } = useContext(UserContext);

    const fetchHomeDetails = () => {
        fetch(`${hostUrl}/home-details/${homeId}`)
            .then((resp) => resp.json())
            .then((json) => {
                // console.log(json);
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
                    {fakeVisitations.length > 0 && (
                        <VisitationsTable visitations={fakeVisitations} />
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
                </div>
            </section>
            {homeDetails.latitude && homeDetails.longitude && (
                <MapView latitude={homeDetails.latitude} longitude={homeDetails.longitude} />
            )}
            <section className='tester'>
                <SuggestingProperties homeId={homeId}/>
            </section>
            <section className="suggestions">
                <section className="properties-card-container ">
                    <HomeCard
                        imgLink={homeDetails.photo_url}
                        city={homeDetails.city}
                        neightborhood={homeDetails.neighborhood}
                        title={homeDetails.title}
                        description={homeDetails.description}
                        price={homeDetails.price}
                    />
                    <HomeCard
                        imgLink={homeDetails.photo_url}
                        city={homeDetails.city}
                        neightborhood={homeDetails.neighborhood}
                        title={homeDetails.title}
                        description={homeDetails.description}
                        price={homeDetails.price}
                    />
                    <HomeCard
                        imgLink={homeDetails.photo_url}
                        city={homeDetails.city}
                        neightborhood={homeDetails.neighborhood}
                        title={homeDetails.title}
                        description={homeDetails.description}
                        price={homeDetails.price}
                    />
                </section>
            </section>
        </section>
    );
}
