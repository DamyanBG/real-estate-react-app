import './Header.scss';
import { Link } from 'react-router-dom';
export default function Header() {
  return (
    <header>
      <section>
        <Link style={{textDecoration: 'none'}}  to="/">
        <p className='app-name'>Real Estate App</p>
        </Link> 
      </section>
      <nav>
        <ul>
          <li>Buy</li>
          <li>Sell</li>
          <li>Rent</li>
        </ul>
      </nav>
      <section className='auth'>
        <p>Sign up</p>
      </section>
    </header>
  );
}

