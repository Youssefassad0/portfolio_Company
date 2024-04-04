import { FaSearch } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import './NavBar.scss'
  function NavBar() {
  const user= JSON.parse(localStorage.getItem('user-info'));

  console.log(user.user.image);
  return (

    <div className="d-navbar">
      <div className="d-wrapper">
        <div className="d-search">
          <input type="text" placeholder='Search ... ' />
          <FaSearch />
        </div>
        <div className="d-items">
          <div className="d-item">
            <MdDarkMode id="d-icon" />
          </div>
          <div className="d-item">
            {
              user && user.user.image ?
              <img src={`http://localhost:8001/${user.user.image}`} alt="profil admin"  className="d-avatar" /> : 
              <span >
                {
                  user.user.name
                }
              </span>
            }
          </div>
        </div>
      </div>
    </div>)
}

export default NavBar