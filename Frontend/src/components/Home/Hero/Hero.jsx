import React from 'react';
import Slider from 'react-slick';
import './Hero.css';
import { assets } from '../../../assets/assets';

const sareeData = [
  {
    title: "BORDER SILK SAREE",
    description: "Elevate your ethnic wardrobe with our stunning Silk Saree, a timeless addition for your special occasions.",
    features: [
      "Crafted from luxurious Silk fabric",
      "This 6.3-meter saree drapes elegantly",
      "Offering comfort and grace"
    ],
    price: "₹1795.00",
     img: assets.header1,
  },
  {
    title: "ROYAL MAROON SILK",
    description: "Experience the richness of tradition with this regal maroon silk saree that blends heritage and elegance.",
    features: [
      "100% premium silk",
      "Gold woven border detailing",
      "Ideal for weddings and festivities"
    ],
    price: "₹1995.00",
     img: assets.header1,
  },
  {
    title: "ELEGANT GOLD BORDER",
    description: "This elegant silk saree with gold border gives you a perfect festive look while ensuring all-day comfort.",
    features: [
      "Gold zari woven pattern",
      "Soft-touch silk fabric",
      "Easy to drape and manage"
    ],
    price: "₹1895.00",
     img: assets.header1,
  },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 4000,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false
};

const Hero = () => {
  return (
    <div className="saree-slider-section">
      {/* Rotated background image */}
      <img
        src={assets.background}
        alt="background"
        className="rotated-background"
      />

      <Slider {...sliderSettings}>
        {sareeData.map((item, index) => (
          <div key={index} className="saree-slide">
            <div className="saree-container">
              <div className="saree-text">
                <p className="edition">Mani Textile New Edition</p>
                <h1 className="title">{item.title}</h1>
                <div className="divider"></div>
                <p className="description">{item.description}</p>
                <ul className="features">
                  {item.features.map((feat, i) => (
                    <li key={i}>✔ {feat}</li>
                  ))}
                </ul>
                <div className="buttons">
                  <p className="price">BEST PRICE: {item.price}</p>
                
                  <button className="btn white">LEARN MORE</button>
                  <button className="btn black">ADD TO CART</button>
                </div>
              </div>
              <div className="saree-image">
                <img src={item.img} alt={item.title} />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;
