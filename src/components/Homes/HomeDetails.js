import './Homes.scss';
import exampleHomePhoto from '../../images/home-main-photo-example.jpg';
import { useEffect, useState } from 'react';
import { hostUrl } from '../../common/urls';

export default function HomeDetails() {
    const params = new URLSearchParams(window.location.search);
    const homeId = params.get('homeId');
    const [homeDetails, setHomeDetails] = useState({});

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
                <img src={exampleHomePhoto} alt="Home" />
            </div>
            <div className="home-details-text">
                <h2>{homeDetails.title}</h2>
                <p>Location: {homeDetails.city}</p>
                <p>Neighborhood: {homeDetails.neighborhood}</p>
                <p>Address: {homeDetails.address}</p>
                <p>Price: {homeDetails.price}</p>
                <p>Year: {homeDetails.year}</p>
                <p>Information: {homeDetails.description}</p>
            </div>
        </section>
    );
}
