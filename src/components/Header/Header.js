import './Header.scss';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { hostUrl } from '../../common/urls';
import { UserContext } from '../../context/UserContext';

export default function Header() {
    const [click, setClick] = useState(false);
    const [sellClick, setSellClick] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const { userInfo } = useContext(UserContext);

    const onLogOutHandler = () => {
        if (!user) return;
        fetch(`${hostUrl}/auth/logout`, {
            method: 'POST',
        }).then((resp) => {
            if (resp.ok) {
                setUser(null);
                localStorage.removeItem('userId');
            }
        });
    };

    return (
        <header>
            <section>
                <Link style={{ textDecoration: 'none' }} to="/">
                    <p className="app-name">Real Estate App</p>
                </Link>
            </section>
            <nav>
                <ul>
                    <li
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
                    </li>
                    <li
                        className="buy-list"
                        onMouseEnter={() => {
                            setSellClick(true);
                        }}
                    >
                        {sellClick && (
                            <>
                                <div className="buy-element">
                                    <Link
                                        className="buy-patch"
                                        to="/create-home"
                                        onMouseLeave={() => {
                                            setSellClick(false);
                                        }}
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        className="buy-patch"
                                        to="/create-land"
                                        onMouseLeave={() => {
                                            setSellClick(false);
                                        }}
                                    >
                                        Land
                                    </Link>
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
                </ul>
            </nav>
            <section className="auth">
                {userInfo.role === 'admin' ? (
                    <p>
                        <Link style={{ textDecoration: 'none' }} to={'/admin'}>
                            Admin
                        </Link>
                    </p>
                ) : (
                    ''
                )}
                <p>
                    <Link style={{ textDecoration: 'none' }} to={user ? '/profile' : '/signup'}>
                        {user ? 'Profile' : 'Sign up'}
                    </Link>
                </p>
                <p>
                    <Link
                        onClick={onLogOutHandler}
                        style={{ textDecoration: 'none' }}
                        to={user ? '/' : '/signin'}
                    >
                        {user ? 'Sign out' : 'Sign in'}
                    </Link>
                </p>
            </section>
        </header>
    );
}
