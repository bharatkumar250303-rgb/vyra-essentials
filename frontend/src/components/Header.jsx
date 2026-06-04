import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          VYRA
        </Link>
        <nav className="nav">
          <ul className="nav-list">
            <li>
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li>
              <a href="/#products" className="nav-link">Products</a>
            </li>
            <li>
              <Link to="/cart" className="nav-link">Cart 🛒</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
