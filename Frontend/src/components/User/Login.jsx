import React from 'react';
import './Login.css';
import { FcGoogle } from 'react-icons/fc';
import { BiLogoFacebookCircle } from "react-icons/bi";
import { FiMail, FiLock } from 'react-icons/fi';
import Header from '../Home/Navbar/Header';
import Footer from '../Home/Footer/Footer';

const LoginForm = () => {

    const [name, setName] = React.useState('');
    const [mail, setMail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    

    return(
    <div className="login-page">
        <Header />
        <div className="form-container">
            <div className="login-box">
                <h2 className="login-title">LOGIN</h2>
                <form className="login-form">
                    <div className="input-wrapper">
                        <FiMail className="input-icon" />
                        <input type="email" placeholder="Your email" className="login-input" />
                    </div>
                    <div className="input-wrapper">
                        <FiLock className="input-icon" />
                        <input type="password" placeholder="Enter password" className="login-input" />
                    </div>
                    <div className="login-forgot">
                        <a href="#" className="link">FORGOT PASSWORD?</a>
                    </div>
                    <button type="submit" className="submit-button">LOGIN</button>
                    <div className="login-register">
                        <span>Don't have an account?</span>
                        <a href="#" className="link register-link">REGISTER NOW</a>
                    </div>
                </form>
                <div className="divider"><span>OR</span></div>
                <div className="social-buttons">
                    <button className="social-btn facebook"><BiLogoFacebookCircle className="icon" /><span>Facebook</span></button>
                    <button className="social-btn google"><FcGoogle className="icon" /><span>Google</span></button>
                    
                </div>
            </div>
        </div>
        <Footer />
    </div>
    );
};

export default LoginForm;
