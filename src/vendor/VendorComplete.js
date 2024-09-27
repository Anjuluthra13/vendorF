import React, { useState, useEffect } from 'react';
import './Venderprofile.css'; 

const CompletedOrders = () => {
    const [completedOrders, setCompletedOrders] = useState([]);

    useEffect(() => {
        // Fetch completed orders from local storage
        const storedCompletedOrders = JSON.parse(localStorage.getItem('completedOrders')) || [];
        setCompletedOrders(storedCompletedOrders);
    }, []);

    return (
        <div className="completed-orders-container">
            <h2 className="completed-orders-header">Completed Orders</h2>
            {completedOrders.length > 0 ? (
                <table className="completed-orders-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Start Time</th>
                            <th>Service</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {completedOrders.map((order, index) => (
                            <tr key={index}>
                                <td>{order.name}</td>
                                <td>{order.amount}</td>
                                <td>{order.address}</td>
                                <td>{order.phone}</td>
                                <td>{order.stime} AM</td>
                                <td>{order.service}</td>
                                <td>{formatDate(order.date)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="no-orders-message">No completed orders found.</p>
            )}
        </div>
    );
};

// Function to format date
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

export default CompletedOrders;
