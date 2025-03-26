import React from 'react';
import { Link } from 'react-router-dom';

const ThankYouPage = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-md shadow-lg text-center">
                <h1 className="text-3xl font-bold text-green-600">🎉 Thank You for Your Order!</h1>
                <p className="text-gray-700 mt-4">Your order has been placed successfully.</p>
                <p className="text-gray-500">You will receive a confirmation email shortly.</p>

                <div className="mt-6">
                    <Link to="/order-history" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                        Show Order History
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ThankYouPage;
