import React from 'react';
import './Register.css';
import Header from '../Home/Navbar/Header';
import Footer from '../Home/Footer/Footer';
import { FcGoogle } from 'react-icons/fc';
import { BiLogoFacebookCircle } from "react-icons/bi";
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const RegisterForm = () => {
  return (
    <section className="register-section">
      <Header />
      <div className="register-container">    
        <div className="register-box">
          <h2 className="register-title">REGISTER</h2>

          <form className="register-form">
            <div className="input-with-icon">
              <FaUser className="input-icon" />
              <input type="text" placeholder="Your name" className="register-input" />
            </div>
            <div className="input-with-icon">
              <FaEnvelope className="input-icon" />
              <input type="email" placeholder="Your email" className="register-input" />
            </div>
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input type="password" placeholder="Enter password" className="register-input" />
            </div>
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input type="password" placeholder="Repeat password" className="register-input" />
            </div>

            <div className="checkbox-container">
              {/* <input type="checkbox" id="privacy" />
              <label htmlFor="privacy">PRIVACY POLICY AGREEMENT</label> */}
            </div>

            <button type="submit" className="submit-button">SUBMIT</button>
          </form>

          <div className="divider round">
            <span>OR</span>
          </div>

          <div className="social-buttons">
            <button className="social-btn facebook">
              <BiLogoFacebookCircle className="icon" />
              <span>Facebook</span>
            </button>
            <button className="social-btn google">
              <FcGoogle className="icon" />
              <span>Google</span>
            </button>
          </div>

          <p className="login-text">Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default RegisterForm;
