/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import './products.scss';
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

function Product({ product }) {
    return (
        <div className="product col-md-6 col-sm-6 col-lg-4 mb-4">
            <div className="card card-product-grid shadow-sm">
                <Link to="#" className="img-wrap">
                    <img src="https://m.media-amazon.com/images/S/aplus-media-library-service-media/1ddc44de-9963-4031-b8be-1f1dbe88112e.__CR0,0,970,600_PT0_SX970_V1___.jpg" alt="Product" />
                </Link>
                <div className="info-wrap">
                    <Link to="#" className="title text-truncate">{product.name}</Link>
                    <div className="category">Category: {product.category.name}</div>
                    <div className="price">Price: {product.price} DH</div>
                    <div className="stock">Stock: {product.stock}</div>
                    <div className="btn-row">
                        <Link to={`/Dashboard/products/edit/${product.id}`} className="btn btn-sm btn-outline-success">
                            <CiEdit /> Edit
                        </Link>
                        <Link to="#" className="btn btn-sm btn-outline-danger">
                            <MdDelete /> Delete
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
