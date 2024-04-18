import { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar"
import SideBar from "../SideBar/SideBar"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './Messages.css'
function Messages() {
    const userInfo = JSON.parse(localStorage.getItem('user-info'));
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [deleteSucess, setDeleteSuccess] = useState('');
    useEffect(() => {
        if (!userInfo || userInfo.user.role !== 'admin') {
            navigate('/');
        } else {
            const fetchMessages = async () => {
                const resposne = await axios.get('http://127.0.0.1:8001/api/ListMessages');
                setMessages(resposne.data.messages);
            }
            fetchMessages();

        }
    }, [navigate, userInfo]);
    const deleteMessage = async (id) => {
        const response = await axios.delete('http://127.0.0.1:8001/api/deleteMessage/' + id);
        setDeleteSuccess(response.data.message);
    }
    return (
        <div className="list">
            <SideBar />
            <div className="listContainer">
                <NavBar userInfo={userInfo} />
                <div className="messages-container">
                    {
                        deleteSucess &&
                        <div className="alert alert-success">
                            {deleteSucess}
                        </div>
                    }
                    {messages.map((message, index) => (
                        <div key={index} className="card">
                            <div className="header">
                                <span className="icon">
                                    <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path clipRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" fillRule="evenodd"></path>
                                    </svg>
                                </span>
                                <p className="alert"> {message.email} </p>
                            </div>

                            <p className="message">
                                {message.message}
                            </p>

                            <div className="actions">
                                <button className="read" href="">
                                    <Link to={`/dashboard/messages/${message.id} `}>
                                        Take a Look
                                    </Link>
                                </button>

                                <button className="mark-as-read" onClick={() => deleteMessage(message.id)}>
                                    Delete it
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Messages