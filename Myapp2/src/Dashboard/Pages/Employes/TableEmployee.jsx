import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function TableEmployee() {
    const [employes, setEmployes] = useState([]);
    const [loading, setLoading] = useState(true); // Initialize loading state as true
    const [message, setMessage] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8001/api/employes");
            setEmployes(response.data.employes);
            setTimeout(() => {
                setLoading(false); // Set loading state to false after 2 seconds
            }, 1000);
        } catch (error) {
            console.error("Error fetching employes:", error);
            setLoading(false); // Set loading state to false in case of error
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const deleteEmploye = async (empId) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete this employee?");
            if (confirmed) {
                const response = await axios.delete('http://127.0.0.1:8001/api/employes/' + empId);
                setMessage(response.data.message);
                setTimeout(() => {
                    setMessage(null);
                    window.location.reload();
                }, 1000);
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de l'Employe :", error);
            alert("An error occurred while deleting the employee.");
        }
    };

    return (
        <>
            <div className="datatableTitle">
                Add New Employe
                <Link to="/dashboard/employes/new" className="link">
                    Add New
                </Link>
            </div>
            {loading ? (
                <div className="cube-loader">
                    <div className="cube cube1"></div>
                    <div className="cube cube2"></div>
                    <div className="cube cube3"></div>
                    <div className="cube cube4"></div>
                </div>
            ) : (
                <>
                    {message && (
                        <div className="alert alert-success">
                            {message}
                        </div>
                    )}
                    <table id="example" className="table table-striped">
                        <thead>
                            <tr>
                                <th>nom</th>
                                <th>prenom</th>
                                <th>Téléphone</th>
                                <th>Salaire</th>
                                <th>Adresse</th>
                                <th>Actions</th> {/* Removed unnecessary space */}
                            </tr>
                        </thead>
                        <tbody>
                            {employes.map((employe) => (
                                <tr key={employe.id}>
                                    <td>{employe.nom}</td>
                                    <td>{employe.prenom}</td>
                                    <td>{employe.telephone}</td>
                                    <td>{employe.salaire}</td>
                                    <td>{employe.addresse}</td>
                                    <td className="action-btns">
                                        <button className="button"><span className="button_top edit">
                                        <Link to={`/Dashboard/employes/edit/${employe.id}`}>Edit</Link>
                                            </span></button>
                                        <button className="button"><span className="button_top view">
                                            <Link to={`/Dashboard/employes/${employe.id}`}>View</Link>
                                        </span></button>
                                        <button className="button" onClick={() => deleteEmploye(employe.id)}>
                                            <span className="button_top delete">Delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </>
    );
}

export default TableEmployee;
