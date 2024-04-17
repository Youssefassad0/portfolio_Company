/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar/NavBar";
import SideBar from "../Components/SideBar/SideBar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function NewProduct({ inputs, title }) {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState({});
    const userInfo = JSON.parse(localStorage.getItem('user-info'));

    useEffect(() => {
        if (!userInfo || userInfo.user.role !== 'admin') {
            navigate('/');
        }
    }, [navigate, userInfo]);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await axios.get('http://127.0.0.1:8001/api/listCategory');
                setCategories(response.data.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const form = new FormData();
            form.append('name', formData.name);
            form.append('description', formData.description);
            form.append('category_id', formData.category_id);
            form.append('price', formData.price);
            form.append('stock', formData.stock);
            form.append('image', file);

            const response = await axios.post('http://127.0.0.1:8001/api/addProduct', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }); setSuccessMessage(response.data.message);
            setFormData({});
            setFile(null);
            setErrors({});
            // Optionally, you can redirect or display a success message here
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Error adding product:', error);
                // Handle other types of errors
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
                </div> {successMessage && (
                    <div className="alert alert-success">
                        {successMessage}
                    </div>
                )}
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
                                    onChange={(e) => setFile(e.target.files[0])}
                                    style={{ display: "none" }}
                                />
                                 {errors['image'] && (
                                    <div className="text-danger">{errors['image'][0]}</div>
                                )}
                            </div>
                            {inputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    {input.name === 'category_id' ? (
                                        <select
                                            name="category_id"
                                            value={formData.category_id || ''}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select category</option>
                                            {categories.map(category => (
                                                <option key={category.id} value={category.id}>{category.name}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type={input.type}
                                            placeholder={input.placeholder}
                                            name={input.name}
                                            value={formData[input.name] || ''}
                                            onChange={handleChange}
                                        />
                                    )}
                                     {errors[input.name] && (
                                        <div className="text-danger">{errors[input.name][0]}</div>
                                    )}
                                </div>
                            ))}
                           
                            <button type="submit">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewProduct;
