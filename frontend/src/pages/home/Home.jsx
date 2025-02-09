import React from 'react'
import Banner from './banner'
import Categories from './Categories'
import WomenSection from './WomenSection'
import TrendingProducts from '../shop/TrendingProducts'
import DealsSection from './DealsSection'
import PromoBanner from './PromoBanner'
import Blogs from '../blogs/Blogs'

const Home = () => {
    return (
        <>
            <Banner />
            <Categories />
            <WomenSection />
            <TrendingProducts />
            <DealsSection />
            <PromoBanner />
            <Blogs />
        </>
    )
}

export default Home