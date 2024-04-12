/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import './New.scss';
import SideBar from '../Components/SideBar/SideBar';
import axios from 'axios';
import NavBar from '../Components/NavBar/NavBar';
import { useEffect, useState } from 'react';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useNavigate } from 'react-router-dom';

function New({ inputs, title , type }) {
  const userInfo = JSON.parse(localStorage.getItem('user-info'));
  const [file, setFile] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo || userInfo.user.role !== 'admin') {
      navigate('/');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', file);

    inputs.forEach(input => {
      formData.append(input.name, input.value);
    });

    try {
      let url = '';
      if (type === 'user') {
        url = 'http://127.0.0.1:8001/api/addUser';
      } else if (type === 'employe') {
        url = 'http://127.0.0.1:8001/api/addEmploye';
      } else if (type === 'produit') {
        url = 'http://127.0.0.1:8001/api/addProduit';
      }

      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Set content type for FormData
        }
      });
      
      console.log(response.data);
      // Do something with the response, e.g., redirect the user.
    } catch (error) {
      console.error('Error while sending data:', error);
    }
  };

  return (
    <div className="new">
      <SideBar />
      <div className="newContainer">
        <NavBar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}> {/* Add onSubmit event handler */}
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon-image" />
                </label>
                <input
                  type="file"
                  id="file"
                  name='image'
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    name={input.name} // Add name attribute for input fields
                    value={input.value} // Bind input value
                    onChange={(e) => input.onChange(e.target.value)} // Handle input change
                  />
                </div>
              ))}
              <button type="submit">Send</button> {/* Specify type as submit */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default New;
