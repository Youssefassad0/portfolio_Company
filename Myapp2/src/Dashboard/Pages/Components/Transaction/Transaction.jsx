import { useState, useEffect } from "react";
import axios from "axios";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";

const Transaction = () => {
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

  return (
    <TableContainer component={Paper}>
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
            <TableCell>Image</TableCell> {/* Ajout de la colonne pour l'image */}
          </TableRow>
        </TableHead>
        <TableBody>
        {transactions.map((transaction) => (
  <TableRow key={transaction.id}>
    <TableCell>{transaction.id}</TableCell>
    <TableCell>{transaction.product_name}</TableCell>
    <TableCell>{transaction.user_name}</TableCell>
    <TableCell>{transaction.date}</TableCell>
    <TableCell>{transaction.Amount}</TableCell>
    <TableCell>{transaction.payment_method}</TableCell>
    <TableCell>{transaction.status}</TableCell>
    <TableCell>
      {transaction.image && <img src={`http://127.0.0.1:8001/${transaction.image}`} alt="Product" style={{ width: "50px", height: "auto" }} />}
    </TableCell>
  </TableRow>
))}

        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Transaction;
