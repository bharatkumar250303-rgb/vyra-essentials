import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          <span className="logo-dot" />
          Vyra
        </Link>
        <nav className="nav">
          <ul className="nav-list">
            <li>
              <Link to="/" className={`nav-link${isHome ? ' active' : ''}`}>Home</Link>
            </li>
            <li>
              <a href="/#products" className="nav-link">Products</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
