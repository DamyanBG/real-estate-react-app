import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

import { UserContext } from "../../context/UserProvider";
import { ROLES_ENUM } from "../../utils/enums";

import styles from "./header.module.scss";

const UserNav = ({ handleLinkClick }) => {
    const { user, setUser } = useContext(UserContext);
    const isAuthenticated = !!user.token;

    const handleLogOut = () => {
        setUser({});
        localStorage.removeItem("user");
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

const SellLink = ({ onLinkClick }) => {
    const { user } = useContext(UserContext);
    const role = user.role;
    const isSeller = role === ROLES_ENUM.seller;

    const navigateTo = isSeller ? "/create-home" : "/";

    const handleLinkClick = () => {
        if (!isSeller) {
            toast.error("You have to be registered as seller to Sell!", {
                autoClose: 3000,
                pauseOnHover: false,
            });
        }
        onLinkClick();
    };

    return (
        <Link
            onClick={handleLinkClick}
            data-testid="sell-home-link"
            to={navigateTo}
        >
            Sell
        </Link>
    );
};

export default function Header() {
    const [isActive, setIsActive] = useState(false);

    const navBarClassName = isActive
        ? `${styles.navBar} ${styles.active}`
        : styles.navBar;

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
            <article
                className={styles.hamburger}
                onClick={handleHamburgerClick}
            >
                <article className={styles.line}></article>
                <article className={styles.line}></article>
                <article className={styles.line}></article>
            </article>
            <nav className={navBarClassName}>
                <ul>
                    <li>
                        <Link
                            onClick={handleLinkClick}
                            className={styles.active}
                            to="/all-homes"
                        >
                            Buy
                        </Link>
                    </li>
                    <li>
                        <SellLink onLinkClick={handleLinkClick} />
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
