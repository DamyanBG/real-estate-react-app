import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';

import { UserContext } from '../../context/UserProvider';

import styles from "./header.module.scss"

const UserNav = ({ handleLinkClick }) => {
    const { user, setUser } = useContext(UserContext);
    const isAuthenticated = !!user.token;

    const handleLogOut = () => {
        setUser({});
        localStorage.removeItem('user');
    };

    if (isAuthenticated) {
        return (
            <>
                <li>
                    <Link onClick={handleLinkClick} to="/profile">
                        Profile
                    </Link>
                </li>
                <li>
                    <Link onClick={handleLogOut} to="/">
                        Sign Out
                    </Link>
                </li>
            </>
        );
    }

    return (
        <>
            <li>
                <Link onClick={handleLinkClick} to="/signin">
                    Sign In
                </Link>
            </li>
            <li>
                <Link onClick={handleLinkClick} to="/signup">
                    Sign Up
                </Link>
            </li>
        </>
        // {user.id && (
        //     <p>
        //         <Link style={{ textDecoration: 'none' }} to={'/list-meetings'}>
        //             <MdMeetingRoom size={25} />
        //         </Link>
        //     </p>
        // )}
        // {user.id && (
        //     <p>
        //         <Link style={{ textDecoration: 'none' }} to={'/chat-history'}>
        //             <BiMessageDetail size={25} />
        //         </Link>
        //     </p>
        // )
    );
};

export default function Header() {
    const [isActive, setIsActive] = useState(false);

    const navBarClassName = isActive ? `${styles.navBar} ${styles.active}` : styles.navBar;

    const handleHamburgerClick = () => {
        setIsActive(!isActive);
    };

    const handleLinkClick = () => {
        setIsActive(false);
    };

    return (
        <header className={styles.header}>
            <article className={styles.siteName}>
                <Link to="/">REAL ESTATE</Link>
            </article>
            <article className={styles.hamburger} onClick={handleHamburgerClick}>
                <article className={styles.line}></article>
                <article className={styles.line}></article>
                <article className={styles.line}></article>
            </article>
            <nav className={navBarClassName}>
                <ul>
                    <li>
                        <Link onClick={handleLinkClick} className={styles.active} to="/all-homes">
                            Buy
                        </Link>
                    </li>
                    <li>
                        <Link onClick={handleLinkClick} to="/create-home" data-testid="sell-home-link">
                            Sell
                        </Link>
                    </li>
                    <li>
                        <Link onClick={handleLinkClick} to="/rent">
                            Rent
                        </Link>
                    </li>
                    <li>
                        <Link onClick={handleLinkClick} to="/news">
                            News
                        </Link>
                    </li>
                    <UserNav handleLinkClick={handleLinkClick} />
                </ul>
            </nav>
        </header>
    );
}
