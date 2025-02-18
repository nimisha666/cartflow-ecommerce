import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCards from '../shop/ProductCards';
import { useFetchAllProductsQuery } from '../../features/products/productsApi';

const CategoryPage = () => {
    const { categoryName } = useParams();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ProductsPerPage = 8;

    const { data: { products = [] } = {}, error, isLoading } = useFetchAllProductsQuery({});

    useEffect(() => {
        if (products.length > 0) {
            const filtered = products.filter(
                (product) => product.category.toLowerCase() === categoryName.toLowerCase()
            );
            setFilteredProducts(filtered);
        }
    }, [categoryName, products]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [categoryName]);

    // Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / ProductsPerPage);
    const startIndex = (currentPage - 1) * ProductsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ProductsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading products.</div>;

    return (
        <>
            <section className="section__container bg-primary-light">
                <h2 className="section__header capitalize">{categoryName}</h2>
                <p className="section__subheader">Browse our collection of {categoryName}.</p>
            </section>
            <div className="section__container">
                <ProductCards products={paginatedProducts} />
                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="mt-6 flex justify-center">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700'} rounded-md mx-1`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CategoryPage;
