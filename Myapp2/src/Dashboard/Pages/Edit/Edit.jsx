/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'; // Added React import
import axios from 'axios';
import './Edit.scss';
import SideBar from '../Components/SideBar/SideBar';
import NavBar from '../Components/NavBar/NavBar';
import { useNavigate, useParams } from 'react-router-dom';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

function Update({ type, inputs, title }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [file, setFile] = useState(null); // Added state for file

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
              src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
              alt=""
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
                  id="file"
                  name='image'
                  onChange={(e) => setFile(e.target.files[0])} // Added onChange handler for file input
                  style={{ display: "none" }}
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
