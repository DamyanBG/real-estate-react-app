import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { BiMessageDetail } from 'react-icons/bi';
import { MdMeetingRoom } from 'react-icons/md';

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

    const navBarClassName = isActive ? 'nav-bar active' : 'nav-bar';

    const handleHamburgerClick = () => {
        setIsActive(!isActive);
    };

    const handleLinkClick = () => {
        setIsActive(false);
    };

    return (
        <header>
            <article className="site-name">
                <Link to="/">REAL ESTATE</Link>
            </article>
            <article className="hamburger" onClick={handleHamburgerClick}>
                <article className="line"></article>
                <article className="line"></article>
                <article className="line"></article>
            </article>
            <nav className={navBarClassName}>
                <ul>
                    <li>
                        <Link onClick={handleLinkClick} className="active" to="/all-homes">
                            Buy
                        </Link>
                    </li>
                    <li>
                        <Link onClick={handleLinkClick} to="/create-home">
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
