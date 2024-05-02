import { Link } from 'react-router-dom';

import HomeCarousel from './HomeCarousel';

import MyImage1 from '../../assets/images/carousel-1.jpg';
import MyImage2 from '../../assets/images/carousel-2.jpg';

const slides = [
    { image: MyImage1 },
    { image: MyImage2 },
];


const MainSection = () => {
    return (
        <section className="landing-section">
            <article>
                <HomeCarousel slides={slides}/>
            </article>
            <article>
                <h1>Welcome To Real Estate App</h1>
                <h2>Platform opened for everybody to publish real estate!</h2>
                <p>
                    Our global Real Estate App! Publish and discover properties effortlessly on our
                    inclusive platform. From any corner of the world, you can easily list your real
                    estate. Our advanced platform ensures a smooth experience for everyone, making
                    property searches super intuitive. Join us and unlock endless possibilities in
                    real estate!
                </p>
                <Link to="/all-homes">Discover</Link>
            </article>
        </section>
    );
};

export default MainSection;
