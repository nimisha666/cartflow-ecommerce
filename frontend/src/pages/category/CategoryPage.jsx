import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCards from '../shop/ProductCards';
import { useFetchAllProductsQuery } from '../../features/products/productsApi';

const CategoryPage = () => {
    const { categoryName } = useParams();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const { data: { products = [] } = {}, error, isLoading } = useFetchAllProductsQuery({});

    useEffect(() => {
        if (products.length > 0) {
            const filtered = products.filter((product) => product.category.toLowerCase() === categoryName.toLowerCase());
            setFilteredProducts(filtered);
        }
    }, [categoryName, products]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [categoryName]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading products.</div>;

    return (
        <>
            <section className="section__container bg-primary-light">
                <h2 className="section__header capitalize">{categoryName}</h2>
                <p className="section__subheader">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor eaque quos ut corrupti porro illum</p>
            </section>
            <div className="section__container">
                <ProductCards products={filteredProducts} />
            </div>
        </>
    );
};

export default CategoryPage;
