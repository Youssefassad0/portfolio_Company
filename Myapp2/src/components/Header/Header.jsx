/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// import 'bootstrap/dist/css/bootstrap.min.css';

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiMenuAltRight } from 'react-icons/bi';
import { Dropdown, Nav, NavDropdown } from "react-bootstrap";

// import {FaA} from 'react-icons/fa'
import './Header.css';
import '../../index.css';

import OutsideClickHandler from 'react-outside-click-handler';
// import Contact from '../Contact/Contact';

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user-info'));
  // console.log(user.user.image);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOption, setMenuOption] = useState(false);

  function Logout() {
    localStorage.clear();
    navigate('/');
  }

  const getMenuStyles = (menu) => {
    if (document.documentElement.clientWidth <= 800) {
      return {
        right: menu ? '0' : '-100%'
      };
    } else {
      return {};
    }
  };

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
        <OutsideClickHandler onOutsideClick={() => setMenuOption(false)}>
          <div className={`flexCenter h-menu ${isScrolled ? 'fade-in' : ''}`} style={getMenuStyles(menuOption)}>
            <Link to={'/'}>Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/products">Products</Link>
            <Link to="/contact">Contact</Link>
            {localStorage.getItem('user-info') ? (
              <Nav>
                <NavDropdown alignRight title={
                  user.user.image ? (
                    <img src={`http://localhost:8001/${user.user.image}`} alt='Profile' className='profile-image' onClick={() => setMenuOption(true)} />
                  ) : (
                    <span>{user.user.name}</span>
                  )
                }>
                  <Dropdown.Item> <Link to={`/profile/${user.user.id}`}>
                  Your Profile  </Link> </Dropdown.Item>
                  {user.user.role === 'admin' && (
                    <Dropdown.Item><Link to="/dashboard" style={{ textDecoration:'none' }}  >Dashboard</Link></Dropdown.Item>
                  )}
                  <Dropdown.Item onClick={Logout}>Logout</Dropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Link to='/login' className='button'>Sign In</Link>
            )}
          </div>
          <div className="menu-icon" onClick={() => setMenuOption(prev => !prev)}>
            <BiMenuAltRight size={30} />
          </div>
        </OutsideClickHandler>
      </div>
    </section>
  );
}

export default Header;
