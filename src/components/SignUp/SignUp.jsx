import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./SignUp.css";

function SignUp({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleSignUp = () => {
    // Set logged in state to true
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);

    // Navigate to logged in page
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="signup-container">
      <div className="left">
        <h1>Create Account</h1>
        <input type="text" id="name" placeholder="Name" />
        <input type="email" id="email" placeholder="Email" />
        <input type="password" id="password" placeholder="Password" />
        <input
          type="password"
          id="confirm-password"
          placeholder="Confirm Password"
        />
        <button className="signup-btn" onClick={handleSignUp}>
          Sign Up
        </button>
        <p>or sign up with</p>
        <div className="social-media">
          <img src={assets.google} alt="" />
          <img src={assets.instagram} alt="" />
          <img src={assets.facebook} alt="" />
        </div>
        <h3>
          Already have an account? <Link to="/signin">Sign In</Link>
        </h3>
      </div>
      <div className="right">
        <img src={assets.signup} alt="" />
        <div className="text">
          <h3>Hello, Friend!</h3>
          <p>Enter your personal details and start</p>
          <p>journey with us</p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
