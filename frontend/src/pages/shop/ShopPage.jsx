import React, { useState, useEffect } from 'react'
import productsData from '../../data/products.json';
import ProductCards from '../shop/ProductCards';
import ShopFiltering from './ShopFiltering';
import { useFetchAllProductsQuery } from '../../features/products/productsApi';

const filters = {
    categories: ['all', 'accessories', 'dress', 'jwellery', 'cosmetics'],
    colors: ['all', 'black', 'red', 'gold', 'blue', 'silver', 'beige', 'green'],
    priceRanges: [
        { label: 'Under ₹500', min: 0, max: 500 },
        { label: '₹500 - ₹1000', min: 500, max: 1000 },
        { label: '₹1000 - ₹2000', min: 1000, max: 2000 },
        { label: '₹2000 and above', min: 2000, max: Infinity },

    ]
};

const ShopPage = () => {
    // const [products, setProducts] = useState(productsData);
    const [filtersState, setFiltersState] = useState({
        category: 'all',
        color: 'all',
        priceRanges: ''
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [ProductsPerPage] = useState(8);
    const { category, color, priceRanges } = filtersState;
    const [minPrice, maxPrice] = priceRanges.split('-').map(Number);

    const { data: { products = [], totalPages, totalProducts } = {}, error, isLoading } = useFetchAllProductsQuery({
        category: category !== 'all' ? category : '',
        color: color !== 'all' ? color : '',
        minPrice: isNaN(minPrice) ? '' : minPrice,
        maxPrice: isNaN(maxPrice) ? '' : maxPrice,
        page: currentPage,
        limit: ProductsPerPage,
    })

    // filter function
    // const applyFilters = () => {
    //     let filteredProducts = productsData;
    //     // filter by category
    //     if (filtersState.category && filtersState.category !== 'all') {
    //         filteredProducts = filteredProducts.filter(product => product.category === filtersState.category)
    //     }

    //     // filter by color
    //     if (filtersState.color && filtersState.color !== 'all') {
    //         filteredProducts = filteredProducts.filter(product => product.color === filtersState.color)
    //     }
    //     if (filtersState.priceRange) {
    //         const [minPrice, maxPrice] = filtersState.priceRange.split('-').map(Number);
    //         filteredProducts = filteredProducts.filter(product => product.price >= minPrice && product.price <= maxPrice)
    //     }
    //     setProducts(filteredProducts)
    // }
    // useEffect(() => { applyFilters() }, [filtersState])

    // clear function
    const clearFilters = () => {
        setFiltersState({
            category: 'all',
            colors: 'all',
            priceRanges: ''
        })
    }

    // handling Page change
    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber)
        }
    }
    if (isLoading) return <div>Loading....</div>
    if (error) return <div>Error loading products.</div>

    const startProduct = (currentPage - 1) * ProductsPerPage + 1;
    const endProduct = startProduct + products.length - 1;



    return (
        <>
            <section className="section__container bg-primary-light">
                <h2 className="section__header capitalize">Shop Page</h2>
                <p className="section__subheader">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor eaque quos ut corrupti porro illum</p>
            </section>
            <section className="section__container">
                <div className="flex flex-col md:flex-row md:gap-12 gap-8">
                    {/* left side */}
                    <ShopFiltering filters={filters} filtersState={filtersState} setFiltersState={setFiltersState} clearFilters={clearFilters} />
                    {/* right side */}
                    <div className="">
                        <h3 className="text-xl font-medium mb-4">Showing {startProduct} to {endProduct} of {totalProducts} products</h3>

                        <ProductCards products={products} />
                        {/* pagination controls */}
                        <div className='mt-6 flex justify-center'>
                            <button
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                                className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2'>Previous</button>
                            {
                                [...Array(totalPages)].map((_, index) => (
                                    <button key={index} onClick={() => handlePageChange(index + 1)} className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700'}  rounded-md mx-1 `}>{index + 1}</button>
                                ))
                            }
                            <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2'>Next</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ShopPage