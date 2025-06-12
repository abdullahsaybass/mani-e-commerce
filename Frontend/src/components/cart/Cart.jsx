import React, { useState } from 'react';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]); // You can add items here to test

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="cart-wrapper">
      <div className="cart-main">
        <div className="cart-header">
          <h3 className="site-name">Mani Textile <span className="item-count">({cartItems.length})</span></h3>
        </div>

        <div className="cart-location">
          <span className="delivery-text">Delivery available to all places</span>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart-msg">Your cart is empty</div>
        ) : (
          cartItems.map(item => (
            <div className="cart-item" key={item.id}>
              <div className="item-info">
                <p className="product-title">{item.title}</p>
                <p className="delivery-date">
                  Delivery by {item.delivery} | <span className="green">₹{item.deliveryCharge} Free</span>
                </p>
                <p className="seller">
                  Seller: <span className="bold">{item.seller}</span> <span className="assured-badge">✔️</span>
                </p>

                <div className="price-section">
                  <span className="old-price">₹{item.price}</span>
                  <span className="current-price">₹{item.discountedPrice}</span>
                  <span className="discount">{item.discountPercent}% Off</span>
                  <span className="coupon">1 coupon applied <span className="info">ℹ️</span></span>
                </div>

                <p className="emi-text">Or Pay ₹{item.discountedPrice - 55} + 55</p>

                <div className="item-actions">
                  <div className="quantity-controls">
                    <button>-</button>
                    <span>{item.qty}</span>
                    <button>+</button>
                  </div>
                  <button className="link-btn">SAVE FOR LATER</button>
                  <button className="link-btn" onClick={() => removeItem(item.id)}>REMOVE</button>
                </div>
              </div>
            </div>
          ))
        )}

        {cartItems.length > 0 && (
          <div className="order-btn-container">
            <button className="order-btn">PLACE ORDER</button>
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="price-details">
          <h4 className="price-title">PRICE DETAILS</h4>
          <div className="price-item"><span>Price ({cartItems.length} item)</span><span>₹3,499</span></div>
          <div className="price-item"><span>Discount</span><span className="green">− ₹2,950</span></div>
          <div className="price-item"><span>Coupons for you</span><span className="green">− ₹50</span></div>
          <div className="price-item"><span>Platform Fee</span><span>₹4</span></div>
          <div className="price-item"><span>Delivery Charges</span><span className="green"><s>₹40</s> Free</span></div>
          <hr />
          <div className="price-item total">
            <span>Total Amount</span><span>₹503</span>
          </div>
          <p className="savings green">You will save ₹2,996 on this order</p>
          <p className="secure-note">✅ Safe and Secure Payments. Easy returns. 100% Authentic products.</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
