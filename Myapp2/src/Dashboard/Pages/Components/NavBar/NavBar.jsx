/* eslint-disable react/prop-types */
import { FaSearch } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import ClearIcon from '@mui/icons-material/Clear';
import { Link } from "react-router-dom";
import './NavBar.scss'
import LightModeIcon from '@mui/icons-material/LightMode';
import { useContext } from "react";
import { IoMdNotifications } from "react-icons/io";
import { DarkModeContext } from "../../../Context/darkModeContext";
function NavBar({ userInfo }) {
  const { dispatch } = useContext(DarkModeContext);
  const { darkMode } = useContext(DarkModeContext);


  return (
    <div className="d-navbar">
      <div className="d-wrapper">
        <div className="d-search">
          <input type="text" placeholder='Search ... ' />
          <FaSearch />
        </div>
        <div className="d-items">
          
          <div className="d-item" onClick={() => dispatch({ type: 'TOGGLE' })} >
            {
              darkMode ? <LightModeIcon className="d-icon" /> : <MdDarkMode id="d-icon" />
            }
          </div>
          <div className="d-item" >
            <Link to="/dashboard/messages" >
            <IoMdNotifications/>
            </Link>
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
