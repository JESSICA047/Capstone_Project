import React from "react";
import "./HeroLogin.css";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

function HeroLogin() {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    const footerElement = document.getElementById("footer-section");
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="login-hero-main">
      <div className="login-hero-left">
        <h1>Transform Your Body With Customized Meal Plans</h1>
        <p id="text">
          Fuel Your Body for Maximum Muscle Growth with Our Tailored Nutrition
          Plans
        </p>
        <button id="learn" onClick={handleLearnMore}>
          Learn More
        </button>
        <div className="login-hero-card">
          <div className="left">
            <div className="image">
              <img src={assets.massive_legs} alt="" />
            </div>
            <div className="text">
              <h3>Maximize Muscle</h3>
              <p>Our Expertly Crafted Meal Plans Provided</p>
            </div>
          </div>
          <div className="right">
            <div className="image">
              <img src={assets.pelvic} alt="" />
            </div>
            <div className="text">
              <h3>Optimize</h3>
              <p>Nutrition-Dense Meals to Shed Fat </p>
            </div>
          </div>
        </div>
      </div>
      <div className="login-hero-right">
        <img src={assets.strong_man} alt="" />
      </div>
    </div>
  );
}

export default HeroLogin;
