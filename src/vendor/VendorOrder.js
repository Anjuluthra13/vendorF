import React, { useState, useEffect } from 'react';

const Delivery = () => {
    const [getUserData, setUserData] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);

    useEffect(() => {
        // Fetch completed orders from local storage
        const storedCompletedOrders = JSON.parse(localStorage.getItem('completedOrders')) || [];
        setCompletedOrders(storedCompletedOrders);

        getData(storedCompletedOrders); // Pass the completed orders to the data fetching function
    }, []);

    const getData = async (completedOrders) => {
        try {
            const res = await fetch('https://vendorb-production.up.railway.app/get-delivary', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 422 || !data) {
                console.log('Error fetching data');
            } else {
                // Filter out completed orders using IDs or unique properties
                const pendingOrders = data.filter(order =>
                    !completedOrders.some(completedOrder => completedOrder.id === order.id)
                );
                setUserData(pendingOrders);
                console.log('Data fetched successfully');
            }
        } catch (err) {
            console.error('Error fetching delivery data:', err);
        }
    };

    const handleCompleteOrder = (order) => {
        // Add order to completed orders list
        const updatedCompletedOrders = [...completedOrders, order];
        setCompletedOrders(updatedCompletedOrders);
        localStorage.setItem('completedOrders', JSON.stringify(updatedCompletedOrders));

        // Remove order from pending orders list using a specific unique identifier (id)
        const updatedPendingOrders = getUserData.filter(o => o.id !== order.id);
        setUserData(updatedPendingOrders);
    };

    return (
        <div className="delivery-container">
            <h2 className="delivery-header">Pending Deliveries</h2>
            <table className="delivery-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Start Time</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {getUserData.map((element, index) => (
                        <tr key={element.id}> {/* Ensure each row has a unique key */}
                            <td>{element.name}</td>
                            <td>{element.amount}</td>
                            <td>{element.address}</td>
                            <td>{element.phone}</td>
                            <td>{element.stime} AM</td>
                            <td>{element.service}</td>
                            <td>{formatDate(element.date)}</td>
                            <td>
                                <button 
                                    className="btn-complete" 
                                    onClick={() => handleCompleteOrder(element)}
                                >
                                    Complete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Function to format date
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

export default Delivery;
