/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import './Transaction.scss';

const TransactionUser = ({ userName }) => {
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8001/api/transactions");
                setTransactions(response.data.data);
            } catch (error) {
                console.error("Error fetching transaction data:", error);
            }
        };
        fetchData();
    }, []);

    const filteredTransactions = transactions.filter(transaction => transaction.user_name === userName);
    return (
        <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Tracking ID</TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Payment Method</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredTransactions ? (
                        filteredTransactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell className="tableCell">{transaction.id}</TableCell>
                                <TableCell className="tableCell">
                                    <div className="cellWrapper">
                                        {transaction.image && <img src={`http://127.0.0.1:8001/${transaction.image}`} alt="Product" style={{ width: "50px", height: "auto" }} />}
                                        {transaction.product_name}
                                    </div>
                                </TableCell>
                                <TableCell className="tableCell">{transaction.user_name}</TableCell>
                                <TableCell className="tableCell">{transaction.date}</TableCell>
                                <TableCell className="tableCell">{transaction.Amount}</TableCell>
                                <TableCell className="tableCell">{transaction.payment_method}</TableCell>
                                <TableCell className="tableCell">
                                    <span className={`status ${transaction.status}`}>{transaction.status}</span>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                        <TableCell colSpan={7} className="tableCell">
                            No Transaction Found
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TransactionUser;
