import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { products = [], totalPrice = 0, taxRate = 0.05 } = useSelector((store) => store.cart);
    const tax = totalPrice * taxRate;
    const grandTotal = totalPrice + tax;

    const [address, setAddress] = useState("");

    const handleCheckout = () => {
        if (!address.trim()) {
            alert("Please enter your address before proceeding.");
            return;
        }

        // Create an order object
        const orderData = {
            orderId: Date.now(),
            items: products,
            totalPrice,
            tax,
            grandTotal,
            address,
            date: new Date().toLocaleString(),
        };

        // Save order in localStorage
        const existingOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
        localStorage.setItem("orderHistory", JSON.stringify([...existingOrders, orderData]));

        // Clear Cart
        dispatch(clearCart());
        navigate('/thank-you');
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-md shadow-md mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Checkout</h2>

            {products.length > 0 ? (
                <div className="border-b pb-4">
                    {products.map((item, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between shadow-md p-3 mb-4 rounded-lg">
                            <div className="flex items-center space-x-4 w-full sm:w-auto">
                                <span className="px-2 bg-red-500 text-white rounded-full text-sm">{index + 1}</span>
                                <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-md" />
                                <div>
                                    <h5 className="text-lg font-medium">{item.name}</h5>
                                    <p className="text-gray-600 text-sm">₹{Number(item.price).toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 mt-3 sm:mt-0">
                                <p className="text-sm sm:text-base">Qty: {item.quantity}</p>
                                <p className="text-sm sm:text-base font-semibold">Total: ₹{(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-red-500 text-center mt-4">🛒 Your cart is empty!</p>
            )}

            <div className="mt-4">
                <label className="block text-gray-700 font-semibold">Shipping Address:</label>
                <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2 border rounded mt-2 text-sm sm:text-base"
                    placeholder="Enter your full address..."
                />
            </div>
            {/* Payment Method */}
            <div className="mt-4">
                <label className="block text-gray-700 font-semibold">Payment Method:</label>
                <select className="w-full p-2 border rounded mt-2 text-sm sm:text-base">
                    <option value="cod">Cash on Delivery (COD)</option>
                </select>
            </div>

            <button
                onClick={handleCheckout}
                className="bg-green-600 w-full text-white py-2 rounded-md mt-4 hover:bg-green-700 transition text-sm sm:text-base">
                Proceed to Checkout
            </button>
        </div>
    );
};

export default CheckoutPage;
