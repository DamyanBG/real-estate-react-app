import './Header.scss';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { hostUrl } from '../../utils/urls';
import { UserContext } from '../../context/UserContext';
import { BiMessageDetail } from 'react-icons/bi';
import { MdMeetingRoom } from 'react-icons/md';
import { toast } from 'react-toastify';

export default function Header() {
    const [click, setClick] = useState(false);
    const [sellClick, setSellClick] = useState(false);
    const { user, setUser } = useContext(UserContext);

    // For mobile menu
    const [isToggled, setIsToggled] = useState(false);

    // Function to toggle the state
    const toggle = () => setIsToggled(!isToggled);

    const SellHandler = () => {
        if (!user.id) {
            toast.error('You have to be signed in as a seller!', {
                autoClose: 3000,
                pauseOnHover: false,
            });
        } else if (user.role !== 'seller') {
            toast.error('upgrade to a seller role to sell!', {
                autoClose: 3000,
                pauseOnHover: false,
            });
        }
        setClick(false);
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
        <header>
            <section className="header-section">
                {/* <button id='hamburger-menu' onClick={toggle} className={`toggle-button ${isToggled ? 'toggled' : ''}`}>
                    {isToggled ? 'ON' : 'OFF'}
                </button> */}
                <Link className='logo-desktop' style={{ textDecoration: 'none' }} to="/">
                    <p className="app-name">Real Estate App</p>
                </Link>
                <input className="checkbox" type="checkbox" name="" id="" />
                <div className="hamburger-lines">
                    <span className="line line1"></span>
                    <span className="line line2"></span>
                    <span className="line line3"></span>
                </div>

                <ul className="header-ul-el menu-items">
                    <li
                        className="buy-list dropdown"
                        onMouseEnter={() => {
                            setClick(true);
                        }}
                        onMouseLeave={() => {
                            setClick(false);
                        }}
                        data-testid="buy-li"
                    >
                        {click && (
                            <>
                                <div className="buy-element">
                                    <div className="buy-element-arrow"></div>
                                    <div
                                        className="buy-element-cont"
                                        onMouseLeave={() => {
                                            setClick(false);
                                        }}
                                    >
                                        <Link
                                            data-testid="buy-home-link"
                                            className="buy-patch"
                                            to="/all-homes"
                                            onClick={() => setClick(false)}
                                        >
                                            Homes for sale
                                        </Link>
                                        <Link
                                            className="buy-patch"
                                            to="/all-lands"
                                            onClick={() => setClick(false)}
                                        >
                                            Land for sale
                                        </Link>
                                    </div>
                                </div>
                            </>
                        )}
                        Buy
                    </li>
                    <li
                        className="buy-list dropdown"
                        onMouseEnter={() => {
                            setSellClick(true);
                        }}
                        onMouseLeave={() => {
                            setSellClick(false);
                        }}
                        data-testid="sell-li"
                    >
                        {sellClick && (
                            <>
                                <div className="buy-element">
                                    <div className="buy-element-arrow"></div>
                                    <div className="buy-element-cont">
                                        <Link
                                            className="buy-patch"
                                            to={
                                                user.id && user.role == 'seller'
                                                    ? '/create-home'
                                                    : '/'
                                            }
                                            onClick={() => {
                                                setSellClick(false);
                                                SellHandler();
                                            }}
                                            data-testid="sell-home-link"
                                        >
                                            Sell Home
                                        </Link>
                                        <Link
                                            className="buy-patch"
                                            to={
                                                user.id && user.role == 'seller'
                                                    ? '/create-land'
                                                    : '/'
                                            }
                                            onClick={() => {
                                                setSellClick(false);
                                                SellHandler();
                                            }}
                                        >
                                            Sell Land
                                        </Link>
                                    </div>
                                </div>
                            </>
                        )}
                        Sell
                    </li>
                    <li>
                        <Link className="rent-span" style={{ textDecoration: 'none' }} to="/rent">
                            Rent
                        </Link>
                    </li>
                    <li>
                        <Link className="news-span" style={{ textDecoration: 'none' }} to="/news">
                            News
                        </Link>
                    </li>
                    <li>
                        <Link className="about-span" style={{ textDecoration: 'none' }} to="/about">
                            About
                        </Link>
                    </li>
                </ul>
            </section>
            {/* <div className="mobile-right-side-header">
                <nav></nav>
            </div> */}
            <section className="auth">
                {user.role === 'admin' ? (
                    <p>
                        <Link style={{ textDecoration: 'none' }} to={'/admin/users'}>
                            Admin
                        </Link>
                    </p>
                ) : (
                    ''
                )}
                <p>
                    <Link style={{ textDecoration: 'none' }} to={user.id ? '/profile' : '/signup'}>
                        {user.id ? 'Profile' : 'Sign up'}
                    </Link>
                </p>
                <p>
                    {user.id ? (
                        <Link onClick={onLogOutHandler} style={{ textDecoration: 'none' }} to="/">
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
            </section>
        </header>
    );
}
