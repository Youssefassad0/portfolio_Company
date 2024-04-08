/* eslint-disable react/prop-types */
import "./Datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Datatable = ({ url , titleList }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
console.log(titleList);
    const fetchData = async () => {
        try {
            const response = await axios.get(url);
            setUsers(response.data.users);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const generateColumns = () => {
        if (users.length === 0) return [];

        const excludedColumns = ["updated_at", "image", "email_verified_at",'date_naissance','adresse','email','created_at'];

        const generatedColumns = Object.keys(users[0])
            .filter((key) => !excludedColumns.includes(key))
            .map((key) => ({
                field: key,
                headerName: key.charAt(0).toUpperCase() + key.slice(1),
                width: 160,
            }));

        generatedColumns.push({
            field: "activity",
            headerName: "Activity",
            width: 70,
            cellClassName: "cellWithStatus active",
            valueGetter: () => "Active",
        });

        return generatedColumns;
    };

    const getRowClassName = (params) => {
        const isAdmin = params.row.role === "admin";
        return isAdmin ? "admin-row" : "";
    };

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => (
                <div className="cellAction">
                    <Link to="/Dashboard/users/0" style={{ textDecoration: "none" }}>
                        <div className="viewButton">View</div>
                    </Link>
                    <div className="deleteButton">Delete</div>
                </div>
            ),
            key: "action", // Unique key for action column
        },
    ];

    return (
        <div className="datatable">
            {loading ? (
                <div className="loader">
                    Loading
                    <span></span>
                </div>
            ) : (
                <>
                    <div className="datatableTitle">
                    {
                        titleList
                    } 

                        <Link to="/new" className="link"> {/* Added leading slash */}
                            Add New
                        </Link>
                    </div>
                    <DataGrid
                        className="datagrid"
                        rows={users}
                        columns={generateColumns().concat(actionColumn)}
                        pageSize={9}
                        rowsPerPageOptions={[9]}
                        checkboxSelection
                        getRowClassName={getRowClassName}
                    />
                </>
            )}
        </div>
    );
};

export default Datatable;
