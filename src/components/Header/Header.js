import './Header.scss';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { hostUrl } from '../../common/urls';
import { UserContext } from '../../context/UserContext';
import { BiMessageDetail } from 'react-icons/bi';
import { MdMeetingRoom } from 'react-icons/md';
import { toast } from 'react-toastify';

export default function Header() {
    const [click, setClick] = useState(false);

    const [sellClick, setSellClick] = useState(false);
    const { user, setUser } = useContext(UserContext);

    const SellHandler = () => {
        if (!user._id) {
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
    };

    const onLogOutHandler = () => {
        if (!user) return;
        fetch(`${hostUrl}/auth/logout`, {
            method: 'POST',
        }).then((resp) => {
            if (resp.ok) {
                setUser({});
                localStorage.removeItem('user');
            }
        });
    };

    return (
        <header>
            <section className="top-section">
                <Link className="app-name-container" style={{ textDecoration: 'none' }} to="/">
                    <p className="app-name">Real Estate App</p>
                </Link>
            </section>
            <nav className="nav-section">
                <div className="nav-ul">
                    <div
                        className="buy-list"
                        onMouseEnter={() => {
                            setClick(true);
                        }}
                    >
                        {click && (
                            <>
                                <div className="buy-element">
                                    <Link
                                        className="buy-patch"
                                        to="/all-homes"
                                        onMouseLeave={() => {
                                            setClick(false);
                                        }}
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        className="buy-patch"
                                        to="/all-lands"
                                        onMouseLeave={() => {
                                            setClick(false);
                                        }}
                                    >
                                        Land
                                    </Link>
                                </div>
                            </>
                        )}
                        Buy
                    </div>
                    <div
                        className="sell-list"
                        onMouseEnter={() => {
                            setSellClick(true);
                        }}
                    >
                        {sellClick && (
                            <>
                                <div className="buy-element">
                                    <Link
                                        className="buy-patch"
                                        to={
                                            user._id && user.role == 'seller' ? '/create-home' : '/'
                                        }
                                        onMouseLeave={() => {
                                            setSellClick(false);
                                        }}
                                        onClick={SellHandler}
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        className="buy-patch"
                                        to={
                                            user._id && user.role == 'seller' ? '/create-land' : '/'
                                        }
                                        onMouseLeave={() => {
                                            setSellClick(false);
                                        }}
                                        onClick={SellHandler}
                                    >
                                        Land
                                    </Link>
                                </div>
                            </>
                        )}
                        Sell
                    </div>
                    <Link style={{ textDecoration: 'none' }} to="/rent">
                        <li>Rent</li>
                    </Link>

                    <Link style={{ textDecoration: 'none' }} to="/news">
                        <li>News</li>
                    </Link>
                </div>
            </nav>
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
                    <Link
                        className="btn btn--green btn--animated"
                        style={{ textDecoration: 'none' }}
                        to={user._id ? '/profile' : '/signup'}
                    >
                        {user._id ? 'Profile' : 'Sign up'}
                    </Link>
                </p>
                <p>
                    <Link
                        className="btn btn--green btn--animated"
                        onClick={onLogOutHandler}
                        style={{ textDecoration: 'none' }}
                        to={user._id ? '/' : '/signin'}
                    >
                        {user._id ? 'Sign out' : 'Sign in'}
                    </Link>
                </p>
                {user._id && (
                    <p>
                        <Link style={{ textDecoration: 'none' }} to={'/list-meetings'}>
                            <MdMeetingRoom size={25} />
                        </Link>
                    </p>
                )}
                {user._id && (
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
