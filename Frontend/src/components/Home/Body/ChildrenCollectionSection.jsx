import React from "react";
import "./ChildrenCollectionSection.css";

const ChildrenCollection = () => {
  const thumbnails = [
    // "/images/child-thumb1.png",
    // "/images/child-thumb2.png",
    // "/images/child-thumb3.png",
  ];

  return (
    <div className="collection-wrapper">
      <div className="collection-container">
        {/* Left Thumbnails */}
        <div className="collection-thumbnails">
          {thumbnails.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Thumbnail ${index + 1}`}
              className="thumbnail"
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="collection-main-image">
          <img
            src="/images/main-child.png"
            alt="Children Model"
            className="main-img"
          />
        </div>

        {/* Right Content */}
        <div className="collection-content">
          <h4 className="section-title">Modern Collection</h4>
          <h2 className="collection-heading">FOR CHILDRENS</h2>
          <p className="collection-description">
            Discover our Modern Collection for Children—a curated range of
            stylish, comfortable, and trend-forward clothing and accessories
            designed for today’s kids.
          </p>

          <div className="features-grid">
            <ul>
              <li>✔ 2000+ New Design</li>
              <li>✔ 10 lakhs parents delighted</li>
              <li>✔ 500 new style every month</li>
            </ul>
            <ul>
              <li>✔ 50% offer for new members</li>
              <li>✔ 125rp offer on order above 999rp</li>
              <li>✔ 24*7 customer support</li>
            </ul>
          </div>

          <div className="collection-bottom">
            <span className="price">BEST PRICE: ₹195.00</span>
            <button className="btn learn-btn">LEARN MORE</button>
            <button className="btn cart-btn">ADD TO CART</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildrenCollection;
