import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

const OrderSummary = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // ✅ Ensure `cart` always has a default structure
    const { selectedItems = 0, totalPrice = 0, tax = 0, taxRate = 0.05, grandTotal = 0 } =
        useSelector((store) => store.cart) || {};

    // ✅ Clear cart function
    const handleClearCart = () => {
        dispatch(clearCart());
    };

    // ✅ Navigate to checkout page
    const handleProceedCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div className="bg-primary-light mt-5 rounded text-base shadow-md">
            <div className="px-6 py-4 space-y-5">
                <h2 className="text-2xl font-bold text-dark">Order Summary</h2>
                <p className='text-text-dark mt-2'>Selected Items: {selectedItems}</p>
                <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
                <p>Tax ({(taxRate * 100).toFixed(0)}%): ₹{tax.toFixed(2)}</p>
                <h3 className='font-bold'>Grand Total: ₹{grandTotal.toFixed(2)}</h3>

                <div className="px-4 mb-6 flex gap-4">
                    {/* ❌ Prevent event bubbling, ✅ Improve styling */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClearCart();
                        }}
                        className='bg-red-500 px-4 py-2 text-white rounded-md flex items-center justify-center hover:bg-red-600 transition'>
                        <span className="mr-2">Clear Cart</span>
                        <i className="ri-delete-bin-5-fill"></i>
                    </button>

                    <button
                        onClick={handleProceedCheckout}
                        className='bg-green-600 px-4 py-2 text-white rounded-md flex items-center justify-center hover:bg-green-700 transition'>
                        <span>Proceed to Checkout</span>
                        <i className="ri-bank-card-fill ml-2"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
