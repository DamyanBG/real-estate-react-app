import { useContext, useEffect, useState } from 'react';
import './HomePage.scss';
import { hostUrl } from '../../utils/urls';
import homePagePhoto from '../../images/cropped_better_house.png';
import { GoLocation } from 'react-icons/go';
import { HomesContext } from 'context/HomesContext';

const limitHomes = (fetchedHomes) => {
    return fetchedHomes.slice(0, 4);
};

export default function HomePage() {
    const homesContext = useContext(HomesContext);
    const limitedHomes = limitHomes(homesContext.homes)

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
                {limitedHomes.map((h) => (
                    <article key={h.id} className="home-article">
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
