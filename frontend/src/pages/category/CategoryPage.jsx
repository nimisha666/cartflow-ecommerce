import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCards from '../shop/ProductCards';
import { useFetchAllProductsQuery } from '../../features/products/productsApi';

const CategoryPage = () => {
    const { categoryName } = useParams();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 20;
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

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading products.</div>;

    return (
        <>
            <section className="section__container bg-primary-light">
                <h2 className="section__header capitalize">{categoryName}</h2>
                <p className="section__subheader">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor eaque quos ut corrupti porro illum</p>
            </section>
            <div className="section__container">
                <ProductCards products={currentProducts} />
                {/* Pagination */}
                <div className="pagination flex justify-center mt-4">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button key={index} onClick={() => paginate(index + 1)} className="px-4 py-2 mx-1 border rounded">
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CategoryPage;
