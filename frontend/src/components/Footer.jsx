import React from 'react'
import instaImg1 from "../assets/instagram-1.jpg"
import instaImg2 from "../assets/instagram-2.jpg"
import instaImg3 from "../assets/instagram-3.jpg"
import instaImg4 from "../assets/instagram-4.jpg"
import instaImg5 from "../assets/instagram-5.jpg"
import instaImg6 from "../assets/instagram-6.jpg"

const Footer = () => {
    return (
        <>
            <footer className='section__container footer__container'>
                <div className="footer__col">
                    <h4>CONTACT INFO</h4>
                    <p>
                        <span><i className="ri-map-pin-fill"></i></span>
                        123, London Bridge street, Londan
                    </p>
                    <p><span><i className="ri-mail-fill"></i></span>
                        support@gmail.com
                    </p>
                    <p><span><i className="ri-phone-fill"></i></span>
                        (+123) 456 7890
                    </p>
                </div>
                <div className="footer__col">
                    <h4>COMPANY</h4>
                    <a href="/">Home</a>
                    <a href="/">About Us</a>
                    <a href="/">Work With us</a>
                    <a href="/">Our Blogs</a>
                    <a href="/">Trems & Conditions</a>

                </div>
                <div className="footer__col">
                    <h4>USEFUL LINKS</h4>
                    <a href="/">Help</a>
                    <a href="/">Track Your order</a>
                    <a href="/">Men</a>
                    <a href="/">Women</a>
                    <a href="/">Dresses</a>
                </div>
                <div className="footer__col">
                    <h4>Social Media</h4>
                    <div className="instagram__grid">
                        <img src={instaImg1} alt="" />
                        <img src={instaImg2} alt="" />
                        <img src={instaImg3} alt="" />
                        <img src={instaImg4} alt="" />
                        <img src={instaImg5} alt="" />
                        <img src={instaImg6} alt="" />
                    </div>
                </div>
            </footer>
            <div className="footer__bar">
                Copyright © 2025 by Cartflow All rights reserved.
            </div>
        </>
    )
}

export default Footer