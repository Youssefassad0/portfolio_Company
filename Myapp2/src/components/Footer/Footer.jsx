import { Link } from "react-router-dom";
import "./Footer.css";
import {
  FaEnvelope,
  FaArrowRight,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
const Footer = () => {
  return (
    <>
      <section>
        <footer>
          <div className="row">
            <div className="col">
              <img
                src="/images/cristal-inox.png"
                alt="logo-cristal"
                className="logo"
              />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Expedita quis corrupti nostrum repellendus voluptatum,
              </p>
            </div>
            <div className="col">
              <h3>Office
                <div className="underline">
                  <span></span>
                </div>
              </h3>
              <p>Cristal Inox</p>
              <p>Morocco , CasaBlanca</p>
              <p>HH42+M3X, Titt Mellilen</p>
              <p className="email">CristalInox@gmail.com</p>
              <h3>+212 661946011</h3>
            </div>
            <div className="col">
              <h3>Links
              <div className="underline">
                  <span></span>
                </div>
              </h3>
              <ul>
                <li>
                  <Link>Home</Link>
                </li>{" "}
                <li>
                  <Link>Services</Link>
                </li>{" "}
                <li>
                  <Link>Products</Link>
                </li>{" "}
                <li>
                  <Link>Contacts</Link>
                </li>
              </ul>
            </div>
            <div className="col">
              <h3>NewSletter
              <div className="underline">
                  <span></span>
                </div>
              </h3>
              <form action="">
                <FaEnvelope className="far" />
                <input type="email" placeholder="Enter You email address" />
                <button type="submit">
                  <FaArrowRight className="fas" />
                </button>
              </form>
              <div className="social-icons">
                <FaFacebook className="fab" />
                <FaLinkedin className="fab" />
                <FaInstagram className="fab" />
                <FaWhatsapp className="fab" />
              </div>
            </div>
          </div>
          <hr />
          <p className="copyright">CristalInox &#169; 2024 - All Rights Reserved</p>
        </footer>
      </section>
    </>
  );
};

export default Footer;
