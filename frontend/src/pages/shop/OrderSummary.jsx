import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

const OrderSummary = ({ onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { selectedItems = 0, totalPrice = 0, tax = 0, taxRate = 0.05, grandTotal = 0 } =
        useSelector((store) => store.cart) || {};

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleProceedCheckout = () => {
        onClose();
        navigate('/checkout');
    };

    return (
        <div className="bg-primary-light mt-5 rounded text-base shadow-md p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-dark text-center">Order Summary</h2>

            <div className="mt-4 space-y-2 text-center sm:text-left">
                <p className='text-text-dark'>Selected Items: <span className="font-semibold">{selectedItems}</span></p>
                <p>Total Price: <span className="font-semibold">₹{totalPrice.toFixed(2)}</span></p>
                <p>Tax ({(taxRate * 100).toFixed(0)}%): <span className="font-semibold">₹{tax.toFixed(2)}</span></p>
                <h3 className='font-bold text-lg'>Grand Total: ₹{grandTotal.toFixed(2)}</h3>
            </div>

            {/* Buttons: Stack on small screens, side-by-side on larger screens */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleClearCart();
                    }}
                    className='bg-red-500 w-full sm:w-auto px-4 py-2 text-white rounded-md flex items-center justify-center hover:bg-red-600 transition'>
                    <span className="mr-2">Clear Cart</span>
                    <i className="ri-delete-bin-5-fill"></i>
                </button>

                <button
                    onClick={handleProceedCheckout}
                    className='bg-green-600 w-full sm:w-auto px-4 py-2 text-white rounded-md flex items-center justify-center hover:bg-green-700 transition'>
                    <span>Proceed to Checkout</span>
                    <i className="ri-bank-card-fill ml-2"></i>
                </button>
            </div>
        </div>
    );
};

export default OrderSummary;
