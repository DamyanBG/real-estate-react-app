import './Header.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
export default function Header() {
  const [click, setClick] = useState(false);

  return (
    <header>
      <section>
        <Link style={{textDecoration: 'none'}}  to="/">
        <p className='app-name'>Real Estate App</p>
        </Link> 
      </section>
      <nav>
        <ul>
          <li className='buy-list' 
              onMouseEnter={e => {setClick(true)}}>
                { click 
                && <><div className='buy-element'>
                    <Link className='buy-patch' to="/all-homes" onMouseLeave={e => {setClick(false)}}>Home</Link>
                    <Link className='buy-patch' to="/all-lands" onMouseLeave={e => {setClick(false)}}>Land</Link>                
                  </div></>}Buy
              </li>
          <li>Sell</li>
          <Link style={{textDecoration: 'none'}}  to="/Rent">
          <li>Rent</li>
          </Link>
        </ul>
      </nav>
      <section className='auth'>
        <p>Sign up</p>
      </section>
    </header>
  );
}

