import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../features/cart/cartSlice';

const CheckoutPage = () => {
    const dispatch = useDispatch();

    // ✅ Default values to prevent 'undefined' errors
    const { products = [], totalPrice = 0, taxRate = 0.05 } = useSelector((store) => store.cart);
    // ✅ Calculate Tax & Grand Total
    const tax = totalPrice * taxRate;
    const grandTotal = totalPrice + tax;

    // ✅ Address state
    const [address, setAddress] = useState("");

    // ✅ Handle checkout process
    const handleCheckout = () => {
        if (!address.trim()) {
            alert("Please enter your address before proceeding.");
            return;
        }
        alert("🎉 Order placed successfully!");
        dispatch(clearCart());  // Clear cart after checkout
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Checkout</h2>

            {/* 🛒 Cart Items */}
            {products.length > 0 ? (
                <div className="border-b pb-4">
                    {products.map((item, index) => (
                        <div key={index} className="flex flex-col gap-8 items-center justify-between shadow-md md:p-5 p-2 mb-4">
                            <div className="flex items-center">
                                <span className="mr-4 px-1 bg-primary text-white rounded-full">0{index + 1}</span>
                                <img src={item.image} alt="" className="size-12 object-cover mr-4" />
                                <div>
                                    <h5 className="text-lg font-medium">{item.name}</h5>
                                    <p className="text-gray-600 text-sm">₹{Number(item.price).toFixed(2)}</p>
                                </div>
                                <div className='flex flex-row md:justify-start justify-end items-center mt-2'>
                                    <p>Qty: {item.quantity}</p>
                                    <p className="ml-4">Total: ₹{(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-red-500">🛒 Your cart is empty!</p>
            )}

            {/* 📍 Address Input */}
            <div className="mt-4">
                <label className="block text-gray-700 font-semibold">Shipping Address:</label>
                <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2 border rounded mt-2"
                    placeholder="Enter your full address..."
                />
            </div>

            {/* 💳 Payment Options */}
            <div className="mt-4">
                <label className="block text-gray-700 font-semibold">Payment Method:</label>
                <select className="w-full p-2 border rounded mt-2">
                    <option value="cod">Cash on Delivery (COD)</option>
                </select>
            </div>

            {/* 🧾 Order Summary */}
            <div className="mt-4 p-4 bg-gray-100 rounded">
                <h3 className="font-bold text-lg">Order Summary</h3>
                <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
                <p>Tax (5%): ₹{tax.toFixed(2)}</p>
                <h3 className="font-bold text-lg">Grand Total: ₹{grandTotal.toFixed(2)}</h3>
            </div>

            {/* 🛍️ Checkout Button */}
            <button
                onClick={handleCheckout}
                className="bg-green-600 w-full text-white py-2 rounded-md mt-4 hover:bg-green-700 transition">
                Proceed to Checkout
            </button>
        </div>
    );
};

export default CheckoutPage;
