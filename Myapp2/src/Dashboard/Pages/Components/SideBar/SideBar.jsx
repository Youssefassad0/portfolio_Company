/* eslint-disable no-unused-vars */
import "./SideBar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from '@mui/icons-material/Person';
import { SiHomeassistantcommunitystore } from "react-icons/si";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { IoSettingsSharp } from "react-icons/io5";
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { IoLogOut } from "react-icons/io5";
import { Link } from "react-router-dom";

function SideBar() {
    return (
        <div className="sidebar">
            <div className="sidebar-top">
                <span className="sidebar-logo">CristalInox</span>
            </div>
            <hr id="hr" />
            <div className="sidebar-center">
                <ul className="sidebar-ul">
                    <p className="title">
                        MAIN
                    </p>
                    <li>
                        <DashboardIcon id="icon" />
                        <span>DashBoard</span>
                    </li>
                    <p className="sidebar-title">
                        Lists
                    </p>
                    <li>
                        <PersonIcon id="icon" />
                        <span>Users</span>
                    </li>
                    <li>
                        <SiHomeassistantcommunitystore id="icon" />
                        <span>Products</span>
                    </li>
                    <li>
                        <LocalShippingIcon id="icon" />
                        <span>Delivery</span>
                    </li>
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
                <div className="colorOption"></div>
                <div className="colorOption"></div>
            </div>
        </div>
    );
}

export default SideBar;
