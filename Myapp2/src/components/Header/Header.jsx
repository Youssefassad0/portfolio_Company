/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiMenuAltRight } from 'react-icons/bi'
// import {FaA} from 'react-icons/fa'
import './Header.css';
import OutsideClickHandler from 'react-outside-click-handler';
// import Contact from '../Contact/Contact';

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user-info'));
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuoption, setMenuOption] = useState(false);
  const getMenuStyles = (menu) => {
    if (document.documentElement.clientWidth <= 800) {
      return {
        right: !menu && '-100%'
      }
    }
  }
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const isTop = scrollTop < 20;
      setIsScrolled(!isTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className={`h-wrapper ${isScrolled ? 'scrolled fixed-navbar' : ''}`}>
      <div className="flexCenter paddings innerWidth h-container">
        <Link to="/">
        
        <img src="images/cristal-inox.png" width={130} alt="" />
        </Link> 
        <OutsideClickHandler
          onOutsideClick={() => setMenuOption(false)}>
          <div className={`flexCenter h-menu ${isScrolled ? 'fade-in' : ''}`}
            style={getMenuStyles(menuoption)}>

            <Link to={'/'}>Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/products">Products</Link>
            <a href="#contact">Contact</a>
            {
              localStorage.getItem('user-info') ?
              <div>

                <p >
                  {
                    user && user.data.user.name
                  } 
                </p>
                <span>
                  {/* {FaArrowDown} */}
                </span>
              </div>

                : <Link to="/login" className="button">Sign In</Link>
            }

          </div>
          <div className="menu-icon" onClick={() => setMenuOption((prev) => !prev)}>
            <BiMenuAltRight size={30} />
          </div>
        </OutsideClickHandler>

      </div>

    </section>
  );
}

export default Header;
