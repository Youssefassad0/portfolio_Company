/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import './products.scss';
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import axios from 'axios';
import { useState } from 'react';

function Product({ product }) {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const deleteProduct = async (id) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete this employee?");
            if (confirmed) {
                const response = await axios.delete('http://127.0.0.1:8001/api/delete/' + id);
                setSuccessMessage(response.data.message);
                setTimeout(() => {
                    setSuccessMessage(null);
                    window.location.reload();
                }, 1000);
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de l'Employe :", error);
            alert("An error occurred while deleting the employee."+setErrorMessage);
        }
    };
    

    return (
        <div className="product col-md-6 col-sm-6 col-lg-4 mb-4">
            {successMessage && (
                <div className="alert alert-success">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="alert alert-danger">
                    {errorMessage}
                </div>
            )}
            <div className="card card-product-grid shadow-sm">
                <Link to="#" className="img-wrap">
                    <img src={`http://127.0.0.1:8001/${product.image}`} alt="Product" />
                </Link>
                <div className="info-wrap">
                    <Link to="#" className="title text-truncate">{product.name}</Link>
                    <div className="category">Category: {product.category.name}</div>
                    <div className="price">Price: {product.price} DH</div>
                    <div className="stock">Stock: {product.stock}</div>
                    <div className="btn-row">
                        <Link to={`/Dashboard/products/edit/${product.id}`}  className="btn btn-sm btn-outline-success">
                            <CiEdit /> Edit
                        </Link>
                        <button onClick={() => deleteProduct(product.id) }  className="btn btn-sm btn-outline-danger">
                            <MdDelete /> Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
