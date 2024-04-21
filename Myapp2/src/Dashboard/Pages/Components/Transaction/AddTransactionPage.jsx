import { useState, useEffect } from "react";
import axios from "axios";
import "./AddTransactionPage.scss";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";

const AddTransactionPage = () => {
    const userInfo = JSON.parse(localStorage.getItem("user-info"));
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [methodePayments, setMethodePayments] = useState([]);
    const [formData, setFormData] = useState({
        productId: "",
        userId: "",
        date: "",
        amount: "",
        paymentMethod: "",
        status: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseProducts = await axios.get(
                    "http://127.0.0.1:8001/api/products"
                );
                setProducts(responseProducts.data.data);

                const responseUsers = await axios.get("http://127.0.0.1:8001/api/users");
                const responsePayments = await axios.get('http://127.0.0.1:8001/api/getMethodePayment')

                setUsers(responseUsers.data.users);
                setMethodePayments(responsePayments.data.data)
            } catch (error) {
                console.error("Error fetching data:", error);
                alert("Failed to fetch data. Please try again.");
            }
        };

        if (!userInfo || userInfo.user.role !== "admin") {
            navigate("/");
        } else {
            fetchData();
        }
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8001/api/transactions", formData);
            alert("Transaction added successfully!");
            setFormData({
                productId: "",
                userId: "",
                date: "",
                amount: "",
                paymentMethod: "",
                status: ""
            });
        } catch (error) {
            console.error("Error adding transaction:", error);

        }
    };

    return (
        <>
            <div className="new">
                <SideBar />
                <div className="newContainer">
                    <NavBar userInfo={userInfo} />
                    <div className="add-transaction-container">
                        <h2>Add New Transaction</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="productId">Product:</label>
                                <select
                                    id="productId"
                                    name="productId"
                                    value={formData.productId}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Product</option>
                                    {products.map((product) => (
                                        <option key={product.id} value={product.id}>
                                            {product.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="userId">User:</label>
                                <select
                                    id="userId"
                                    name="userId"
                                    value={formData.userId}
                                    onChange={handleChange}
                                >
                                    <option value="">Select User</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="date">Date:</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="amount">Amount:</label>
                                <input
                                    type="number"
                                    id="amount"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="paymentMethod">Payment Method:</label>
                                <select
                                    id="paymentMethod" 
                                    name="paymentMethod" 
                                    value={formData.paymentMethod}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Method of Payment</option>
                                    {methodePayments.map((m) => (
                                        <option key={m.id} value={m.id}>
                                            {m.name}
                                        </option>
                                    ))}
                                </select>

                            </div>
                            <div className="form-group">
                                <label htmlFor="status">Status:</label>
                                <input
                                    type="text"
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                />
                            </div>
                            <button type="submit">Add Transaction</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddTransactionPage;
