
import React, { useState } from "react";
import {
  FaHeart,
  FaShoppingBag,
  FaSearch,
  FaBars,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import { assets } from "../../../assets/assets";
import "./Header.css";

const MENU = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Products", href: "#" },
  { label: "Track Order", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Gallery", href: "#" },
  { label: "Contact", href: "#" },
];

const Header = ({ isLoggedIn = false, onLogin, onLogout }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuClick = (index) => {
    setActiveIndex(index);
    setIsMobileMenuOpen(false);
  };

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
                <a href="#" onClick={onLogin}>LOGIN</a>
                <span className="or">OR</span>
                <a href="#" onClick={onLogin}>REGISTER</a>
              </>
            ) : (
              <a href="#/profile" className="profile-icon">
                <FaUserCircle />
              </a>
            )}
          </div>
          <div className="lang-slice">
            <select className="lang-select">
              <option value="en">EN</option>
              <option value="ta">TA</option>
            </select>
          </div>
          <div className="icon-slice">
            <FaHeart />
          </div>
          <div className="slice cart-slice">
            <span className="bag-text">YOUR BAG</span>
            <FaShoppingBag />
            <span className="badge">5</span>
            <span className="price">₹1195.00</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="main-header">
        <div className="header-file">
          <img src={assets.logo} alt="Logo" className="header-logo" />

          {/* mobile-only actions and drawer */}
          <div className="mobile-header-actions">
            {!isMobileMenuOpen && (
              <>
                {!isLoggedIn ? (
                  <button className="mobile-login-btn" onClick={onLogin}>
                    LOGIN
                  </button>
                ) : (
                  <a href="#/profile" className="mobile-profile-icon">
                    <FaUserCircle />
                  </a>
                )}
                <a href="#" className="mobile-cart">
                  <FaShoppingBag />
                  <span className="badge">5</span>
                </a>
              </>
            )}

            <FaBars
              className="hamburger-icon"
              onClick={() => setIsMobileMenuOpen(true)}
            />

            {/* Drawer */}
            <nav className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}>
              <div className="drawer-header">
                <span className="drawer-title">Menu</span>
                <FaTimes
                  className="close-icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              </div>
              {MENU.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className={idx === activeIndex ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    handleMenuClick(idx);
                  }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="header-menu">
            <FaSearch className="search-icon" />
            <FaBars
              className="hamburger-icon"
              onClick={() => setIsMobileMenuOpen(true)}
            />

            <nav className={`nav-links desktop-nav ${isMobileMenuOpen ? "open" : ""}`}>
              {MENU.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className={idx === activeIndex ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    handleMenuClick(idx);
                  }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;