import { useEffect, useState } from 'react';
import './HomePage.scss';
import { hostUrl } from '../../common/urls';
import homePagePhoto from '../../images/cropped_better_house.png';
import { GoLocation } from 'react-icons/go';

export default function HomePage() {
    const [homes, setHomes] = useState([]);

    useEffect(() => {
        fetchAllHomes();
    }, []);

    const limitHomes = (fetchedHomes) => {
        setHomes(fetchedHomes.slice(0, 4));
    };

    const fetchAllHomes = () => {
        fetch(`${hostUrl}/homes`)
            .then((resp) => resp.json())
            .then((json) => limitHomes(json));
    };

    return (
        <div>
            <article className="landing-page-image-container">
                <article>
                    Real<br />
                    Estate<br />App
                </article>
                <article>
                    For
                    <br />
                    everybody
                </article>
                <img src={homePagePhoto} alt="Home page house photo" style={{ width: '100%' }} />
                
                
            </article>
            <div className="home-articles-container">
                {homes.map((h) => (
                    <article key={h._id} className="home-article">
                        <article>
                            <img className="home-article-image" src={h.photo_url} alt="Home" />
                        </article>
                        <article>
                            <h4>{h.title}</h4>

                            <p>
                                <GoLocation size={16} /> {h.city}
                            </p>
                            <p>$ {h.price}</p>
                        </article>
                    </article>
                ))}
            </div>
        </div>
    );
}
