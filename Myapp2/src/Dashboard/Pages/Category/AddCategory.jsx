/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import './addCategory.scss'
import SideBar from '../Components/SideBar/SideBar';
import NavBar from '../Components/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function AddCategory() {
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescreption] = useState('');
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('user-info'));
    useEffect(() => {
        if (!userInfo) {
            navigate('/');
        }
    }, [])
    async function  addCategory(e){
        e.preventDefault();
     const result=  await axios.post('http://127.0.0.1:8001/api/addCategory',{name,description})
     console.log(result);
    }
    return (
        <div className="new">
            <SideBar />
            <div className="newContainer">
                <NavBar userInfo={userInfo} />
                <div className="top">
                    <h2>Ajouter une catégorie</h2>
                </div>
                {message && (
                    <div className="alert alert-success">
                        {message}
                    </div>
                )}
                <div className="bottom">
                    <div className="right">
                        <div className="category-form">
                            <form id="formCate" onSubmit={addCategory} >
                                <div className="form-group">
                                    <label htmlFor="name">Nom de la catégorie</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name='name'
                                        value={name}
                                        onChange={e=>setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Descreption de la catégorie</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name='descreption'
                                        value={description}
                                        onChange={e=>setDescreption(e.target.value)}
                                    />
                                </div>
                                <button type="submit" id='btnCate' >Ajouter la catégorie</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCategory