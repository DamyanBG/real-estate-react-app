import { useEffect, useState } from 'react';
import { hostUrl } from '../../common/urls';
import exampleHomePhoto from '../../images/home-main-photo-example.jpg';
import './Homes.scss';
import { Link } from 'react-router-dom';

export default function AllHomes() {
    const [homes, setHomes] = useState([]);

    useEffect(() => {
        fetchAllHomes();
    }, []);

    const fetchAllHomes = () => {
        fetch(`${hostUrl}/homes`)
            .then((resp) => resp.json())
            .then((json) => {
                console.log(json);
                setHomes(json);
            });
    };

    return (
        <div>
            {homes.map((h) => (
                <article className="home-container" key={`home-${h._id}`}>
                    <div className="image-container">
                        <img
                            className="all-homes-image"
                            src={h.photo_url}
                            onError={(e) => {
                                e.target.onError = null;
                                e.target.src = exampleHomePhoto;
                            }}
                            alt="Home"
                        />
                    </div>
                    <div className="main-text">
                        <Link to={`/home-details?homeId=${h._id}`} className="no-underline">
                            <h3>{h.title}</h3>
                        </Link>
                        <p>Location: {h.city}</p>
                        <p>Price: {h.price}</p>
                    </div>
                    <div className="description-text">
                        <p>{h.description}</p>
                    </div>
                </article>
            ))}
        </div>
    );
}
