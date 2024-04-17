/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import "./Profile.scss";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import axios from "axios";
import swal from "sweetalert";


const ProfileSettings = () => {
    const urlImg =
    "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg";
    const userInfo = JSON.parse(localStorage.getItem("user-info"));
    const navigate = useNavigate();
    const id = userInfo.user.id;
    const [imageUrl, setImageUrl] = useState(null);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState([]);
    const [picture, setPicture] = useState([]);
    const [user, setUser] = useState({
        name: "",
        email: "",
        telephone: "",
        addresse: "",
        country: "",
        urlLinkedin: "",
        urlTwitter: "",
        urlWebsite: "",
    });
    useEffect(() => {
        if (!userInfo) {
            navigate("/");
        } else {
            fetchData();
        }
    }, [id]);
    const fetchData = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8001/api/users/" + id);
            setUser(response.data.data);
        } catch (err) {
            console.error("Error fetching user data:", err);
            navigate('/');
        }
    };

    const handleInput = (e) => {
        e.persist();
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleImage = (e) => {
        setPicture({ image: e.target.files[0] }); 
        setImageUrl(URL.createObjectURL(e.target.files[0]));
    };

    const updateUser = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', picture.image);
        formData.append("name", user.name);
        formData.append("email", user.email);

        formData.append("telephone", user.telephone);
        formData.append("addresse", user.addresse);
        formData.append("country", user.country);
        formData.append("urlLinkedin", user.urlLinkedin);
        formData.append("urlTwitter", user.urlTwitter);
        formData.append("urlWebsite", user.urlWebsite);
        axios.post(`http://127.0.0.1:8001/api/update-User/${id}`, formData).then(res => {
            console.log(res.data);
            setMessage(res.data.message)
            swal(message, message, 'success');
            setErrors([]);
        }).catch(err => {
            if (err.response && err.response.data && err.response.data.errors) {
                setErrors(err.response.data.errors);
            }
            else if (err.data.status === 404) {
                swal('User Not Found ! ', "", 'error');
                navigate('/');
            }
            else {
                console.error('Error while sending data:', err);
            }
        });
    };

    return (
        <>
            <div className="App">
                <Header />
            </div>
            <div className="container rounded bg-white mt-5 mb-5">
                <div className="row">
                    <div className="col-md-3 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <label
                                className="profile-img-container"
                                htmlFor="file"
                                id="imgProfile"
                            >
                                <img
                                    className="rounded-circle mt-5"
                                    width="150px"
                                    alt="Profile"
                                    src={
                                        imageUrl ||
                                        (user && user.image
                                            ? `http://localhost:8001/${user.image}`
                                            : urlImg)
                                    }
                                />

                                <FaCamera className="camera-icon" />
                                <input
                                    type="file"
                                    name="image"
                                    id="file"
                                    style={{ display: "none" }}
                                    onChange={handleImage}
                                />
                                {
                                    errors.image && (
                                        <small className="text-danger" >{errors.image}</small>
                                    )
                                }
                            </label>
                            <span className="font-weight-bold">{user.name}</span>
                            <span className="text-black-50">{user.email}</span>

                        </div>
                    </div>
                    <div className="col-md-5 border-right">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-right">Profile Settings</h4>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <label className="labels">Name</label>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        onChange={handleInput}
                                        value={user.name} />
                                    {
                                        errors.name && (
                                            <small className="text-danger" >{errors.name}</small>
                                        )
                                    }
                                </div>
                                <div className="col-md-6">
                                    <label className="labels">Email</label>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        onChange={handleInput}
                                        value={user.email}
                                    />
                                    {
                                        errors.email && (
                                            <small className="text-danger" >{errors.email}</small>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <label className="labels">phone Number</label>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        placeholder="your phone"
                                        name="telephone"
                                        onChange={handleInput}
                                        value={user.telephone}
                                    />
                                    {
                                        errors.telephone && (
                                            <small className="text-danger" >{errors.telephone}</small>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <label className="labels">Adress</label>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        placeholder="your address"
                                        name="addresse"
                                        onChange={handleInput}
                                        value={user.addresse}
                                    />

                                </div>
                                <div className="col-md-6">
                                    <label className="labels">Country</label>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        placeholder="your country "
                                        name="country"
                                        onChange={handleInput}
                                        value={user.country}
                                    />
                                </div>
                            </div>
                            <div className="mt-5 text-center">
                                <button
                                    className="btn btn-primary profile-button"
                                    type="button"
                                    onClick={updateUser}
                                >
                                    Save Profile
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center">
                                <span>Social Media Links</span>
                            </div>
                            <br />
                            <div className="col-md-12">
                                <label className="labels">LinkedIn</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    placeholder="LinkedIn Profile URL"
                                    onChange={handleInput}
                                    value={user.urlLinkedin}
                                />
                            </div>
                            <br />
                            <div className="col-md-12">
                                <label className="labels">Twitter</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    placeholder="Twitter Profile URL"
                                    onChange={handleInput}
                                    value={user.urlTwitter}
                                />
                            </div>
                            <br />
                            <div className="col-md-12">
                                <label className="labels">Personal Website</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    placeholder="Personal Website URL"
                                    onChange={handleInput}
                                    value={user.urlWebsite}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileSettings;
