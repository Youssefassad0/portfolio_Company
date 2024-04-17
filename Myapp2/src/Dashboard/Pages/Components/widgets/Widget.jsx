/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import './Widget.scss'
import EngineeringIcon from '@mui/icons-material/Engineering';
import PersonIcon from '@mui/icons-material/Person';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Link } from 'react-router-dom';
function Widget({ type, length }) {
    let data;
    // const mount = 100;
    switch (type) {
        case "user":
            data = {
                title: 'USERS',
                isMoney: false,
                mount: length,
                url:'/dashboard/users',
                link: "See all Users",
                icon: (
                    <PersonIcon className='w-icon'
                        style={{
                            color: "crimson",
                            backgroundColor: "rgba(255, 0, 0, 0.2)",
                        }}
                    />
                )
            }
            break;
        case "products":
            data = {
                title: 'Products',
                isMoney: true,
                mount:length,
                url:'/dashboard/products',
                link: "View all products",
                icon: (
                    <Inventory2Icon className='w-icon'
                        style={{
                            color: "",
                            backgroundColor: "rgba(255, 0, 0, 0.2)",
                        }} />
                )
            }
            break;
        case "employes":
            data = {
                title: 'Employes',
                isMoney: false,
                mount: length,
                url:'/dashboard/employes',

                link: "See all Employes ",
                icon: (
                    <EngineeringIcon className='w-icon'
                        style={{
                            color: "black",
                            backgroundColor: "rgba(400, 100, 0, 0.2)",
                        }} />
                )
            }
            break;
        default:
            break;
    }


    return (
        <div className='widget' >
            <div className="left">
                <span className="w-title">
                    {
                        data.title
                    }
                </span>
                <span className="w-counter">
                    {data.mount}
                </span><span className="w-link">
                    <Link to={data.url}>
                    {data.link}
                </Link>                    
                </span>
            </div>
            <div className="right">
                <div className="percentage positive ">
                    <ArrowOutwardIcon />  20 %
                </div>
                {
                    data.icon
                }
            </div>
        </div>
    )
}

export default Widget