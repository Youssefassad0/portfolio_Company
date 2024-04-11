/* eslint-disable react/prop-types */
import  { useState } from 'react';
import axios from 'axios';
import './editEmploye.css'

const EditForm = ({ employe, closeModal }) => {
    const [formData, setFormData] = useState({
        nom: employe.nom,
        prenom: employe.prenom,
        telephone: employe.telephone,
        salaire: employe.salaire,
        adresse: employe.adresse
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8001/api/employes/${employe.id}`, formData);
            closeModal();
            alert("Employee updated successfully!");
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'employé :", error);
            alert("An error occurred while updating the employee.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="edit-form">
            <label>
                Nom:
                <input type="text" name="nom" value={formData.nom} onChange={handleChange} required />
            </label>
            <label>
                Prénom:
                <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} required />
            </label>
            <label>
                Téléphone:
                <input type="text" name="telephone" value={formData.telephone} onChange={handleChange} required />
            </label>
            <label>
                Salaire:
                <input type="text" name="salaire" value={formData.salaire} onChange={handleChange} required />
            </label>
            <label>
                Adresse:
                <input type="text" name="adresse" value={formData.adresse} onChange={handleChange} required />
            </label>
            <div className="form-actions">
                <button type="submit" className="btn btn-primary">Update</button>
                <button type="button" onClick={closeModal} className="btn btn-secondary">Cancel</button>
            </div>
        </form>
    );
};

export default EditForm;
