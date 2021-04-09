import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <nav className="border-top pt-3 text-center bg-light">
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
    </>
  );
};

export default Footer;
