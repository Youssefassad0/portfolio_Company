/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiMenuAltRight } from 'react-icons/bi';
import { Dropdown, Nav, NavDropdown } from 'react-bootstrap';
import OutsideClickHandler from 'react-outside-click-handler';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user-info'));
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOption, setMenuOption] = useState(false);

  function logout() {
    localStorage.clear();
    navigate('/');
  }

  const getMenuStyles = () => {
    return document.documentElement.clientWidth <= 800 ? { right: menuOption ? '0' : '-100%' } : {};
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
          <div className={`flexCenter h-menu ${isScrolled ? 'fade-in' : ''}`} style={getMenuStyles()}>
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/products">Products</Link>
            <Link to="/contact">Contact</Link>
            {user ? (
              <Nav>
                <NavDropdown alignRight title={user.user.image ? <img src={`http://localhost:8001/${user.user.image}`} alt="Profile" className="profile-image" onClick={() => setMenuOption(true)} /> : <span>{user.user.name}</span>}>
                  <Dropdown.Item>
                    <Link to="/profile">Your Profile</Link>
                  </Dropdown.Item>
                  {user.user.role === 'admin' && <Dropdown.Item><Link to="/dashboard">Dashboard</Link></Dropdown.Item>}
                  <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Link to="/login" className="button">Sign In</Link>
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
