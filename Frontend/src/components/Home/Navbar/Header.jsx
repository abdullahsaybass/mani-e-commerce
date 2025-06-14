// src/components/Header/Header.jsx
import React, { useState } from "react";
import {
  FaHeart,
  FaShoppingBag,
  FaBars,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { assets } from "../../../assets/assets";
import "./Header.css";

const MENU = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    href: "/products",
    subMenu: [
      { label: "Men", href: "/products/men" },
      { label: "Women", href: "/products/women" },
      { label: "Kids", href: "/products/kids" },
    ],
  },
  { label: "Track Order", href: "/trackorder" },
  { label: "Cart", href: "/cartpage" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

const Header = ({ isLoggedIn = false, cartItems = [] }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.qty * item.discountedPrice,
    0
  );

  return (
    <div className="header">
      {/* Top bar */}
      <div className="top-bar">
        <div className="left-section">
          <div className="slice contact-slice">
            <span>CONTACT US: 9600184966</span>
          </div>
          <div className="slice email-slice">
            <span>EMAIL: MANITEXTILESTHEGRANDSTORE@GMAIL.COM</span>
          </div>
        </div>
        <div className="right-section">
          <div className="slice login-slice desktop-only">
            {!isLoggedIn ? (
              <>
                <Link to="/login">LOGIN</Link>
                <span className="or">OR</span>
                <Link to="/register">REGISTER</Link>
              </>
            ) : (
              <Link to="/profile" className="profile-icon">
                <FaUserCircle />
              </Link>
            )}
          </div>
          <div className="icon-slice">
            <FaHeart />
          </div>
          <Link to="/cartpage" className="slice cart-slice">
            <span className="bag-text">YOUR BAG</span>
            <FaShoppingBag />
            <span className="badge">{totalItems}</span>
            <span className="price">₹{totalPrice.toFixed(2)}</span>
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <header className="main-header">
        <div className="header-file">
          <Link to="/">
            <img src={assets.logo} alt="Logo" className="header-logo" />
          </Link>

          {/* Mobile Header Actions */}
          <div className="mobile-header-actions">
            {!isMobileMenuOpen && (
              !isLoggedIn ? (
                <Link className="mobile-login-btn" to="/login">
                  LOGIN
                </Link>
              ) : (
                <Link to="/profile" className="mobile-profile-icon">
                  <FaUserCircle />
                </Link>
              )
            )}

            {/* Toggle Hamburger / Close Icon */}
            {isMobileMenuOpen ? (
              <FaTimes
                className="hamburger-icon close-icon"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            ) : (
              <FaBars
                className="hamburger-icon"
                onClick={() => setIsMobileMenuOpen(true)}
              />
            )}

            {/* Mobile Drawer */}
            <nav className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}>
              <div className="drawer-header">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <img
                    src={assets.logo}
                    alt="Logo"
                    className="drawer-logo"
                    style={{ height: "40px", marginBottom: "10px" }}
                  />
                </Link>
                {/* close icon inside drawer header is now optional */}
              </div>
              {MENU.map((item, idx) => (
                <div key={idx}>
                  <Link
                    to={item.href}
                    className={idx === activeIndex ? "active" : ""}
                    onClick={() => {
                      setActiveIndex(idx);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          {/* Desktop Menu */}
          <div className="header-menu">
            <FaBars
              className="hamburger-icon"
              onClick={() => setIsMobileMenuOpen(true)}
            />
            <nav className="nav-links desktop-nav">
              {MENU.map((item, idx) => (
                <div
                  key={idx}
                  className={`nav-item ${item.subMenu ? "has-dropdown" : ""}`}
                  onMouseEnter={() => item.subMenu && setActiveIndex(idx)}
                  onMouseLeave={() => item.subMenu && setActiveIndex(null)}
                >
                  <Link
                    to={item.href}
                    className={idx === activeIndex ? "active" : ""}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>

                  {item.subMenu && activeIndex === idx && (
                    <div className="dropdown-menu">
                      {item.subMenu.map((sub, subIdx) => (
                        <Link
                          key={subIdx}
                          to={sub.href}
                          className="dropdown-item"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;