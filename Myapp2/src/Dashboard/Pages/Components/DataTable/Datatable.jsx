import "./Datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Datatable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8001/api/users");
            setUsers(response.data.users);
            setTimeout(() => setLoading(false), 1000);
        } catch (error) {
            console.error("Error fetching users:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const generateColumns = () => {
        if (users.length === 0) return [];

        const excludedColumns = ["updated_at", "image", "email_verified_at"];

        const generatedColumns = Object.keys(users[0])
            .filter((key) => !excludedColumns.includes(key)) // Filter out excluded columns
            .map((key) => ({
                field: key,
                headerName: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter
                width: 150, // Default column width
            }));

        generatedColumns.push(
            {
                field: "activity",
                headerName: "Activity",
                width: 100,
                cellClassName: "cellWithStatus active", // Apply custom class for "Activity" cells
                valueGetter: () => "Active", // For simplicity, consider all users as active
            } /* , {
            field: "actions", headerName: "Action", width: 200,
            renderCell: () => (
                // Render action buttons in the "Action" column
                <div className="cellAction">
                    <button className="viewButton">View</button>
                    <button className="deleteButton">Delete</button>
                </div>
            )
        } */
        );

        return generatedColumns;
    };

    // Apply custom class names to rows based on user role
    const getRowClassName = (params) => {
        const isAdmin = params.row.role === "admin"; // Assuming 'role' determines admin status
        return isAdmin ? "admin-row" : "";
    };

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to="/Dashboard/users/0" style={{ textDecoration: "none" }}>
                            <div className="viewButton">View</div>
                        </Link>
                        <div className="deleteButton">Delete</div>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="datatable">
            {loading ? (
                // Show loading spinner while fetching data
                <div className="loader">
                    Loading
                    <span></span>
                </div>
            ) : (
                // Render data grid once data is loaded
                <DataGrid
                    rows={users}
                    columns={generateColumns().concat(actionColumn)}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    checkboxSelection
                    getRowClassName={getRowClassName}
                />
            )}
        </div>
    );
};

export default Datatable;
