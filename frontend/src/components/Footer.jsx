import { Link } from 'react-router-dom';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <Link to="/" className="footer-logo">Prime Drops</Link>

          <p className="footer-text">
            © {year} Prime Drops. All rights reserved.
          </p>

          <ul className="footer-links">
            <li><a href="/#products">Products</a></li>
            <li><a href="mailto:hello@primedrops.in">Contact</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
