/* eslint-disable react/prop-types */
import { FaSearch } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import ClearIcon from '@mui/icons-material/Clear';
import { Link } from "react-router-dom";
import './NavBar.scss'
function NavBar({ userInfo }) {
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
            {userInfo && userInfo.user.image ? (
              <img src={`http://localhost:8001/${userInfo.user.image}`} alt="profil admin" className="d-avatar" />
            ) : (
              <span>{userInfo ? userInfo.user.name : 'Guest'}</span>
            )}
          </div>
          <div className="d-item">
            <Link to="/" >
              <ClearIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar
