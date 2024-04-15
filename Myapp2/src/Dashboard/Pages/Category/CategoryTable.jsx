/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// CategoryTable.js

import { useEffect, useState } from 'react';
import './addCategory.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CategoryTable = () => {
    const [data, setData] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://127.0.0.1:8001/api/listCategory').then(res =>
            setData(res.data.data));
           
    }, [])
    const deleteCate=(id)=>{
axios.delete('http://127.0.0.1:8001/api/delete/'+id).then(
    res=>setMessage(res.data.message))
    setTimeout(()=>{
        setMessage('');
        window.location.reload();
    },1200)
    }


return (
        <div className="category-table">
             <div className="datatableTitle">
                Add New Category
            <Link
              to="/dashboard/categories/new"
              className="link"
            >
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
                                <button style={{ backgroundColor: "lightgreen"  }}>
                                   <Link to={`/dashboard/categories/${category.id}`} >Edit</Link>
                                    </button>
                                <button style={{ backgroundColor: "red"  }} onClick={()=>deleteCate(category.id)} >Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryTable;