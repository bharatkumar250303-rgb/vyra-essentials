import { Link } from 'react-router-dom';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <Link to="/" className="footer-logo">Vyra</Link>

          <p className="footer-text">
            © {year} Vyra Essentials. All rights reserved.
          </p>

          <ul className="footer-links">
            <li><a href="/#products">Products</a></li>
            <li><a href="mailto:hello@vyra.in">Contact</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
