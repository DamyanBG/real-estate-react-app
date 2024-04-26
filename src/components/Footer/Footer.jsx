import { Link } from 'react-router-dom';

import styles from './footer.module.scss';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <section>
                <h3>About us</h3>
                <hr />
                <p>Project Information</p>
                <p>Contact</p>
                <p>Developers</p>
            </section>
            <section>
                <h3>Information</h3>
                <hr />
                <p>How to add home</p>
                <p>How to edit home</p>
            </section>
            <section>
                <h3>Social media</h3>
                <hr />
                <p>
                    <i className="bx bxl-facebook-square" /> Facebook
                </p>
                <p>
                    <i className="bx bxl-instagram-alt" /> Instagram
                </p>
            </section>
        </footer>
    );
};

export default Footer;
