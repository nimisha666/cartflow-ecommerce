import React, { useState } from 'react';
import ProductCards from './ProductCards';
import { useFetchAllProductsQuery } from '../../features/products/productsApi';

const TrendingProducts = () => {
    const [visibleProducts, setVisibleProducts] = useState(8);

    // Fetch trending products from backend
    const { data: { products = [] } = {}, error, isLoading } = useFetchAllProductsQuery({
        category: '', // Adjust if needed
        color: '',
        minPrice: '',
        maxPrice: '',
        page: 1,  // Get first page
        limit: 20 // Fetch more products initially
    });

    const loadMoreProducts = () => {
        setVisibleProducts((prevCount) => prevCount + 4);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading products.</div>;

    return (
        <section className='section__container product__container'>
            <h2 className='section__header'>Trending Products</h2>
            <p className='section__subheader mb-12'>Discover our latest trending products loved by customers!</p>

            {/* Display Products */}
            <div className="mt-12">
                <ProductCards products={products.slice(0, visibleProducts)} />
            </div>

            {/* Load More Button */}
            <div className='product__btn'>
                {visibleProducts < products.length && (
                    <button onClick={loadMoreProducts} className="btn mt-4">Load More</button>
                )}
            </div>
        </section>
    );
};

export default TrendingProducts;
