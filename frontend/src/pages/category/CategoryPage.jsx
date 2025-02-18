import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCards from '../shop/ProductCards';
import { useFetchAllProductsQuery } from '../../features/products/productsApi';

const CategoryPage = () => {
    const { categoryName } = useParams();

    // Fetch only category-specific products from backend
    const { data: { products = [] } = {}, error, isLoading } = useFetchAllProductsQuery({
        category: categoryName.toLowerCase() // Pass category name to backend
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [categoryName]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading products.</div>;
    if (products.length === 0) return <div>No products available.</div>;

    return (
        <>
            <section className="section__container bg-primary-light">
                <h2 className="section__header capitalize">{categoryName}</h2>
                <p className="section__subheader">Explore our collection of {categoryName} items.</p>
            </section>
            <div className="section__container">
                <ProductCards products={products} />
            </div>
        </>
    );
};

export default CategoryPage;
