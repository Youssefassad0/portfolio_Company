import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function TableEmployee() {
    const [employes, setEmployes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8001/api/employes");
            setEmployes(response.data.employes);
        } catch (error) {
            console.error("Error fetching employes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    const deleteEmploye = async (empId) => {
        try {
            await axios.delete('http://127.0.0.1:8001/api/employes/' + empId);
        }
        catch (error) {
            console.error("Erreur lors de la suppression de l'Employe :", error);

        }
    }

    return (
        <table id="example" className="table table-striped">
            <thead>
                <tr>
                    <th>nom</th>
                    <th>prenom</th>
                    <th>Téléphone</th>
                    <th>Salaire</th>
                    <th>Adresse</th>
                    <th colSpan={3} >Actions</th>
                </tr>
            </thead>
            <tbody>
                {employes.map((employe) => (
                    <tr key={employe.id}>
                        <td>{employe.nom}</td>
                        <td>{employe.prenom}</td>
                        <td>{employe.telephone}</td>
                        <td>{employe.salaire}</td>
                        <td>{employe.adresse}</td>
                        <td className="action-btns">
                            <button className="button"><span className="button_top edit">Edit</span></button>
                            <button className="button"><span className="button_top view">
                                <Link to={`/Dashboard/employes/${employe.id}`} >View
                                </Link> </span></button>
                            <button className="button" onClick={() => deleteEmploye(employe.id)} ><span className="button_top delete">Delete</span></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>


    )
}

export default TableEmployee;
