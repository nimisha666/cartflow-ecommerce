import React, { useState, useEffect } from 'react';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
        setOrders(storedOrders);
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">📦 Order History</h2>

            {orders.length > 0 ? (
                orders.map((order, index) => (
                    <div key={index} className="border p-4 mb-4 rounded-md shadow">
                        <h3 className="font-semibold">Order ID: {order.orderId}</h3>
                        <p className="text-sm text-gray-600">Date: {order.date}</p>
                        <p className="text-sm text-gray-600">Address: {order.address}</p>
                        <p className="text-sm text-gray-600">Total Price: ₹{order.grandTotal.toFixed(2)}</p>

                        <h4 className="font-semibold mt-2">Items:</h4>
                        {order.items.map((item, i) => (
                            <div key={i} className="flex items-center space-x-4 border-t pt-2 mt-2">
                                <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-md" />
                                <div>
                                    <p>{item.name} (Qty: {item.quantity})</p>
                                    <p className="text-sm text-gray-600">₹{item.price.toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500">No previous orders found.</p>
            )}
        </div>
    );
};

export default OrderHistory;
