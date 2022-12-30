import './Header.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
export default function Header() {
  const [click, setClick] = useState(false);
  const [sellClick, setSellClick] = useState(false);
  return (
    <header>
      <section>
        <Link style={{ textDecoration: 'none' }} to="/">
          <p className='app-name'>Real Estate App</p>
        </Link>
      </section>
      <nav>
        <ul>
          <li className='buy-list'
            onMouseEnter={e => { setClick(true) }}>
            {click
              && <><div className='buy-element'>
                <Link className='buy-patch' to="/all-homes" onMouseLeave={e => { setClick(false) }}>Home</Link>
                <Link className='buy-patch' to="/all-lands" onMouseLeave={e => { setClick(false) }}>Land</Link>
              </div></>}Buy
          </li>
          <li className='buy-list'
            onMouseEnter={e => { setSellClick(true) }}>
            {sellClick
              && <><div className='buy-element'>
                <Link className='buy-patch' to="/create-home" onMouseLeave={e => { setSellClick(false) }}>Home</Link>
                <Link className='buy-patch' to="/create-land" onMouseLeave={e => { setSellClick(false) }}>Land</Link>
              </div></>}Sell
          </li>
          <Link style={{ textDecoration: 'none' }} to="/Rent">
            <li>Rent</li>
          </Link>
        </ul>
      </nav>
      <section className='auth'>
        <p><Link style={{ textDecoration: 'none' }} to="/signup">Sign up</Link></p>
        <p><Link style={{ textDecoration: 'none' }} to="/signin">Sign in</Link></p>
      </section>
    </header>
  );
}

