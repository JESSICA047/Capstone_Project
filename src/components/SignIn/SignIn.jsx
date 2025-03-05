import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./SignIn.css";

function SignIn() {
  return (
    <div className="signin-container">
      <div className="left">
        <img src={assets.signin} alt="" />
        <div className="text">
          <h3>Welcome Back!</h3>
          <p>To keep connected with us please login with your</p>
          <p>personal info</p>
        </div>
      </div>
      <div className="right">
        <h1>Sign In</h1>
        <input type="email" id="email" placeholder="Email" />
        <input type="password" id="password" placeholder="Password" />
        <p>Forgot Password?</p>
        <button className="signin-btn">LOGIN</button>
        <p>or sign in with</p>
        <div className="social-media">
          <img src={assets.google} alt="" />
          <img src={assets.instagram} alt="" />
          <img src={assets.facebook} alt="" />
        </div>
        <h3>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </h3>
      </div>
    </div>
  );
}

export default SignIn;
