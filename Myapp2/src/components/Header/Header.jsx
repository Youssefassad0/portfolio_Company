import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 


function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

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
        <img src="images/cristal-inox.png" width={130} alt="" />
        <div className={`flexCenter h-menu ${isScrolled ? 'fade-in' : ''}`}>
          <Link to={'/'}>Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/products">Products</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login" className="button">Sign In</Link> 
        </div>
      </div>
    </section>
  );
}

export default Header;
