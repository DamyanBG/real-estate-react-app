import exampleLandPhoto from '../../images/3333214_105132040_big.jpg';
import { useEffect, useState } from 'react';
import { hostUrl } from '../../common/urls';

export default function LandDetails() {
    const params = new URLSearchParams(window.location.search);
    const landId = params.get('landId');
    const [landDetails, setLandDetails] = useState({});

    const fetchLandDetails = () => {
        fetch(`${hostUrl}/land/${landId}`)
            .then((resp) => resp.json())
            .then((json) => {
                console.log(json);
                setLandDetails(json);
            });
    };

    useEffect(fetchLandDetails, [landId]);

    return (
        <section className="home-details-container">
            <div className="home-details-image-container">
                <img src={exampleLandPhoto} alt="Land" />
            </div>
            <div className="home-details-text">
                <h2>{landDetails.name}</h2>
                <p>Location: {landDetails.place}</p>
                <p>Price: {landDetails.price}</p>
                <p>Owner: {landDetails.owner_names}</p>
                <p>Information: {landDetails.description}</p>
            </div>
        </section>
    );
}
