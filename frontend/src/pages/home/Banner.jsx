import React from 'react'
import { Link } from 'react-router-dom';
import bannerImg from "../../assets/header.png";

const Banner = () => {
    return (
        <div className='section__container header__container'>
            <div className="header__content z-30">
                <h4 className='uppercase'>UP TO 20% Discount On</h4>
                <h1>Girl's Fashion</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia praesentium laudantium non cum, nobis architecto at hic ex, ipsum perferendis voluptas. Quasi temporibus sed rem expedita aspernatur impedit. Repudiandae, dignissimos!</p>
                <button className='btn'><Link to="/shop">EXPLORE NOW</Link></button>
            </div>
            <div className='header__image'>
                <img src={bannerImg} alt="banner Img" />
            </div>
        </div>
    )
}

export default Banner