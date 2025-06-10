// ProductCarousel.jsx
import React from 'react';
import './Productcarosuel.css';
import { assets } from '../../../assets/assets';

const products = [
  {
    badge: 'BEST PRICE',
    badgeClass: 'badge-gold',
    img: assets.cottonsaree,
    category: 'COTTON SAREE',
    title: 'PINK CHETTINAD COTTON SAREE',
    desc: 'Pink chettinad cotton saree with contrast rettai pettu border of elephant, peacock design & striped pallu',
    price: '₹999.00',
    stars: 5,
    colors: ['#9FD79D','#B3E5FC','#C8E6C9','#EEE'],
  },
  {
    badge: '20% DISCOUNT',
    badgeClass: 'badge-red',
    img: assets.brownchudu,
    category: 'CHUDIDHAR',
    title: 'BROWN MATERIAL CHUDIDHAR',
    desc: 'Brown material chudidhar catalog set, batik printed & embroidered top, contrast pants & intricately batik printed dupatta',
    price: '₹1326.00',
    oldPrice: '₹1600.00',
    stars: 5,
    colors: ['#6A1B4D','#4A148C','#D84315'],
  },
  {
    img: assets.curt,
    category: 'KURTI',
    title: 'STRAIGHT CUT KURTI',
    desc: 'Twara cream floral printed round neck, 3/4 th sleeve , knee length straight cut kurti',
    price: '₹990.00',
    stars: 5,
    colors: ['#1976D2','#E53935','#FFEB3B'],
  },
  {
    img: assets.yellowc,
    category: 'READYMADE SUITS',
    title: 'FLOOR LENGTH TOP',
    desc: 'Yellow floral design v neck, elbow sleeve, floor length top',
    price: '₹7,185.00',
    stars: 5,
    colors: ['#A05812','#7CB342','#8BC34A'],
  }
];

const ProductCarousel = () => (
  <div className="carousel-container">
    <div className="cards-wrapper">
      {products.map((p, i) => (
        <div className="card" key={i}>
          {p.badge && <div className={`badge ${p.badgeClass}`}>{p.badge}</div>}
          <div className="img-wrap">
            <img src={p.img} alt={p.title} />
          </div>
          <div className="info">
            {/* Line 1: category and review (stars) */}
            <div className="info-row top-row">
              <span className="category">{p.category}</span>
              <div className="stars">
                {Array.from({ length: p.stars }).map((_, j) => (
                  <span key={j} className="star">★</span>
                ))}
              </div>
            </div>
            {/* Line 2: name/title */}
            <h3 className="title">{p.title}</h3>
            {/* Line 3: description/content */}
            <p className="desc">{p.desc}</p>
            {/* Line 4: price, old price (strike), and color swatches */}
            <div className="info-row price-row">
              <div className="price-group">
                <span className="price">{p.price}</span>
                {p.oldPrice && <span className="old-price">{p.oldPrice}</span>}
              </div>
              <div className="swatches">
                {p.colors.map((c, j) => (
                  <span key={j} className="swatch" style={{ background: c }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ProductCarousel;