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
        setClick(false);
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
            <section>
                <Link style={{ textDecoration: 'none' }} to="/">
                    <p className="app-name">Real Estate App Check</p>
                </Link>
            </section>
            <nav>
                <ul>
                    <li
                        className="buy-list"
                        onMouseEnter={() => {
                            setClick(true);
                        }}
                        onClick={() => {
                            setClick(false);
                        }}
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
                                        <Link className="buy-patch" to="/all-homes">
                                            Homes for sale
                                        </Link>
                                        <Link className="buy-patch" to="/all-lands">
                                            Land for sale
                                        </Link>
                                    </div>
                                </div>
                            </>
                        )}
                        Buy
                    </li>
                    <li
                        className="buy-list"
                        onMouseEnter={() => {
                            setSellClick(true);
                        }}
                        onClick={() => {
                            setSellClick(false);
                        }}
                    >
                        {sellClick && (
                            <>
                                <div className="buy-element">
                                    <div className="buy-element-arrow"></div>
                                    <div className="buy-element-cont">
                                        <Link
                                            className="buy-patch"
                                            to={
                                                user._id && user.role == 'seller'
                                                    ? '/create-home'
                                                    : '/'
                                            }
                                            onClick={() => {
                                                SellHandler();
                                            }}
                                        >
                                            Sell Home
                                        </Link>
                                        <Link
                                            className="buy-patch"
                                            to={
                                                user._id && user.role == 'seller'
                                                    ? '/create-land'
                                                    : '/'
                                            }
                                            onClick={SellHandler}
                                        >
                                            Sell Land
                                        </Link>
                                    </div>
                                </div>
                            </>
                        )}
                        Sell
                    </li>
                    <Link style={{ textDecoration: 'none' }} to="/rent">
                        <li>Rent</li>
                    </Link>

                    <Link style={{ textDecoration: 'none' }} to="/news">
                        <li>News</li>
                    </Link>

                    <Link style={{ textDecoration: 'none' }} to="/about">
                        <li>About</li>
                    </Link>
                </ul>
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
                    <Link style={{ textDecoration: 'none' }} to={user._id ? '/profile' : '/signup'}>
                        {user._id ? 'Profile' : 'Sign up'}
                    </Link>
                </p>
                <p>
                    <Link
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
