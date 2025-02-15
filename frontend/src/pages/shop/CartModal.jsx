import React from 'react';
import OrderSummary from './OrderSummary';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../features/cart/cartSlice';

const CartModal = ({ products, isOpen, onClose }) => {
    const dispatch = useDispatch();

    const handleQuantity = (type, _id) => {
        dispatch(updateQuantity({ type, _id }));
    };

    const handleRemove = (e, id) => {
        e.preventDefault();
        dispatch(removeFromCart({ id }));
    };

    return (
        <div className={`fixed z-[1000] inset-0 bg-black bg-opacity-80 transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} style={{ transition: 'opacity 300ms' }}>
            {/* Modal Sidebar */}
            <div className={`fixed right-0 top-0 w-full md:w-1/2 lg:w-1/3 bg-white h-full overflow-hidden transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{ transition: 'transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>

                {/* Header */}
                <div className="p-4 flex justify-between items-center bg-gray-100 shadow-md">
                    <h4 className="text-xl font-semibold">Your Cart</h4>
                    <button onClick={() => onClose()} className="text-gray-600 hover:text-gray-900">
                        <i className="ri-close-fill text-2xl"></i>
                    </button>
                </div>

                {/* Cart Items - Scrollable */}
                <div className="overflow-y-auto h-[70vh] p-4">
                    {products.length === 0 ? (
                        <div className="text-center text-gray-600 mt-6">Your Cart is Empty 🛒</div>
                    ) : (
                        products.map((item, index) => (
                            <div key={index} className="flex flex-col sm:flex-row items-center justify-between shadow-md p-3 mb-3 rounded-lg">
                                {/* Product Image & Info */}
                                <div className="flex items-center space-x-4 w-full sm:w-auto">
                                    <span className="px-2 bg-red-500 text-white rounded-full text-sm">{index + 1}</span>
                                    <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-md" />
                                    <div>
                                        <h5 className="text-lg font-medium">{item.name}</h5>
                                        <p className="text-gray-600 text-sm">${Number(item.price).toFixed(2)}</p>
                                    </div>
                                </div>

                                {/* Quantity & Remove Button */}
                                <div className="flex items-center space-x-3 mt-3 sm:mt-0">
                                    <button onClick={() => handleQuantity('decrement', item._id)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-red-500 hover:text-white">-</button>
                                    <span className="text-center w-6">{item.quantity}</span>
                                    <button onClick={() => handleQuantity('increment', item._id)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-red-500 hover:text-white">+</button>
                                    <button onClick={(e) => handleRemove(e, item._id)} className="text-red-500 hover:text-red-800">Remove</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Order Summary (Fixed at Bottom) */}
                {products.length > 0 && (
                    <div className="p-4 border-t bg-white shadow-md fixed bottom-10 w-full md:w-1/2 lg:w-auto">
                        <OrderSummary onClose={onClose} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartModal;
