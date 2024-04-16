/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'; // Added React import
import axios from 'axios';
import './Edit.scss';
import SideBar from '../Components/SideBar/SideBar';
import NavBar from '../Components/NavBar/NavBar';
import { useNavigate, useParams } from 'react-router-dom';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import swal from 'sweetalert';

function Update({ type, inputs, title }) {
  const imgIcon = "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg";
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [picture, setPicture] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);

  const userInfo = JSON.parse(localStorage.getItem('user-info'));

  useEffect(() => {
    if (!userInfo || userInfo.user.role !== 'admin') {
      navigate('/');
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8001/api/${type}/${id}`);
        setFormData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        swal('error', error.data.message, 'error')
      }
    };
    fetchData();
  }, [id, type]);

  const handleChange = (e, name) => {
    const value = e.target.value;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImage = (e) => {
    setPicture({ image: e.target.files[0] });
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://127.0.0.1:8001/api/update${type}/${id}`, formData);
      console.log(response.data);
      setMessage(response.data.message);
      setErrors({});
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Error while sending data:', error);
      }
    }
  };

  return (
    <div className="new">
      <SideBar />
      <div className="newContainer">
        <NavBar userInfo={userInfo} />
        <div className="top">
          <h1>{title}</h1>
        </div>
        {
          message &&
          <div className="alert alert-success">
            {message}
          </div>
        }
        <div className="bottom">
          <div className="left">
            <img
              className="rounded-circle mt-5"
              width="150px"
              alt="Profile"
              src={
                imageUrl ||
                (formData && formData.image
                  ? `http://localhost:8001/${formData.image}`
                  : imgIcon)
              }
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon-image" />
                </label>
                <input
                  type="file"
                  name="image"
                  id="file"
                  style={{ display: "none" }}
                  onChange={handleImage}
                />
              </div>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    name={input.name}
                    value={formData[input.name] || ''}
                    onChange={(e) => handleChange(e, input.name)}
                  />
                  {errors[input.name] && <div className="text-danger">{errors[input.name]}</div>}
                </div>
              ))}

              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Update;
