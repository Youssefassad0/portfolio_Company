/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import './Profile.scss'
import Header from '../Header/Header';
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import axios from 'axios';

const ProfileSettings = () => {
    const urlImg = "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
    const userInfo = JSON.parse(localStorage.getItem('user-info'));
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        telephone: '',
        addresse: '',
        country: '',
        image: ''
    });
    const [file, setFile] = useState(null); // State to store the file
    const [imageUrl, setImageUrl] = useState(null); // State to store the image URL

    const fetchData = async () => {
        const response = await axios.get('http://127.0.0.1:8001/api/users/' + id)
        setUser(response.data.user);
    }

    useEffect(() => {
        if (!userInfo) {
            navigate('/');
        }
        fetchData();
    }, [id]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const imageUrl = URL.createObjectURL(file);  
        setImageUrl(imageUrl); 
        setFile(file); };
    

    const updateUserProfile = async () => {
        try {
            const formData = new FormData();
            formData.append('name', user.name);
            formData.append('email', user.email);
            formData.append('password', user.password);
            formData.append('telephone', user.telephone);
            formData.append('addresse', user.addresse);
            formData.append('country', user.country);
            if (file) {
                formData.append('image', file);
            }

            const response = await axios.put(`http://127.0.0.1:8001/api/user/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data);
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
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
                            <label className="profile-img-container" htmlFor="file" id="imgProfile" >
                                <img className="rounded-circle mt-5" width="150px" src={imageUrl || (user.image ? `http://localhost:8001/${user.image}` : urlImg)} alt="Profile" />
                                <FaCamera className="camera-icon" />
                            <input type="file" name='image' id="file" style={{ display: 'none' }} onChange={handleFileChange} />
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
                                    <input required type="text" className="form-control" name="name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                                </div>
                                <div className="col-md-6">
                                    <label className="labels">Email</label>
                                    <input required type="text" className="form-control" name="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <label className="labels">Change Password</label>
                                    <input required type="password" className="form-control" placeholder='New password' name="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                                </div>
                                <div className="col-md-6">
                                    <label className="labels">phone Number</label>
                                    <input required type="text" className="form-control" placeholder='your phone' name="telephone" value={user.telephone} onChange={(e) => setUser({ ...user, telephone: e.target.value })} />
                                </div>
                            </div> 
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <label className="labels">Adress</label>
                                    <input required type="text" className="form-control" placeholder='your address' name="addresse" value={user.addresse} onChange={(e) => setUser({ ...user, addresse: e.target.value })} />
                                </div>
                                <div className="col-md-6">
                                    <label className="labels">Country</label>
                                    <input required type="text" className="form-control" placeholder='your country ' name="country" value={user.country} onChange={(e) => setUser({ ...user, country: e.target.value })} />
                                </div>
                            </div>
                            <div className="mt-5 text-center">
                                <button className="btn btn-primary profile-button" type="button" onClick={updateUserProfile}>Save Profile</button>
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
                                <input required type="text" className="form-control" placeholder="LinkedIn Profile URL" />
                            </div>
                            <br />
                            <div className="col-md-12">
                                <label className="labels">Twitter</label>
                                <input required type="text" className="form-control" placeholder="Twitter Profile URL" />
                            </div>
                            <br />
                            <div className="col-md-12">
                                <label className="labels">Personal Website</label>
                                <input required type="text" className="form-control" placeholder="Personal Website URL" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileSettings;
