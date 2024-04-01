import './Header.scss';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { BiMessageDetail } from 'react-icons/bi';
import { MdMeetingRoom } from 'react-icons/md';
import { hostUrl } from '../../utils/urls';

export default function Header() {
    const { user, setUser } = useContext(UserContext);
    const [isActive, setIsActive] = useState(false);

    const navBarClassName = isActive ? 'nav-bar active' : 'nav-bar';

    const handleHamburgerClick = () => {
        setIsActive(!isActive);
    };

    const handleLinkClick = () => {
        setIsActive(false);
    };

    const onLogOutHandler = () => {
        if (!user) return;
        fetch(`${hostUrl}/logout`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        }).then((resp) => {
            if (resp.ok) {
                setUser({});
                localStorage.removeItem('user');
            }
        });
    };

    return (
        <header className="nav-bar">
            <section className="header-section">
                <Link className="logo-desktop" style={{ textDecoration: 'none' }} to="/">
                    <p className="app-name">Real Estate App</p>
                </Link>

                <div
                    className={`hamburger-lines ${navBarClassName}`}
                    onClick={handleHamburgerClick}
                >
                    <span className="line line1"></span>
                    <span className="line line2"></span>
                    <span className="line line3"></span>
                </div>
                <ul className={`header-ul-el menu-items ${navBarClassName}`}>
                    <li className="buy-list dropdown">
                        <Link data-testid="buy-home-link" onClick={handleLinkClick} to="/all-homes">
                            Buy
                        </Link>
                    </li>
                    <li className="buy-list dropdown" data-testid="sell-li">
                        <Link
                            onClick={handleLinkClick}
                            to={user.id && user.role == 'seller' ? '/create-home' : '/'}
                            data-testid="sell-home-link"
                        >
                            Sell
                        </Link>
                    </li>
                    <li>
                        <Link className="rent-span" to="/rent">
                            Rent
                        </Link>
                    </li>
                    <li>
                        <Link className="news-span" to="/news">
                            News
                        </Link>
                    </li>
                    <li>
                        <Link className="about-span" to="/about">
                            About
                        </Link>
                    </li>
                    {user.role === 'admin' ? (
                        <p>
                            <Link style={{ textDecoration: 'none' }} to={'/admin/users'}>
                                Admin
                            </Link>
                        </p>
                    ) : (
                        ''
                    )}
                    <p className="sign-up">
                        <Link
                            style={{ textDecoration: 'none' }}
                            to={user.id ? '/profile' : '/signup'}
                        >
                            {user.id ? 'Profile' : 'Sign up'}
                        </Link>
                    </p>
                    <p>
                        {user.id ? (
                            <Link
                                onClick={onLogOutHandler}
                                style={{ textDecoration: 'none' }}
                                to="/"
                            >
                                Sign out
                            </Link>
                        ) : (
                            <Link style={{ textDecoration: 'none' }} to="/signin">
                                Sign in
                            </Link>
                        )}
                    </p>
                    {user.id && (
                        <p>
                            <Link style={{ textDecoration: 'none' }} to={'/list-meetings'}>
                                <MdMeetingRoom size={25} />
                            </Link>
                        </p>
                    )}
                    {user.id && (
                        <p>
                            <Link style={{ textDecoration: 'none' }} to={'/chat-history'}>
                                <BiMessageDetail size={25} />
                            </Link>
                        </p>
                    )}
                </ul>
            </section>
        </header>
    );
}
