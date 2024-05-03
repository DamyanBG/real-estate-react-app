import { Link } from 'react-router-dom';

import styles from "./landing.module.scss"

const LandingSection = () => {
    return (
        <section className={styles.landingSection}>
            <article>
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
            </article>
        </section>
    );
};

export default LandingSection;
