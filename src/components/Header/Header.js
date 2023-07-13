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
                'Authorization': `Bearer ${user.token}`
            }
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
                    <p className="app-name">Real Estate App</p>
                </Link>
            </section>
            <nav>
                <ul>
                    <li
                        className="buy-list dropdown"
                        onMouseEnter={() => {
                            setClick(true);
                        }}
                        onMouseLeave={() => {
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
                                        <Link className="buy-patch" to="/all-homes" onClick={()=>setClick(false)}>
                                            Homes for sale
                                        </Link>
                                        <Link className="buy-patch" to="/all-lands" onClick={()=>setClick(false)}>
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
                                                setSellClick(false)
                                                SellHandler();
                                            }}
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
                                            onClick={()=>{
                                                setSellClick(false)
                                                SellHandler()
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
                    <Link style={{ textDecoration: 'none' }} to={user.id ? '/profile' : '/signup'}>
                        {user.id ? 'Profile' : 'Sign up'}
                    </Link>
                </p>
                <p>
                    <Link
                        onClick={onLogOutHandler}
                        style={{ textDecoration: 'none' }}
                        to={user.id ? '/' : '/signin'}
                    >
                        {user.id ? 'Sign out' : 'Sign in'}
                    </Link>
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
