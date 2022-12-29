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
          <Link style={{textDecoration: 'none'}}  to="/Rent">
          <li>Rent</li>
          </Link>
        </ul>
      </nav>
      <section className='auth'>
        <p><Link style={{textDecoration: 'none'}} to="/signup">Sign up</Link></p>
        <p><Link style={{textDecoration: 'none'}} to="/signin">Sign in</Link></p>
      </section>
    </header>
  );
}

