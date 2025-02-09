import React from 'react'
import cart1 from "../../assets/card-1.png";
import cart2 from "../../assets/card-2.png";
import cart3 from "../../assets/card-3.png";

const cards = [
    {
        id: 1,
        image: cart1,
        trend: '2025 Trend',
        title: 'Women Shirt'
    }, {
        id: 2,
        image: cart2,
        trend: '2025 Trend',
        title: 'Women Dresses'
    }, {
        id: 3,
        image: cart3,
        trend: '2025 Trend',
        title: 'Women Casuals'
    }

]

const WomenSection = () => {
    return (
        <section className='section__container women__container'>
            {
                cards.map((card) => (
                    <div key={card.id} className='women__card'>
                        <img src={card.image} alt={card.trend} />
                        <div className='women__content'>
                            <p>{card.trend}</p>
                            <h4>{card.title}</h4>
                            <a href="#">Discover More</a>
                        </div>
                    </div>
                ))
            }
        </section>
    )
}

export default WomenSection