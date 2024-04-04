import './Datatable.scss'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Datatable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8001/api/users');
            setUsers(response.data.users);
            setTimeout(() => setLoading(false), 1000); // Set loading to false after 4 seconds
        } catch (error) {
            console.error("Error fetching users:", error);
            setLoading(false); // Set loading to false in case of error too
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Function to generate columns dynamically based on the keys of the first item in users array
    const generateColumns = () => {
        if (users.length === 0) return [];
        
        const firstUser = users[0];
        const excludedColumns = ['updated_at', 'image','Email_verified_at']; // Define columns to exclude
        const generatedColumns = Object.keys(firstUser)
            .filter(key => !excludedColumns.includes(key)) // Filter out excluded columns
            .map((key) => ({
                field: key,
                headerName: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter
                width: 150, // You can set a default width here
            }));
    
        return generatedColumns;
    };

    // Function to conditionally apply class names to rows based on whether the user is an admin
    const getRowClassName = (params) => {
        const isAdmin = params.row.role === 'admin'; // Assuming 'role' is the field that determines if a user is an admin
        return isAdmin ? 'admin-row' : '';
    };

    return (
        <div className='datatable'>
            {loading ? (
               <div className="loader">Loading
               <span></span>
             </div>
            ) : (
                <DataGrid
                    rows={users}
                    columns={generateColumns()} 
                    pageSize={5} 
                    checkboxSelection
                    getRowClassName={getRowClassName} 
                />
            )}
        </div>
    );
};

export default Datatable;
