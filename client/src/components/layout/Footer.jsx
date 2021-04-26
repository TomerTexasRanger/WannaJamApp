import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <footer>
        <nav className="border-top  text-center">
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/terms">
                Terms & Conditions
              </Link>
            </li>
          </ul>
          <p className="mt-2">
            WannaJam App by Tomer Sapir © {new Date().getFullYear()}
          </p>
        </nav>
      </footer>
    </>
  );
};

export default Footer;
