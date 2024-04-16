/* eslint-disable no-unused-vars */
import "./SideBar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from '@mui/icons-material/Person';
import { SiHomeassistantcommunitystore } from "react-icons/si";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { IoSettingsSharp } from "react-icons/io5";
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { IoLogOut } from "react-icons/io5";
import BadgeIcon from '@mui/icons-material/Badge';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../../Context/darkModeContext";
import { useContext } from "react";
function SideBar() {
    const { dispatch } = useContext(DarkModeContext);
    return (
        <div className="sidebar">
            <div className="sidebar-top">
                <Link to="/dashboard" style={{ textDecoration: "none" }} >
                    <span className="sidebar-logo">CristalInox</span>
                </Link>
            </div>
            <hr id="hr" />
            <div className="sidebar-center">
                <ul className="sidebar-ul">
                    <p className="title">
                        MAIN
                    </p>
                    <Link to="/dashboard" style={{ textDecoration: "none" }}>
                        <li>
                            <DashboardIcon id="icon" />
                            <span>DashBoard</span>
                        </li>
                    </Link>
                    <p className="sidebar-title">
                        Lists
                    </p>
                    <Link to="/dashboard/users" style={{ textDecoration: "none" }}>
                        <li>
                            <PersonIcon id="icon" />
                            <span> Users </span>
                        </li>
                    </Link>
                  <Link to="/dashboard/products" >
                    <li>
                        <SiHomeassistantcommunitystore id="icon" />
                        <span>Products</span>
                    </li>
                  </Link>
                    <Link to="/dashboard/employes" style={{ textDecoration: "none" }} >
                        <li>
                            <BadgeIcon id="icon" />
                            <span>Employees</span>
                        </li>
                    </Link>
                    <Link to="/dashboard/categories" >
                        <li>
                            <LocalShippingIcon id="icon" />
                            <span>Category</span>
                        </li>
                    </Link>
                    <li>
                        <IoSettingsSharp id="icon" />
                        <span>Settings</span>
                    </li>
                    <p className="title">
                        Admin
                    </p>
                    <li>
                        <PersonPinIcon id="icon" />
                        <span>Profile</span>
                    </li>
                    <li>
                        <IoLogOut id="icon" />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
            <div className="sidebar-bottom">
                <div
                    className="colorOption"
                    onClick={() => dispatch({ type: "LIGHT" })}
                ></div>
                <div
                    className="colorOption"
                    onClick={() => dispatch({ type: "DARK" })}
                ></div>
            </div>
        </div>
    );
}

export default SideBar;
