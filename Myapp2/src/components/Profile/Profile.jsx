import './Profile.scss'
import Header from '../Header/Header';

import { useParams } from 'react-router-dom'
const ProfileSettings = () => {
    const { id } = useParams();

    return (
        <>
            <div className="App">
                <Header />
            </div>
            <div className="container rounded bg-white mt-5 mb-5">
                <div className="row">
                    <div className="col-md-3 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="Profile" />
                            <span className="font-weight-bold">Edogaru</span>
                            <span className="text-black-50">edogaru@mail.com.my</span>
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
                                    <input type="text" className="form-control" placeholder="First Name" />
                                </div>
                                <div className="col-md-6">
                                    <label className="labels">Email</label>
                                    <input type="text" className="form-control" placeholder="Surname" />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <label className="labels">Change Password</label>
                                    <input type="password" className="form-control" placeholder="First Name" />
                                </div>
                                <div className="col-md-6">
                                    <label className="labels">phone Number</label>
                                    <input type="text" className="form-control" placeholder="Surname" />
                                </div>
                            </div> <div className="row mt-2">
                                <div className="col-md-6">
                                    <label className="labels">Adress</label>
                                    <input type="text" className="form-control" placeholder="First Name" />
                                </div>
                                <div className="col-md-6">
                                    <label className="labels">Country</label>
                                    <input type="text" className="form-control" placeholder="Surname" />
                                </div>
                            </div>
                            <div className="mt-5 text-center">
                                <button className="btn btn-primary profile-button" type="button">Save Profile</button>
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
                                <input type="text" className="form-control" placeholder="LinkedIn Profile URL" />
                            </div>
                            <br />
                            <div className="col-md-12">
                                <label className="labels">Twitter</label>
                                <input type="text" className="form-control" placeholder="Twitter Profile URL" />
                            </div>
                            <br />
                            <div className="col-md-12">
                                <label className="labels">Personal Website</label>
                                <input type="text" className="form-control" placeholder="Personal Website URL" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileSettings;
