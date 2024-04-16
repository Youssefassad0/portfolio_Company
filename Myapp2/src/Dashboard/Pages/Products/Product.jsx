import { Link } from 'react-router-dom';
import './products.scss'
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
function Product() {
    return (
        <div className="product col-md-6 col-sm-6 col-lg-3 mb-5">
            <div className="card card-product-grid shadow-sm">
                <Link to="#" className="img-wrap">
                    <img src="https://m.media-amazon.com/images/S/aplus-media-library-service-media/1ddc44de-9963-4031-b8be-1f1dbe88112e.__CR0,0,970,600_PT0_SX970_V1___.jpg" alt="Product" />
                </Link>
                <div className="info-wrap">
                    <Link to="#" className="title text-truncate">Product Title</Link>
                    <div className="price mb-2">$XX.XX</div>
                    <div className="price">22piece</div>
                    <div className="btn-row row">
                        <Link to={`/Dashboard/products/edit/3`} className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6">
                            <CiEdit />
                        </Link>
                        <Link to="#" className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6">
                            <MdDelete />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
