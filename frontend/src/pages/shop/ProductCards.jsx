import React from 'react';
import { Link } from 'react-router-dom';
import RatingStars from '../../components/RatingStars';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';

const ProductCards = ({ products = [] }) => {
    const dispatch = useDispatch();

    // ✅ Add to Cart Function
    const handleAddToCart = (product) => {
        if (!product._id) {
            product._id = product.id || `temp-${Math.random() * 1000}`; // Assign a fallback ID
        }
        dispatch(addToCart(product));
        console.log(product)
    };

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
            {products.length > 0 ? (
                products.map((product, index) => (
                    <div key={product._id || index} className="product__card shadow-md rounded-lg">
                        <div className='relative'>
                            <Link to={`/shop/${product._id}`}>
                                <img
                                    src={product?.image || "/placeholder.jpg"}
                                    alt={product?.name || "Product"}
                                    className='max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-all duration-200'
                                />
                            </Link>
                            <div className='hover:block absolute top-3 right-3'>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddToCart(product);
                                    }}
                                    className="bg-primary p-2 text-white rounded-full hover:bg-primary-dark transition">
                                    <i className="ri-shopping-bag-line"></i>
                                </button>
                            </div>
                        </div>
                        <div className="p-4">
                            <h4 className="font-semibold">{product.name}</h4>
                            <p>₹{product.price} {product.oldPrice && <s className="text-gray-500 ml-2">₹{product.oldPrice}</s>}</p>
                            <RatingStars rating={product.rating} />
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500 col-span-4">No products available</p>
            )}
        </div>
    );
};

export default ProductCards;
