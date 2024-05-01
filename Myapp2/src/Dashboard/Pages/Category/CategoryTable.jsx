import  { useEffect, useState } from 'react';
import './addCategory.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CategoryTable = () => {
    const [data, setData] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://127.0.0.1:8001/api/listCategory')
            .then(res => setData(res.data.data))
            .catch(error => console.error('Error fetching category data:', error));
    }, []);

    const deleteCategory = (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            axios.delete(`http://127.0.0.1:8001/api/delete/${id}`)
                .then(res => {
                    setMessage(res.data.message);
                    setTimeout(() => {
                        setMessage('');
                        window.location.reload();
                    }, 1200);
                })
                .catch(error => console.error('Error deleting category:', error));
        }
    };

    return (
        <div className="category-table">
            <div className="datatableTitle">
                Add New Category
                <Link to="/dashboard/categories/new" className="link">
                    Add New
                </Link>
            </div>
            {message && (
                <div className="alert alert-success">
                    {message}
                </div>
            )}
            <table>
                <thead>
                    <tr>
                        <th>Nom de la catégorie</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(category => (
                        <tr key={category.id}>
                            <td>{category.name}</td>
                            <td>
                                <button className="edit-button">
                                    <Link to={`/dashboard/categories/${category.id}`}>Edit</Link>
                                </button>
                                <button className="delete-button" onClick={() => deleteCategory(category.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryTable;
