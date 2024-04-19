import { useEffect, useRef, useState } from 'react';
import './SingleMessage.scss';
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import NavBar from '../NavBar/NavBar';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import axios from 'axios';

function SingleMessage() {
    const userInfo = JSON.parse(localStorage.getItem('user-info'));
    const navigate = useNavigate();
    const { id } = useParams();
    const swiperRef = useRef(null);
    const [message, setMessage] = useState(null);

    const fetchMessage = async (id) => {
        try {
            const result = await axios.get(`http://127.0.0.1:8001/api/ListMessage/${id}`);
            setMessage(result.data.data);
        } catch (error) {
            console.error('Error fetching message:', error);
        }
    };

    useEffect(() => {
        if (!userInfo || userInfo.user.role !== 'admin') {
            navigate('/');
            return;
        }

        fetchMessage(id);

        if (swiperRef.current) {
            const swiper = new Swiper(swiperRef.current, {
                spaceBetween: 30,
                effect: 'fade',
                loop: true,
                mousewheel: {
                    invert: false,
                },
                pagination: {
                    el: '.blog-slider__pagination',
                    clickable: true,
                },
            });

            return () => swiper.destroy(true, true);
        }
    }, [id]);

    return (
        <div className="list">
            <SideBar />
            <div className="listContainer">
                <NavBar userInfo={userInfo} />
                {message && (
                    <div className="blog-slider" ref={swiperRef}>
                        <div className="blog-slider__wrp swiper-wrapper">
                            <div className="blog-slider__item swiper-slide">
                                <div className="blog-slider__img">
                                    <img className="imageSwiper" src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759872/kuldar-kalvik-799168-unsplash.webp" alt="" />
                                </div>
                                <div className="blog-slider__content">
                                    <span className="blog-slider__code">{message.created_at}</span>
                                    <div className="blog-slider__title">{message.email}</div>
                                    <div className="blog-slider__text">{message.message}</div>
                                    <button className="blog-slider__button"><a style={{ textDecoration:'none' }} href={`mailto:${message.email}`}>Send email</a></button>
                                </div>
                            </div>
                        </div>
                        <div className="blog-slider__pagination"></div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SingleMessage;
